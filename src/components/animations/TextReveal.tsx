'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: ReactNode;
  type?: 'lines' | 'words' | 'chars';
  animation?: 'fade-up' | 'slide-up' | 'blur-in' | 'fade-in';
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function TextReveal({
  children,
  type = 'lines',
  animation = 'fade-up',
  stagger = 0.1,
  duration = 1,
  delay = 0,
  start = 'top 80%',
  className,
  as: Component = 'div',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    // Split the text
    const split = new SplitType(element, {
      types: type,
      tagName: 'span',
    });

    const targets = split[type];
    if (!targets || targets.length === 0) return;

    // Wrap lines in overflow hidden container for slide-up effect
    if (type === 'lines' && animation === 'slide-up') {
      targets.forEach((line) => {
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
    }

    // Animation configurations
    const animationConfigs = {
      'fade-up': {
        from: { opacity: 0, y: 40, rotateX: -10 },
        to: { opacity: 1, y: 0, rotateX: 0 },
      },
      'slide-up': {
        from: { yPercent: 100 },
        to: { yPercent: 0 },
      },
      'blur-in': {
        from: { opacity: 0, filter: 'blur(10px)' },
        to: { opacity: 1, filter: 'blur(0px)' },
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    };

    const config = animationConfigs[animation];

    // Set initial state
    gsap.set(targets, config.from);

    // Create scroll-triggered animation
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        ...config.to,
        duration,
        stagger,
        delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [type, animation, stagger, duration, delay, start]);

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={cn('will-change-transform', className)}
      style={{ perspective: 1000 }}
    >
      {children}
    </Component>
  );
}
