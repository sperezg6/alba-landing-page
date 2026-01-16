'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  children: ReactNode;
  speed?: number;          // 0.1 to 0.5 recommended
  scale?: number;          // Initial scale (1.1 to 1.3 recommended)
  direction?: 'up' | 'down';
  className?: string;
  imageClassName?: string;
}

export function ParallaxImage({
  children,
  speed = 0.3,
  scale = 1.2,
  direction = 'up',
  className,
  imageClassName,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const distance = speed * 100;
    const yMovement = direction === 'up' ? -distance : distance;

    // Set initial scale
    gsap.set(image, { scale });

    const ctx = gsap.context(() => {
      gsap.to(image, {
        yPercent: yMovement,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, scale, direction]);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <div ref={imageRef} className={cn('w-full h-full', imageClassName)}>
        {children}
      </div>
    </div>
  );
}
