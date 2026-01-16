'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function InversaStatement() {
  const t = useTranslations('inversaStatement');
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate headline
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate content block
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F5F5F0] py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Top section: Headline + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Large Headline */}
          <div className="lg:sticky lg:top-32">
            <h2
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-alba-dark leading-[1.1] tracking-tight"
            >
              {t('headlineLine1')}<br />
              <span className="text-alba-dark">{t('headlineLine2')}</span><br />
              {t('headlineLine3')}
            </h2>
          </div>

          {/* Right: Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] w-full max-w-lg ml-auto"
          >
            <Image
              src="/alba_footer_image.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              quality={90}
            />
          </div>
        </div>

        {/* Bottom section: Content block */}
        <div
          ref={contentRef}
          className="mt-20 md:mt-32 max-w-md"
        >
          {/* Label */}
          <span className="text-alba-dark text-xs font-medium uppercase tracking-[0.15em] mb-6 block">
            {t('contentLabel')}
          </span>

          {/* Description */}
          <p className="text-alba-dark/80 text-base md:text-lg leading-relaxed mb-8">
            {t('contentDescription')}
          </p>

          {/* CTA Button */}
          <Link
            href="/nosotros"
            className="inline-block px-6 py-3 bg-alba-primary text-white text-sm font-medium uppercase tracking-wider hover:bg-alba-primary-dark transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default InversaStatement;
