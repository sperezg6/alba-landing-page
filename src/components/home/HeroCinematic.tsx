'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollCursor } from '@/components/ui/ScrollCursor';

gsap.registerPlugin(ScrollTrigger);

export function HeroCinematic() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the vertical scroll progress line
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden cursor-none"
    >
      {/* Custom cursor with SCROLL text */}
      <ScrollCursor containerRef={sectionRef} />

      {/* Full-bleed background image */}
      <Image
        src="/hero-inversa.png"
        alt="Alba Dialysis - Kidney Care Excellence"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Vertical scroll progress line - Right */}
        <div className="absolute right-6 md:right-10 top-1/3 bottom-1/3 w-px bg-white/20">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 w-full h-full bg-white/60 origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* Bottom content - Headline + CTA */}
        <div className="mt-auto p-6 md:p-10 lg:p-16 pb-12 md:pb-16">
          {/* Headline - Bold display font, Inversa style */}
          <h1 className="inversa-headline max-w-5xl">
            {t('headlineLine1')}<br />
            {t('headlineLine2')}
          </h1>

          {/* CTA Button - Lime/chartreuse, Inversa style */}
          <Link
            href="/servicios"
            className="inline-block mt-6 md:mt-8 px-5 py-2.5 md:px-6 md:py-3 bg-alba-primary text-black text-sm font-semibold uppercase tracking-wider rounded hover:bg-alba-primary-dark transition-colors cursor-pointer"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroCinematic;
