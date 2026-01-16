'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { whatsappNumber } from '@/lib/data';

export function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const posthog = usePostHog();

  // Check if we're on the home page
  const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en';

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show after scrolling past ~80% of viewport height (past hero)
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleClick = () => {
    posthog.capture('whatsapp_clicked', {
      source: pathname,
    });
    const message = encodeURIComponent('Hola, me gustaria obtener mas informacion sobre sus servicios.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-3 w-64"
          >
            <div className="glass rounded-2xl p-4 shadow-lg relative">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4 text-[var(--color-muted)]" />
              </button>
              <p className="text-sm text-[var(--color-text)] pr-6">
                {t('tooltip')}
              </p>
              <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-white/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
      </motion.button>
    </div>
  );
}

export default WhatsAppButton;
