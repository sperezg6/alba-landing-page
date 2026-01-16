'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  speed?: number;  // Multiplier for scroll distance
}

export function HorizontalScroll({
  children,
  className,
  containerClassName,
  speed = 1,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const content = contentRef.current;

    if (!section || !trigger || !content) return;

    // Disable on mobile
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Calculate scroll distance
    const scrollWidth = content.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(content, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: `+=${scrollWidth * speed}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <section ref={sectionRef} className={cn('relative', className)}>
      <div ref={triggerRef} className="overflow-hidden">
        <div
          ref={contentRef}
          className={cn('flex', containerClassName)}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
