'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, AnimatedCounter } from '@/components/ui';
import { TextReveal, MagneticButton } from '@/components/animations';
import { testimonials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1);
  };

  const currentTestimonial = testimonials[activeIndex];

  // Card animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
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

  // Quote transition animation
  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      quote,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'expo.out',
      }
    );
  }, [activeIndex]);

  return (
    <Section background="surface" padding="lg">
      {/* Section Header */}
      <div className="text-center mb-12">
        <TextReveal
          type="words"
          animation="fade-up"
          stagger={0.05}
          duration={0.8}
          className="inline-block text-sm text-[var(--color-primary)] mb-4"
        >
          Lo Que Dicen Nuestros Pacientes
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
          {t('testimonials.title')}
        </TextReveal>

        <TextReveal
          as="p"
          type="lines"
          animation="fade-up"
          duration={0.8}
          delay={0.2}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          {t('testimonials.subtitle')}
        </TextReveal>
      </div>

      {/* Testimonial Card */}
      <div className="max-w-3xl mx-auto">
        <div
          ref={cardRef}
          className="bg-white rounded-xl border border-gray-100 p-8 md:p-12"
        >
          {/* Rating Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[var(--color-secondary)] fill-[var(--color-secondary)]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            ref={quoteRef}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8"
          >
            &ldquo;{locale === 'en' ? currentTestimonial.contentEn : currentTestimonial.content}&rdquo;
          </blockquote>

          {/* Author and Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {locale === 'en' ? currentTestimonial.roleEn : currentTestimonial.role}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-2">
                {activeIndex + 1} / {testimonials.length}
              </span>
              <MagneticButton strength={0.4}>
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary-dark)] hover:scale-110 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Stats */}
      <div
        ref={statsRef}
        className="mt-16 flex flex-wrap items-center justify-center gap-12"
      >
        {[
          { value: 5000, suffix: '+', label: 'Pacientes' },
          { value: 5, suffix: '.0', label: 'Calificacion' },
          { value: 98, suffix: '%', label: 'Satisfaccion' },
        ].map((stat, index) => (
          <div key={index} className="text-center group cursor-default">
            <div className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                duration={2}
                delay={index * 0.15}
              />
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Testimonials;
