'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowUpRight, Activity, Droplets, Heart, Apple, Brain, Dumbbell, Stethoscope, UserCog } from 'lucide-react';
import { Section, Button, AnimatedCounter } from '@/components/ui';
import { TextReveal, MagneticButton } from '@/components/animations';
import { services } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Droplets,
  Heart,
  Apple,
  Brain,
  Dumbbell,
  Stethoscope,
  UserCog,
};

export function ServicesPreview() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  // Show 6 services on homepage for cleaner design
  const previewServices = services.slice(0, 6);

  // Horizontal scroll for desktop
  useEffect(() => {
    const section = sectionRef.current;
    const horizontal = horizontalRef.current;

    if (!section || !horizontal) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Only enable horizontal scroll on large screens
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const scrollWidth = horizontal.scrollWidth - window.innerWidth + 200;

      const tween = gsap.to(horizontal, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 20%',
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Card animations
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cardElements = cards.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Stats animation
  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stats,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: stats,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} background="surface" padding="lg" className="section-light bg-gradient-animated relative overflow-hidden">
      {/* Editorial Section Number */}
      <span className="editorial-number text-[12rem] md:text-[16rem] text-[var(--color-primary)]/[0.03] absolute -top-20 -left-8 select-none pointer-events-none">
        01
      </span>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <TextReveal
          type="words"
          animation="fade-up"
          stagger={0.05}
          duration={0.8}
          className="inline-block text-sm text-[var(--color-primary)] mb-4"
        >
          Servicios Especializados
        </TextReveal>

        <TextReveal
          as="h2"
          type="lines"
          animation="fade-up"
          stagger={0.1}
          duration={1}
          delay={0.1}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          {t('services.title')}
        </TextReveal>

        <TextReveal
          as="p"
          type="lines"
          animation="fade-up"
          duration={0.8}
          delay={0.2}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          {t('services.subtitle')}
        </TextReveal>
      </div>

      {/* Desktop: Horizontal Scroll Cards - Premium Glassmorphism */}
      <div className="hidden lg:block relative z-10">
        <div
          ref={horizontalRef}
          className="flex gap-8 pl-4"
          style={{ width: 'max-content' }}
        >
          {previewServices.map((service, index) => {
            const IconComponent = iconMap[service.icon];

            return (
              <div
                key={service.id}
                className="service-card w-[380px] flex-shrink-0"
              >
                <Link href="/servicios" className="block h-full group">
                  <div className="glass-card card-hover-glow relative h-full min-h-[340px] rounded-2xl overflow-hidden">
                    <div className="relative h-full flex flex-col justify-between p-8">
                      {/* Premium 80px Icon */}
                      <div className="flex items-start justify-between">
                        <div className="icon-container-premium group-hover:scale-105">
                          {IconComponent && (
                            <IconComponent className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110" />
                          )}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                          <ArrowUpRight className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3 mt-auto">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors duration-500">
                          {t(service.titleKey)}
                        </h3>
                        <p className="text-base text-gray-500 line-clamp-3 transition-colors duration-500 group-hover:text-gray-600">
                          {t(service.descriptionKey)}
                        </p>
                      </div>

                      {/* Decorative gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-secondary)]/0 group-hover:from-[var(--color-primary)]/[0.02] group-hover:to-[var(--color-secondary)]/[0.04] transition-all duration-700 pointer-events-none" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet: Grid Layout - Premium Glassmorphism */}
      <div
        ref={cardsRef}
        className="lg:hidden relative z-10 grid md:grid-cols-2 gap-6"
      >
        {previewServices.map((service, index) => {
          const IconComponent = iconMap[service.icon];
          const isLarge = index === 0 || index === 5;

          return (
            <div
              key={service.id}
              className={`service-card ${isLarge ? 'md:col-span-2' : ''}`}
            >
              <Link href="/servicios" className="block h-full group">
                <div className={`
                  glass-card card-hover-glow relative h-full rounded-2xl overflow-hidden
                  ${isLarge ? 'min-h-[320px]' : 'min-h-[280px]'}
                `}>
                  <div className="relative h-full flex flex-col justify-between p-7">
                    {/* Premium Icon */}
                    <div className="flex items-start justify-between">
                      <div className="icon-container-premium group-hover:scale-105">
                        {IconComponent && (
                          <IconComponent className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110" />
                        )}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-3 group-hover:translate-x-0">
                        <ArrowUpRight className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 mt-auto">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors duration-500">
                        {t(service.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 transition-colors duration-500 group-hover:text-gray-600">
                        {t(service.descriptionKey)}
                      </p>
                    </div>

                    {/* Decorative gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-secondary)]/0 group-hover:from-[var(--color-primary)]/[0.02] group-hover:to-[var(--color-secondary)]/[0.04] transition-all duration-700 pointer-events-none" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="relative z-10 mt-12 text-center">
        <TextReveal
          type="words"
          animation="fade-up"
          duration={0.6}
          delay={0.3}
        >
          <MagneticButton strength={0.3}>
            <Link href="/servicios">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t('services.viewAll')}
              </Button>
            </Link>
          </MagneticButton>
        </TextReveal>
      </div>

      {/* Premium Stats Glass Bar */}
      <div
        ref={statsRef}
        className="relative z-10 mt-20"
      >
        <div className="stats-glass-bar py-10 px-8 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: 8, suffix: '+', label: 'Servicios' },
              { value: 25, suffix: '+', label: 'Años' },
              { value: 100, suffix: '%', label: 'Certificados' },
              { value: 24, suffix: '/7', label: 'Emergencias' },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-bold gradient-text-gold transition-all duration-500 group-hover:scale-105">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                    delay={index * 0.1}
                  />
                </div>
                <div className="text-sm md:text-base text-gray-600 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ServicesPreview;
