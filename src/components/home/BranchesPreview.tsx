'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Map, LayoutGrid } from 'lucide-react';
import { Section, Button, PlaceCard } from '@/components/ui';
import { branches } from '@/lib/data';

// Dynamically import map to avoid SSR issues
const BranchesMap = dynamic(() => import('./BranchesMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Cargando mapa...</span>
    </div>
  ),
});

// Subtle easing curve for professional animations (ease-out-cubic)
const easeOutCubic: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Header container variants
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

// Header item variants
const headerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
};

// Cards container variants
const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Card item variants
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
};

// Button variants
const buttonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
};

// Banner variants
const bannerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
      delay: 0.2,
    },
  },
};

// Helper to extract city from branch data
const getCityTag = (branchId: string): string => {
  const cityMap: Record<string, string> = {
    leon: 'León',
    brisas: 'León',
    dolores: 'Dolores Hidalgo',
    renalmedic: 'León',
  };
  return cityMap[branchId] || 'Guanajuato';
};

// Helper to get area/zone tag
const getAreaTag = (branchId: string): string => {
  const areaMap: Record<string, string> = {
    leon: 'Centro',
    brisas: 'San Nicolás',
    dolores: 'Fracc. Cristóbal',
    renalmedic: 'Norte',
  };
  return areaMap[branchId] || '';
};

export function BranchesPreview() {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const mobileButtonInView = useInView(mobileButtonRef, { once: true, amount: 0.5 });
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.3 });

  return (
    <Section background="default" padding="lg" className="section-light">
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        variants={headerVariants}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        <div className="max-w-2xl">
          <motion.span
            className="inline-block text-sm text-[var(--color-primary)] mb-4"
            variants={headerItemVariants}
          >
            Nuestras Ubicaciones
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            variants={headerItemVariants}
          >
            {t('branches.title')}
          </motion.h2>

          <motion.p
            className="mt-4 text-gray-600"
            variants={headerItemVariants}
          >
            {t('branches.subtitle')}
          </motion.p>
        </div>

        {/* View Toggle and CTA */}
        <div className="flex items-center gap-4">
          {/* View Toggle Buttons */}
          <motion.div
            className="flex bg-gray-100 rounded-lg p-1"
            variants={buttonVariants}
          >
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Tarjetas</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Mapa</span>
            </button>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            variants={buttonVariants}
          >
            <Link href="/sucursales">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('branches.viewAll')}
            </Button>
          </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Conditional View: Cards or Map */}
      {viewMode === 'cards' ? (
        <motion.div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardsContainerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
        >
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              variants={cardVariants}
            >
              <PlaceCard
                images={[branch.image]}
                tags={[getCityTag(branch.id), getAreaTag(branch.id)].filter(Boolean)}
                title={branch.name}
                subtitle={branch.phone}
                hostType={t('branches.hoursValue')}
                isTopRated={index === 0}
                description={branch.address}
                ctaText={t('branches.getDirections')}
                ctaHref={branch.mapUrl}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutCubic }}
        >
          <BranchesMap />
        </motion.div>
      )}

      {/* Mobile View All Button */}
      <motion.div
        ref={mobileButtonRef}
        className="mt-10 text-center lg:hidden"
        variants={buttonVariants}
        initial="hidden"
        animate={mobileButtonInView ? 'visible' : 'hidden'}
      >
        <Link href="/sucursales">
          <Button
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('branches.viewAll')}
          </Button>
        </Link>
      </motion.div>
    </Section>
  );
}

export default BranchesPreview;
