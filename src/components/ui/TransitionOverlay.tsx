'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TransitionOverlayProps {
  from: 'dark' | 'light';
  to: 'dark' | 'light';
  height?: string;
  className?: string;
}

const colors = {
  dark: 'var(--color-dark-bg)',
  light: 'var(--color-background)',
};

export function TransitionOverlay({
  from,
  to,
  height = '30vh',
  className = '',
}: TransitionOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle opacity animation as it scrolls into view
      gsap.fromTo(
        el,
        { opacity: 0.8 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative pointer-events-none ${className}`}
      style={{
        height,
        background: `linear-gradient(to bottom, ${colors[from]} 0%, ${colors[to]} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

export default TransitionOverlay;
