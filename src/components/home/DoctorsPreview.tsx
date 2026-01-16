'use client';

import { useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, MapPin, ChevronRight } from 'lucide-react';
import { Section, Button } from '@/components/ui';
import { TextReveal, MagneticButton } from '@/components/animations';
import { doctors, branches } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function DoctorsPreview() {
  const t = useTranslations();
  const locale = useLocale();
  const cardsRef = useRef<HTMLDivElement>(null);

  // Cards animation with image reveal
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cardElements = cards.querySelectorAll('.doctor-card');
    const imageContainers = cards.querySelectorAll('.doctor-image');

    const ctx = gsap.context(() => {
      // Cards fade up with stagger
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image scale reveal
      gsap.fromTo(
        imageContainers,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Limit to 4 doctors for cleaner homepage
  const displayDoctors = doctors.slice(0, 4);

  return (
    <Section background="default" padding="lg" className="section-light relative overflow-hidden">
      {/* Editorial Section Number */}
      <span className="editorial-number text-[12rem] md:text-[16rem] text-[var(--color-primary)]/[0.03] absolute -top-16 right-0 select-none pointer-events-none">
        02
      </span>

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 relative z-10">
        <div className="max-w-2xl">
          <TextReveal
            type="words"
            animation="fade-up"
            stagger={0.05}
            duration={0.8}
            className="inline-block text-sm text-[var(--color-primary)] mb-4"
          >
            Equipo de Expertos
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
            {t('doctors.title')}
          </TextReveal>

          <TextReveal
            as="p"
            type="lines"
            animation="fade-up"
            duration={0.8}
            delay={0.2}
            className="mt-4 text-gray-600"
          >
            {t('doctors.subtitle')}
          </TextReveal>
        </div>

        <div className="hidden lg:block">
          <TextReveal
            type="words"
            animation="fade-up"
            duration={0.6}
            delay={0.3}
          >
            <MagneticButton strength={0.3}>
              <Link href="/directorio">
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('doctors.viewAll')}
                </Button>
              </Link>
            </MagneticButton>
          </TextReveal>
        </div>
      </div>

      {/* Doctors Grid - Premium 2x2 Layout */}
      <div
        ref={cardsRef}
        className="grid sm:grid-cols-2 gap-8 relative z-10"
      >
        {displayDoctors.map((doctor) => {
          const doctorBranches = doctor.branches
            .map((branchId) => branches.find((b) => b.id === branchId)?.name)
            .filter(Boolean);

          return (
            <div
              key={doctor.id}
              className="doctor-card"
            >
              <Link href={`/directorio/${doctor.slug}`} className="block h-full group">
                <div className="h-full glass-card card-hover-glow rounded-2xl overflow-hidden">
                  {/* Image Container - Larger with grayscale→color */}
                  <div className="relative h-72 overflow-hidden">
                    <div className="doctor-image absolute inset-0">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover image-grayscale-reveal scale-105 group-hover:scale-100 transition-all duration-700"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Founder Badge - Premium */}
                    {doctor.isFounder && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-dark)] text-white text-xs font-semibold rounded-full shadow-lg shadow-[var(--color-secondary)]/30">
                          {t('doctors.founder')}
                        </span>
                      </div>
                    )}

                    {/* Doctor Info Overlay on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-semibold text-white text-lg">
                        {doctor.name}
                      </h3>
                      <p className="text-white/80 text-sm mt-1">
                        {t(doctor.roleKey)}
                      </p>
                    </div>
                  </div>

                  {/* Content - Simplified */}
                  <div className="p-6">
                    {/* Branches */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110" />
                      <span className="truncate">{doctorBranches.join(', ')}</span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(locale === 'en' ? doctor.specialtiesEn : doctor.specialties)
                        .slice(0, 2)
                        .map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-xs font-medium rounded-full transition-all duration-300 group-hover:bg-[var(--color-primary)]/10"
                          >
                            {specialty}
                          </span>
                        ))}
                    </div>

                    {/* View Profile Link */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <span className="flex items-center justify-between text-sm font-medium text-[var(--color-primary)]">
                        {t('doctors.viewProfile')}
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-10 text-center lg:hidden">
        <TextReveal
          type="words"
          animation="fade-up"
          duration={0.6}
        >
          <MagneticButton strength={0.3}>
            <Link href="/directorio">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t('doctors.viewAll')}
              </Button>
            </Link>
          </MagneticButton>
        </TextReveal>
      </div>
    </Section>
  );
}

export default DoctorsPreview;
