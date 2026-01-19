'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroScrollSection() {
  const t = useTranslations('heroScroll');
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on background image
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade in content
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate vertical line
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax background image - same as hero */}
      <div
        ref={imageRef}
        className="absolute inset-0 -top-[30%] h-[130%]"
      >
        <Image
          src="/hero-alba.png"
          alt="Alba Dialysis Background"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center">
        {/* Right side content */}
        <div
          ref={contentRef}
          className="ml-auto mr-8 md:mr-16 lg:mr-24 max-w-lg lg:max-w-xl xl:max-w-2xl"
        >
          {/* Label */}
          <span className="inline-block px-4 py-2 bg-alba-primary text-white text-sm md:text-base font-semibold uppercase tracking-wider rounded-sm mb-8">
            {t('label')}
          </span>

          {/* Description text */}
          <p className="text-white/90 text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug font-light">
            {t('description')}
          </p>
        </div>

        {/* Lime vertical line on right */}
        <div className="absolute right-6 md:right-10 top-1/4 bottom-1/4 w-px bg-alba-primary/30">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 w-full h-full bg-alba-primary origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroScrollSection;
