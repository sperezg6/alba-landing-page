'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Core services for horizontal scroll (premium showcase)
const coreServices = [
  {
    id: 'hemodialysis',
    number: '01',
    titleKey: 'services.hemodialysis.title',
    descriptionKey: 'services.hemodialysis.description',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=90',
    accent: 'var(--color-primary)',
  },
  {
    id: 'hemodiafiltration',
    number: '02',
    titleKey: 'services.hemodiafiltration.title',
    descriptionKey: 'services.hemodiafiltration.description',
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&q=90',
    accent: 'var(--color-secondary)',
  },
  {
    id: 'transplant',
    number: '03',
    titleKey: 'services.transplant.title',
    descriptionKey: 'services.transplant.description',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=90',
    accent: 'var(--color-primary)',
  },
  {
    id: 'nutrition',
    number: '04',
    titleKey: 'services.nutrition.title',
    descriptionKey: 'services.nutrition.description',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=90',
    accent: 'var(--color-secondary)',
  },
];

export function ServicesHorizontal() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Horizontal scroll animation (desktop only)
  useEffect(() => {
    if (isMobile || !containerRef.current || !panelsRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.service-panel');
      if (panels.length === 0) return;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${panels.length * window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: vertical layout
  if (isMobile) {
    return (
      <section className="py-20 bg-alba-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="headline-section text-gray-900">{t('services.title')}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="space-y-12">
            {coreServices.map((service) => (
              <div key={service.id} className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 text-6xl font-serif text-white/20">
                    {service.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-4 transition-all"
            >
              {t('services.viewAll')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll
  return (
    <section ref={containerRef} className="relative bg-[var(--color-dark-bg)] overflow-hidden">
      {/* Horizontal scroll container */}
      <div
        ref={panelsRef}
        className="flex h-screen"
        style={{ width: `${coreServices.length * 100}vw` }}
      >
        {coreServices.map((service, index) => (
          <div
            key={service.id}
            className="service-panel w-screen h-screen flex-shrink-0 flex"
          >
            {/* Image side (50%) */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-dark-bg)]" />
            </div>

            {/* Content side (50%) */}
            <div className="w-1/2 h-full flex items-center px-16 lg:px-24">
              <div className="max-w-xl">
                {/* Large number */}
                <span
                  className="block text-[10rem] font-serif leading-none"
                  style={{ color: service.accent, opacity: 0.15 }}
                >
                  {service.number}
                </span>

                {/* Title */}
                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-[-2rem] relative z-10">
                  {t(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                  {t(service.descriptionKey)}
                </p>

                {/* CTA */}
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 mt-8 text-[var(--color-secondary)] font-semibold hover:gap-4 transition-all"
                >
                  {t('common.learnMore')}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Progress indicator */}
                <div className="mt-12 flex items-center gap-3">
                  {coreServices.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1 rounded-full transition-all duration-300',
                        i === index
                          ? 'w-8 bg-[var(--color-secondary)]'
                          : 'w-2 bg-black/20'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint on first panel */}
      <div className="absolute bottom-10 left-10 text-black/50 text-sm uppercase tracking-widest">
        <span className="flex items-center gap-2">
          Scroll
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </span>
      </div>
    </section>
  );
}

export default ServicesHorizontal;
