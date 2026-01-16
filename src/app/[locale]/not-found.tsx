'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-bold text-[var(--color-primary)]/10 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <span className="text-4xl">?</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
          Pagina no encontrada
        </h1>
        <p className="text-[var(--color-muted)] mb-8">
          Lo sentimos, la pagina que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Ir al inicio
            </Button>
          </Link>
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => window.history.back()}
          >
            Volver atras
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
