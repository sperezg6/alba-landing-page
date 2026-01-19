'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-creme-alba">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-bold text-[var(--color-primary)]/10 leading-none">
            500
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
          Algo salio mal
        </h1>
        <p className="text-[var(--color-muted)] mb-8">
          Lo sentimos, ocurrio un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => reset()}
          >
            Intentar de nuevo
          </Button>
          <Link href="/">
            <Button variant="outline" leftIcon={<Home className="w-4 h-4" />}>
              Ir al inicio
            </Button>
          </Link>
        </div>

        {/* Error digest for support */}
        {error.digest && (
          <p className="mt-8 text-xs text-[var(--color-muted)]">
            Codigo de error: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
