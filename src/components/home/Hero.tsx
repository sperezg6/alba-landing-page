'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { usePostHog } from 'posthog-js/react';
import { Button } from '@/components/ui';
import { TextReveal, MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const t = useTranslations();
  const posthog = usePostHog();
  const heroRef = useRef<HTMLElement>(null);
  const parallaxLayersRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Multi-layer parallax effect
  useEffect(() => {
    const hero = heroRef.current;
    const parallaxLayers = parallaxLayersRef.current;

    if (!hero || !parallaxLayers) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Create timeline for multi-layer parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      // Layer 1: Background image - strongest parallax (moves most)
      tl.to(
        parallaxLayers.querySelectorAll('[data-parallax-layer="1"]'),
        {
          yPercent: 50,
          scale: 1.1,
          ease: 'none',
        },
        0
      );

      // Layer 2: Overlay pattern - medium parallax
      tl.to(
        parallaxLayers.querySelectorAll('[data-parallax-layer="2"]'),
        {
          yPercent: 35,
          ease: 'none',
        },
        0
      );

      // Layer 3: Content/Title - slower parallax (moves less)
      tl.to(
        parallaxLayers.querySelectorAll('[data-parallax-layer="3"]'),
        {
          yPercent: 20,
          opacity: 0,
          ease: 'none',
        },
        0
      );

      // Layer 4: Foreground gradient - minimal movement
      tl.to(
        parallaxLayers.querySelectorAll('[data-parallax-layer="4"]'),
        {
          yPercent: 5,
          ease: 'none',
        },
        0
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  // Scroll indicator animations
  useEffect(() => {
    const scrollIndicator = scrollIndicatorRef.current;
    if (!scrollIndicator) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Fade out on scroll
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: scrollIndicator,
          start: 'top 90%',
          end: 'top 60%',
          scrub: true,
        },
      });

      // Bounce animation
      const bounceElement = scrollIndicator.querySelector('.bounce-element');
      if (bounceElement) {
        gsap.to(bounceElement, {
          y: 8,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Entrance animation
      gsap.from(scrollIndicator, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2,
        ease: 'expo.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="section-dark relative h-screen min-h-[700px] -mt-20 overflow-hidden"
      aria-label={t('hero.ariaLabel') || 'Hero section'}
    >
      {/* Multi-Layer Parallax Container */}
      <div
        ref={parallaxLayersRef}
        data-parallax-layers
        className="absolute inset-0"
      >
        {/* Layer 1: Background Image (strongest parallax) */}
        <div
          data-parallax-layer="1"
          className="absolute inset-0 will-change-transform"
          style={{ transform: 'scale(1.15)' }}
        >
          <Image
            src="/hero-water-abstract.webp"
            alt="Abstract water waves representing kidney health and dialysis care at Alba Dialisis"
            fill
            className="object-cover"
            style={{ objectPosition: '50% 60%' }}
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* Layer 2: Subtle pattern overlay (medium parallax) */}
        <div
          data-parallax-layer="2"
          className="absolute inset-0 will-change-transform opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Layer 2b: Color gradient overlay */}
        <div
          data-parallax-layer="2"
          className="absolute inset-0 will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Layer 3: Main Content (slower parallax) */}
        <div
          data-parallax-layer="3"
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-end will-change-transform"
        >
          <div className="relative z-10 w-full p-8 md:p-16 lg:p-24 pb-32">
            <div className="max-w-4xl">
              {/* Section Label */}
              <div className="overflow-hidden mb-6">
                <TextReveal
                  type="words"
                  animation="fade-up"
                  stagger={0.05}
                  duration={0.8}
                  start="top 95%"
                  className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-[var(--color-secondary)]"
                >
                  // {t('hero.badge')}
                </TextReveal>
              </div>

              {/* Headline - Line by Line Reveal */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 text-white">
                <TextReveal
                  type="lines"
                  animation="fade-up"
                  stagger={0.15}
                  duration={1.2}
                  delay={0.2}
                  start="top 95%"
                >
                  {t('hero.line1') || 'Tu salud renal'}
                </TextReveal>
                <TextReveal
                  type="lines"
                  animation="fade-up"
                  stagger={0.15}
                  duration={1.2}
                  delay={0.35}
                  start="top 95%"
                >
                  {t('hero.line2') || 'en las mejores'}
                </TextReveal>
                <TextReveal
                  type="lines"
                  animation="fade-up"
                  stagger={0.15}
                  duration={1.2}
                  delay={0.5}
                  start="top 95%"
                >
                  {t('hero.line3') || 'manos.'}
                </TextReveal>
              </h1>

              {/* Subtitle */}
              <TextReveal
                type="lines"
                animation="fade-up"
                duration={1}
                delay={0.7}
                start="top 95%"
                className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
              >
                {t('hero.subtitle')}
              </TextReveal>

              {/* CTA Button with Magnetic Effect */}
              <div className="overflow-hidden">
                <TextReveal
                  type="words"
                  animation="fade-up"
                  duration={0.8}
                  delay={0.9}
                  start="top 95%"
                >
                  <MagneticButton strength={0.3}>
                    <Link
                      href="/servicios"
                      onClick={() => posthog.capture('cta_clicked', {
                        button_text: t('hero.cta'),
                        source: 'hero_section',
                        destination: '/servicios',
                      })}
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                        className="bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-light)] border-none shadow-lg shadow-[var(--color-secondary)]/20"
                      >
                        {t('hero.cta')}
                      </Button>
                    </Link>
                  </MagneticButton>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: Bottom fade gradient to dark (minimal movement) */}
        <div
          data-parallax-layer="4"
          className="absolute bottom-0 left-0 right-0 h-[40%] will-change-transform pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-bg)] via-[var(--color-dark-bg)]/50 to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator (fixed, not part of parallax) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
          Scroll
        </span>
        <div className="bounce-element">
          <ChevronDown className="w-5 h-5 text-white/50" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
