'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FullscreenMenu } from './FullscreenMenu';

const navLinks = [
  { href: '/servicios', key: 'services' },
  { href: '/sucursales', key: 'branches' },
  { href: '/nosotros', key: 'about' },
  { href: '/directorio', key: 'doctors' },
  { href: '/contacto', key: 'contact' },
];

export function Navigation() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect if we're on pages with dark hero sections
  const isHomePage = pathname === '/';
  const isAboutPage = pathname === '/nosotros';
  const isResourcesPage = pathname === '/recursos';
  const isServicesPage = pathname === '/servicios';
  const isBranchesPage = pathname === '/sucursales';
  const isContactPage = pathname === '/contacto';
  const isDirectoryPage = pathname === '/directorio' || pathname.startsWith('/directorio/');
  const hasHeroSection = isHomePage || isAboutPage || isResourcesPage || isServicesPage || isBranchesPage || isContactPage || isDirectoryPage;

  useEffect(() => {
    const handleScroll = () => {
      // On home page, switch after passing ~80% of viewport (when reaching services)
      // On other pages, switch after 100px
      const threshold = pathname === '/' ? window.innerHeight * 0.8 : 100;
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Determine if we should show light (hero) styling
  // Light styling: on pages with hero sections AND not scrolled past hero
  const showLightStyling = hasHeroSection && !isScrolled;

  return (
    <>
      {/* Minimal Fixed Header - ALBA text + Menu ✦ (Inversa style) */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-4'
            : 'py-6 md:py-8'
        )}
      >
        {/* Background that fades in on scroll */}
        <motion.div
          initial={false}
          animate={{
            opacity: isScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white/95 backdrop-blur-sm shadow-sm"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <nav className="flex items-center justify-between">
            {/* Logo - "ALBA" text (Inversa style) */}
            <Link
              href="/"
              className={cn(
                "text-base font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                showLightStyling
                  ? "text-white hover:text-white/80"
                  : "text-gray-900 hover:text-gray-600"
              )}
            >
              ALBA
            </Link>

            {/* Desktop Navigation Links - Hidden on mobile, visible on lg+ */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                      pathname === link.href
                        ? showLightStyling
                          ? "text-alba-primary"
                          : "text-alba-primary"
                        : showLightStyling
                          ? "text-white/90 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Menu button - "Menu ✦" text (Inversa style) */}
            <button
              className={cn(
                "flex items-center gap-2 text-base transition-colors duration-300",
                showLightStyling
                  ? "text-white hover:text-white/80"
                  : "text-gray-900 hover:text-gray-600"
              )}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="font-normal">Menu</span>
              {/* Sparkle icon ✦ */}
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
          </nav>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </>
  );
}

export default Navigation;
