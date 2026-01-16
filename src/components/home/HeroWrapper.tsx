'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollCursor } from '@/components/ui/ScrollCursor';

gsap.registerPlugin(ScrollTrigger);

export function HeroWrapper() {
  const t = useTranslations('hero');
  const tScroll = useTranslations('heroScroll');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const scrollContent1Ref = useRef<HTMLDivElement>(null);
  const scrollContent2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on background image - moves slower than scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Show/hide progress line container based on wrapper visibility
      if (progressContainerRef.current) {
        gsap.to(progressContainerRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
            onLeave: () => gsap.to(progressContainerRef.current, { opacity: 0, duration: 0.3 }),
            onEnterBack: () => gsap.to(progressContainerRef.current, { opacity: 1, duration: 0.3 }),
            onLeaveBack: () => gsap.to(progressContainerRef.current, { opacity: 0, duration: 0.3 }),
            onEnter: () => gsap.to(progressContainerRef.current, { opacity: 1, duration: 0.3 }),
          },
        });
      }

      // Single progress line that fills through entire wrapper scroll
      if (progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }

      // Fade in second section content (Restoration)
      if (scrollContent1Ref.current) {
        gsap.fromTo(
          scrollContent1Ref.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scrollContent1Ref.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Fade in third section content (Medical Excellence + Statement) - from left
      if (scrollContent2Ref.current) {
        gsap.fromTo(
          scrollContent2Ref.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scrollContent2Ref.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[300vh] w-full overflow-hidden"
    >
      {/* Single continuous background image - spans all 3 viewports */}
      <div
        ref={imageRef}
        className="absolute inset-0 h-[130%] -top-[10%]"
      >
        <Image
          src="/hero-inversa.png"
          alt="Alba Dialysis - Kidney Care Excellence"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

      {/* Single scroll progress line - Fixed position, only visible in hero wrapper */}
      <div
        ref={progressContainerRef}
        className="fixed right-6 md:right-10 top-1/4 bottom-1/4 w-px bg-white/20 z-50 pointer-events-none opacity-0"
      >
        <div
          ref={progressLineRef}
          className="absolute top-0 left-0 w-full h-full bg-alba-primary origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      {/* ========== SECTION 1: HERO (First viewport) ========== */}
      <section className="relative z-10 h-screen w-full cursor-none">
        <ScrollCursor containerRef={wrapperRef} />

        {/* Bottom content - Headline + CTA */}
        <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-16 pb-12 md:pb-16">
          <h1 className="inversa-headline max-w-5xl">
            {t('headlineLine1')}<br />
            {t('headlineLine2')}
          </h1>

          <Link
            href="/servicios"
            className="inline-block mt-6 md:mt-8 px-5 py-2.5 md:px-6 md:py-3 bg-alba-primary text-black text-sm font-semibold uppercase tracking-wider rounded hover:bg-alba-primary-dark transition-colors cursor-pointer"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>

      {/* ========== SECTION 2: RESTORATION (Second viewport) ========== */}
      <section className="relative z-10 h-screen w-full flex items-center">
        <div
          ref={scrollContent1Ref}
          className="ml-auto mr-16 md:mr-24 lg:mr-32 max-w-md md:max-w-lg lg:max-w-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-alba-primary" />
            <span className="text-alba-primary text-sm font-medium uppercase tracking-[0.2em]">
              {tScroll('label')}
            </span>
          </div>
          <p className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
            {tScroll('description')}
          </p>
        </div>
      </section>

      {/* ========== SECTION 3: MEDICAL EXCELLENCE + STATEMENT (Third viewport) ========== */}
      <section className="relative z-10 h-screen w-full flex items-center">
        <div
          ref={scrollContent2Ref}
          className="mr-auto ml-6 md:ml-16 lg:ml-24 max-w-md md:max-w-lg lg:max-w-xl space-y-10"
        >
          {/* Medical Excellence */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-alba-primary text-sm font-medium uppercase tracking-[0.2em]">
                {tScroll('label2')}
              </span>
            </div>
            <p className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
              {tScroll('description2')}
            </p>
          </div>

          {/* Statement headline */}
          <div className="pt-4">
            <p className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
              {tScroll('statement')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroWrapper;
