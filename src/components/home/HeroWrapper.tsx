'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollCursor } from '@/components/ui/ScrollCursor';

gsap.registerPlugin(ScrollTrigger);

export function HeroWrapper() {
  const t = useTranslations('hero');
  const tScroll = useTranslations('heroScroll');
  const locale = useLocale();
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
      className="relative z-20 h-[300vh] w-full overflow-hidden rounded-b-[48px] md:rounded-b-[64px]"
    >
      {/* Single continuous background image - spans all 3 viewports */}
      <div
        ref={imageRef}
        className="absolute inset-0 h-[130%] -top-[10%]"
      >
        <Image
          src="/hero-test4.webp"
          alt="Alba Dialysis - Kidney Care Excellence"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 85%' }}
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

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
        <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-16 pb-24 md:pb-32">
          <h1
            className="font-light leading-[0.95] tracking-tight"
            style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
          >
            {t('headlineLine1')}<br />
            <span className="md:whitespace-nowrap">
              {locale === 'en' ? (
                <>your <span style={{ color: '#F59F20' }}>new dawn.</span></>
              ) : (
                <>tu <span style={{ color: '#F59F20' }}>nuevo amanecer.</span></>
              )}
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 mt-6 md:mt-8">
            <Link
              href="/servicios"
              className="inline-block px-5 py-2.5 md:px-6 md:py-3 bg-alba-primary text-black text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-alba-primary-dark transition-colors cursor-pointer"
            >
              {t('ctaButton')}
            </Link>
            <Link
              href="/contacto"
              className="inline-block px-5 py-2.5 md:px-6 md:py-3 border border-white text-white text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              {t('appointmentButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: RESTORATION (Second viewport) ========== */}
      <section className="relative z-10 h-screen w-full flex items-center">
        <div
          ref={scrollContent1Ref}
          className="ml-auto mr-6 md:mr-24 lg:mr-32 pl-6 md:pl-0 max-w-md md:max-w-lg lg:max-w-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-alba-primary shadow-[0_0_8px_rgba(245,159,32,0.6)]" />
            <span className="text-alba-primary text-base font-semibold uppercase tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {tScroll('label')}
            </span>
          </div>
          <p className="text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {tScroll('description')}
          </p>
        </div>
      </section>

      {/* ========== SECTION 3: MEDICAL EXCELLENCE + STATEMENT (Third viewport) ========== */}
      <section className="relative z-10 h-screen w-full flex items-center">
        <div
          ref={scrollContent2Ref}
          className="mr-auto ml-6 md:ml-16 lg:ml-24 pr-6 md:pr-0 max-w-md md:max-w-lg lg:max-w-xl space-y-8 md:space-y-10"
        >
          {/* Medical Excellence */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-alba-primary shadow-[0_0_8px_rgba(245,159,32,0.6)]" />
              <span className="text-alba-primary text-base font-semibold uppercase tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {tScroll('label2')}
              </span>
            </div>
            <p className="text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {tScroll('description2')}
            </p>
          </div>

          {/* Statement headline */}
          <div className="pt-4">
            <p className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {tScroll('statement')}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HeroWrapper;
