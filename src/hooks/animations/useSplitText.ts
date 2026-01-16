'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

interface SplitTextOptions {
  type?: 'lines' | 'words' | 'chars';
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  animation?: 'fade-up' | 'fade-in' | 'blur-in' | 'slide-up';
}

export function useSplitText<T extends HTMLElement>(
  options: SplitTextOptions = {}
): RefObject<T | null> {
  const {
    type = 'lines',
    stagger = 0.1,
    duration = 1,
    delay = 0,
    start = 'top 80%',
    animation = 'fade-up',
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Split the text
    const split = new SplitType(element, { types: type });
    const targets = split[type];

    if (!targets) return;

    // Animation configurations
    const animations = {
      'fade-up': {
        from: { opacity: 0, y: 40, rotateX: -10 },
        to: { opacity: 1, y: 0, rotateX: 0 },
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      'blur-in': {
        from: { opacity: 0, filter: 'blur(10px)' },
        to: { opacity: 1, filter: 'blur(0px)' },
      },
      'slide-up': {
        from: { opacity: 0, y: '100%' },
        to: { opacity: 1, y: '0%' },
      },
    };

    const { from, to } = animations[animation];

    // Set initial state
    gsap.set(targets, from);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    });

    tl.to(targets, {
      ...to,
      duration,
      stagger,
      delay,
      ease: 'expo.out',
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, [type, stagger, duration, delay, start, animation]);

  return elementRef;
}
