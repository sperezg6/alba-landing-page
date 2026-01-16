'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ImageRevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  start?: string;
  scale?: boolean;
  scaleFrom?: number;
}

export function useImageReveal<T extends HTMLElement>(
  options: ImageRevealOptions = {}
): RefObject<T | null> {
  const {
    direction = 'up',
    duration = 1.2,
    delay = 0,
    start = 'top 80%',
    scale = true,
    scaleFrom = 1.2,
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    // Get the image element inside (could be direct child or nested)
    const image = element.querySelector('img') || element;

    // Determine clip-path animation based on direction
    const clipPaths = {
      up: {
        from: 'inset(100% 0% 0% 0%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      down: {
        from: 'inset(0% 0% 100% 0%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      left: {
        from: 'inset(0% 0% 0% 100%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      right: {
        from: 'inset(0% 100% 0% 0%)',
        to: 'inset(0% 0% 0% 0%)',
      },
    };

    const clipPath = clipPaths[direction];

    // Set initial state
    gsap.set(element, { clipPath: clipPath.from });
    if (scale && image !== element) {
      gsap.set(image, { scale: scaleFrom });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
        },
      });

      // Reveal animation
      tl.to(element, {
        clipPath: clipPath.to,
        duration,
        delay,
        ease: 'expo.out',
      });

      // Scale animation for the image
      if (scale && image !== element) {
        tl.to(
          image,
          {
            scale: 1,
            duration: duration * 1.2,
            ease: 'expo.out',
          },
          '<'
        );
      }
    });

    return () => ctx.revert();
  }, [direction, duration, delay, start, scale, scaleFrom]);

  return elementRef;
}
