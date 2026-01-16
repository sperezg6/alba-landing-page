'use client';

import { useEffect, useRef, RefObject, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollTriggerOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

interface ScrollTriggerState {
  isActive: boolean;
  progress: number;
  direction: 'up' | 'down' | null;
}

export function useScrollTrigger<T extends HTMLElement>(
  options: ScrollTriggerOptions = {}
): [RefObject<T | null>, ScrollTriggerState] {
  const {
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    pin = false,
    markers = false,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = options;

  const elementRef = useRef<T>(null);
  const [state, setState] = useState<ScrollTriggerState>({
    isActive: false,
    progress: 0,
    direction: null,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Still allow callbacks for non-motion logic
      setState({ isActive: true, progress: 1, direction: null });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      pin,
      markers,
      onEnter: () => {
        setState(prev => ({ ...prev, isActive: true, direction: 'down' }));
        onEnter?.();
      },
      onLeave: () => {
        setState(prev => ({ ...prev, isActive: false, direction: 'down' }));
        onLeave?.();
      },
      onEnterBack: () => {
        setState(prev => ({ ...prev, isActive: true, direction: 'up' }));
        onEnterBack?.();
      },
      onLeaveBack: () => {
        setState(prev => ({ ...prev, isActive: false, direction: 'up' }));
        onLeaveBack?.();
      },
      onUpdate: (self) => {
        setState(prev => ({ ...prev, progress: self.progress }));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [start, end, scrub, pin, markers, onEnter, onLeave, onEnterBack, onLeaveBack]);

  return [elementRef, state];
}
