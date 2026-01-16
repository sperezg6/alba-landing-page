'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'primary' | 'secondary';
  className?: string;
}

export function ScrollProgress({
  position = 'top',
  color = 'secondary',
  className,
}: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleX: position === 'top' || position === 'bottom' ? 1 : undefined,
        scaleY: position === 'left' || position === 'right' ? 1 : undefined,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, [position]);

  const isHorizontal = position === 'top' || position === 'bottom';
  const colorClass = color === 'primary'
    ? 'bg-[var(--color-primary)]'
    : 'bg-[var(--color-secondary)]';

  const positionClasses = {
    top: 'top-0 left-0 right-0 h-1',
    bottom: 'bottom-0 left-0 right-0 h-1',
    left: 'top-0 bottom-0 left-0 w-1',
    right: 'top-0 bottom-0 right-0 w-1',
  };

  return (
    <div
      ref={progressRef}
      className={cn(
        'fixed z-50',
        positionClasses[position],
        colorClass,
        isHorizontal ? 'origin-left scale-x-0' : 'origin-top scale-y-0',
        className
      )}
    />
  );
}
