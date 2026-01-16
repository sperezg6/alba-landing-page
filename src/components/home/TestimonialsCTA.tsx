'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Phone, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { TextReveal, MagneticButton } from '@/components/animations';
import { testimonials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsCTA() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1);
  };

  const currentTestimonial = testimonials[activeIndex];

  // Section scale animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { scale: 0.95, borderRadius: '2rem' },
        {
          scale: 1,
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark py-24 md:py-32 overflow-hidden relative"
    >
      {/* Floating Orbs - Ambient Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-gold w-64 h-64 top-1/4 -left-32" style={{ animationDelay: '0s' }} />
        <div className="floating-orb floating-orb-teal w-96 h-96 bottom-1/4 -right-48" style={{ animationDelay: '5s' }} />
        <div className="floating-orb floating-orb-gold w-48 h-48 top-2/3 left-1/4" style={{ animationDelay: '10s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Testimonial Section */}
        <div className="mb-20 relative">
          {/* Editorial Large Number */}
          <span className="editorial-number text-[10rem] md:text-[14rem] text-[var(--color-secondary)]/[0.05] absolute -top-20 -left-8 select-none pointer-events-none">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>

          <div className="text-center mb-12 relative z-10">
            <TextReveal
              type="words"
              animation="fade-up"
              stagger={0.05}
              duration={0.8}
              className="inline-block text-sm text-[var(--color-secondary)] mb-4"
            >
              {t('testimonials.subtitle')}
            </TextReveal>

            <TextReveal
              as="h2"
              type="lines"
              animation="fade-up"
              stagger={0.1}
              duration={1}
              delay={0.1}
              className="text-3xl md:text-4xl font-bold"
            >
              {t('testimonials.title')}
            </TextReveal>
          </div>

          {/* Single Testimonial - Premium Glass Card */}
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="glass-card-dark rounded-2xl border border-white/5 p-8 md:p-12 shadow-2xl">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[var(--color-secondary)] fill-[var(--color-secondary)]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                ref={quoteRef}
                className="text-xl md:text-2xl text-[var(--color-dark-text)] leading-relaxed mb-8"
              >
                &ldquo;{locale === 'en' ? currentTestimonial.contentEn : currentTestimonial.content}&rdquo;
              </blockquote>

              {/* Author and Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-[var(--color-dark-border)]">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--color-dark-elevated)]">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-dark-text)]">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-sm text-[var(--color-dark-muted)]">
                      {locale === 'en' ? currentTestimonial.roleEn : currentTestimonial.role}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-dark-muted)] mr-2">
                    {activeIndex + 1} / {testimonials.length}
                  </span>
                  <MagneticButton strength={0.4}>
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full border border-[var(--color-dark-border)] flex items-center justify-center text-[var(--color-dark-muted)] hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-all duration-300"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.4}>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-dark-bg)] flex items-center justify-center hover:bg-[var(--color-secondary-light)] transition-all duration-300"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <TextReveal
            as="h3"
            type="lines"
            animation="fade-up"
            stagger={0.1}
            duration={1}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            {t('cta.title')}
          </TextReveal>

          <TextReveal
            as="p"
            type="lines"
            animation="fade-up"
            duration={0.8}
            delay={0.2}
            className="text-lg text-[var(--color-dark-muted)] max-w-2xl mx-auto mb-10"
          >
            {t('cta.subtitle')}
          </TextReveal>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TextReveal
              type="words"
              animation="fade-up"
              duration={0.6}
              delay={0.4}
            >
              <MagneticButton strength={0.3}>
                <Link href="/contacto">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="btn-gold"
                  >
                    {t('cta.button')}
                  </Button>
                </Link>
              </MagneticButton>
            </TextReveal>

            <TextReveal
              type="words"
              animation="fade-up"
              duration={0.6}
              delay={0.5}
            >
              <MagneticButton strength={0.3}>
                <a href="tel:4773293939">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<Phone className="w-5 h-5" />}
                    className="border-[var(--color-dark-border)] text-[var(--color-dark-text)] hover:bg-[var(--color-dark-surface)] hover:border-[var(--color-secondary)]"
                  >
                    477-329-39-39
                  </Button>
                </a>
              </MagneticButton>
            </TextReveal>
          </div>

          {/* Trust indicator */}
          <div className="mt-12 text-sm text-[var(--color-dark-muted)]">
            {t('testimonials.trustIndicator')}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCTA;
