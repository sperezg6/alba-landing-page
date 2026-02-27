'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { usePostHog } from 'posthog-js/react';
import { ArrowRight, Phone, Check } from 'lucide-react';
import { Button, AnimatedCounter } from '@/components/ui';
import { TextReveal, MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const t = useTranslations();
  const posthog = usePostHog();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const benefits = [
    'Atencion personalizada 24/7',
    'Tecnologia de vanguardia',
    'Equipo medico especializado',
    'Seguimiento integral',
  ];

  // Section scale animation on scroll
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

  // Card animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
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

  // Benefits stagger animation
  useEffect(() => {
    const benefits = benefitsRef.current;
    if (!benefits) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const benefitItems = benefits.querySelectorAll('.benefit-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        benefitItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: benefits,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4DBDC9 0%, #6BC5A0 25%, #B8D45C 50%, #F59F20 75%, #EE5631 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Simple Label */}
            <TextReveal
              type="words"
              animation="fade-up"
              stagger={0.05}
              duration={0.8}
              className="inline-block text-sm text-white/60"
            >
              +5,000 pacientes confian en nosotros
            </TextReveal>

            {/* Heading */}
            <TextReveal
              as="h2"
              type="lines"
              animation="fade-up"
              stagger={0.1}
              duration={1}
              delay={0.1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              {t('cta.title')}
            </TextReveal>

            <TextReveal
              as="p"
              type="lines"
              animation="fade-up"
              duration={0.8}
              delay={0.2}
              className="text-lg text-white/70 max-w-lg"
            >
              {t('cta.subtitle')}
            </TextReveal>

            {/* Benefits List */}
            <div ref={benefitsRef} className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-item flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-white" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <TextReveal
                type="words"
                animation="fade-up"
                duration={0.6}
                delay={0.4}
              >
                <MagneticButton strength={0.3}>
                  <Link
                    href="/contacto"
                    onClick={() => posthog.capture('cta_clicked', {
                      button_text: t('cta.button'),
                      source: 'cta_section',
                      destination: '/contacto',
                    })}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      className="bg-white text-gray-900 hover:bg-white/90"
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
                  <a
                    href="tel:4773293939"
                    onClick={() => posthog.capture('phone_clicked', {
                      phone_number: '477-329-39-39',
                      source: 'cta_section',
                    })}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      leftIcon={<Phone className="w-5 h-5" />}
                      className="border-white/30 text-white hover:bg-white hover:text-gray-900"
                    >
                      477-329-39-39
                    </Button>
                  </a>
                </MagneticButton>
              </TextReveal>
            </div>
          </div>

          {/* Right Side - Simple Card */}
          <div ref={cardRef}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white">Alba Dialisis</h3>
                <p className="text-sm text-white/60 mt-1">Centro de Excelencia Renal</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
                {[
                  { value: 25, suffix: '+', label: 'Años' },
                  { value: 5, suffix: 'K+', label: 'Pacientes' },
                  { value: 4, suffix: '', label: 'Sucursales' },
                ].map((stat, index) => (
                  <div key={index} className="text-center group cursor-default transition-transform duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-[#F59F20]">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                        delay={index * 0.2}
                      />
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                {[
                  'Certificados por COFEPRIS',
                  'Equipos de ultima generacion',
                  'Personal altamente calificado',
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 hover:translate-x-1 cursor-default"
                  >
                    <Check className="w-4 h-4 text-[#F59F20] transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm text-white/80">{badge}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-400 font-medium">Disponible 24/7</p>
                <p className="text-xs text-white/50 mt-0.5">Atencion de emergencias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
