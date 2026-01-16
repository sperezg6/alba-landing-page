'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxOptions {
  speed?: number;        // 0.1 to 1 (0.3 = 30% of scroll speed)
  direction?: 'vertical' | 'horizontal';
  start?: string;        // ScrollTrigger start
  end?: string;          // ScrollTrigger end
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
): RefObject<T | null> {
  const {
    speed = 0.3,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const movement = direction === 'vertical' ? 'yPercent' : 'xPercent';
    const distance = speed * 100;

    const animation = gsap.fromTo(
      element,
      { [movement]: -distance / 2 },
      {
        [movement]: distance / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          start,
          end,
          scrub: true,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, [speed, direction, start, end]);

  return elementRef;
}
