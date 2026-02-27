'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function StatementSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!sectionRef.current || !textRef.current) return;

      const ctx = gsap.context(() => {
        const chars = textRef.current?.querySelectorAll('.char');
        if (!chars || chars.length === 0) return;

        // Set initial state
        gsap.set(chars, { opacity: 0.15, y: 10 });

        // Create the pinned scroll animation
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%', // Pin for 1.5x viewport height
            pin: true,
            scrub: 1,
            // Disable on mobile for better UX
            // @ts-ignore
            invalidateOnRefresh: true,
          },
        })
          .to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            ease: 'none',
          });
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const statementText = t('subtitle');

  return (
    <section
      ref={sectionRef}
      className="section-fullscreen section-center bg-alba-dark relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <h2
          ref={textRef}
          className="headline-statement text-gray-900 leading-relaxed"
        >
          <SplitText charClassName="transition-colors duration-300">
            {statementText}
          </SplitText>
        </h2>

        {/* Decorative element */}
        <div className="mt-12 flex justify-center">
          <div className="w-16 h-0.5 bg-[var(--color-secondary)]" />
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-[var(--color-secondary)]/5 blur-3xl" />
    </section>
  );
}

export default StatementSection;
