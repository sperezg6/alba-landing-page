'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function SingleTestimonial() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  // Use the first testimonial for the featured quote
  const featured = testimonials[0];

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in quote text on scroll
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate quotation marks
      gsap.from('.quote-mark', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fullscreen section-center bg-alba-dark relative overflow-hidden"
    >
      {/* Decorative quotation marks */}
      <span className="quote-mark quote-mark-large absolute top-[15%] left-[10%] text-[var(--color-primary)]/5 select-none">
        &ldquo;
      </span>
      <span className="quote-mark quote-mark-large absolute bottom-[15%] right-[10%] text-[var(--color-primary)]/5 select-none rotate-180">
        &ldquo;
      </span>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Section label */}
        <span className="text-sm text-[var(--color-primary)] uppercase tracking-[0.3em] font-medium mb-8 block">
          {t('title')}
        </span>

        {/* Quote */}
        <blockquote ref={quoteRef}>
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-900 font-serif leading-relaxed italic">
            &ldquo;{locale === 'en' ? featured.contentEn : featured.content}&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        <div className="mt-12 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-[var(--color-secondary)]/20">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Name and role */}
          <p className="mt-4 text-lg font-semibold text-gray-900">
            {featured.name}
          </p>
          <p className="text-sm text-gray-500">
            {locale === 'en' ? featured.roleEn : featured.role}
          </p>

          {/* Rating stars */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: featured.rating }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-[var(--color-secondary)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Trust indicator */}
        <p className="mt-12 text-sm text-gray-400">
          {t('trustIndicator')}
        </p>
      </div>

      {/* Subtle background accents */}
      <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-[var(--color-secondary)]/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-48 h-48 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
    </section>
  );
}

export default SingleTestimonial;
