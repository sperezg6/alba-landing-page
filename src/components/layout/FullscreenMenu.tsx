'use client';

import { useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/servicios', labelKey: 'services' },
  { href: '/sucursales', labelKey: 'branches' },
  { href: '/nosotros', labelKey: 'about' },
  { href: '/directorio', labelKey: 'doctors' },
  { href: '/recursos', labelKey: 'resources' },
  { href: '/contacto', labelKey: 'contact' },
];

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const toggleLocale = locale === 'es' ? 'en' : 'es';

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-alba-dark z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-6 md:py-8">
            {/* Logo */}
            <Link
              href="/"
              onClick={onClose}
              className="text-base font-semibold uppercase tracking-[0.1em] text-white hover:text-white/80 transition-colors"
            >
              ALBA
            </Link>

            {/* Close Button - Text style matching "Menu ✦" */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-base text-white hover:text-white/80 transition-colors"
              aria-label="Close menu"
            >
              <span className="font-normal">Close</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="opacity-80"
              >
                <circle cx="8" cy="2" r="1.5" />
                <circle cx="8" cy="14" r="1.5" />
                <circle cx="2" cy="8" r="1.5" />
                <circle cx="14" cy="8" r="1.5" />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Navigation Links */}
            <div className="flex-1 flex items-center px-6 md:px-10 lg:px-16 py-8">
              <ul className="space-y-1 md:space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.4,
                      }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'group flex items-baseline gap-4 py-2 transition-colors duration-300',
                          isActive
                            ? 'text-alba-primary'
                            : 'text-white/40 hover:text-white'
                        )}
                      >
                        <span className="text-xs font-medium tracking-wider">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-4xl md:text-5xl lg:text-6xl font-light">
                          {t(link.labelKey)}
                        </span>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-alba-primary ml-2" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Right Column - Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/10 px-6 md:px-10 lg:px-12 py-8 lg:py-16 flex flex-col justify-between"
            >
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                    Teléfono
                  </p>
                  <a
                    href="tel:4773293939"
                    className="text-xl md:text-2xl font-light text-white hover:text-alba-primary transition-colors"
                  >
                    477-329-39-39
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:contacto@albadialisis.com"
                    className="text-lg md:text-xl font-light text-white hover:text-alba-primary transition-colors"
                  >
                    contacto@albadialisis.com
                  </a>
                </div>

                {/* Language Switcher */}
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                    Idioma
                  </p>
                  <Link
                    href={pathname}
                    locale={toggleLocale}
                    className="inline-flex items-center gap-2 text-lg font-light text-white hover:text-alba-primary transition-colors"
                  >
                    {toggleLocale === 'en' ? 'English' : 'Español'}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Nutritional Chatbot Link */}
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                    Asistente Nutricional
                  </p>
                  <a
                    href={process.env.NEXT_PUBLIC_CHATBOT_URL || 'http://localhost:3001'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-light text-white hover:text-alba-primary transition-colors"
                  >
                    Abrir Chat
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 lg:mt-0">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-alba-primary hover:bg-alba-primary-dark text-black px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors"
                >
                  {t('bookAppointment')}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="px-6 md:px-10 lg:px-16 py-6 border-t border-white/10"
          >
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Alba Diálisis y Trasplantes. Todos los derechos reservados.
            </p>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default FullscreenMenu;
