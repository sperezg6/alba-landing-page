'use client';

import React, { ReactNode, useRef, ElementType } from 'react';
import { motion, useInView, Variants, UseInViewOptions } from 'framer-motion';

// Animation variant types
export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale'
  | 'blur'
  | 'fade';

// Configuration options for animations
export interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

// Props for the ScrollReveal component
export interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

// Props for the ScrollRevealGroup component (stagger animations)
export interface ScrollRevealGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  variant?: AnimationVariant;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

// Subtle, professional easing curve (ease-out-cubic)
const easeOutCubic: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Animation variants - kept subtle and professional
const getVariants = (variant: AnimationVariant, duration: number): Variants => {
  const baseTransition = {
    duration,
    ease: easeOutCubic,
  };

  const variants: Record<AnimationVariant, Variants> = {
    'fade-up': {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: baseTransition,
      },
    },
    'fade-down': {
      hidden: { opacity: 0, y: -24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: baseTransition,
      },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -24 },
      visible: {
        opacity: 1,
        x: 0,
        transition: baseTransition,
      },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 24 },
      visible: {
        opacity: 1,
        x: 0,
        transition: baseTransition,
      },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: baseTransition,
      },
    },
    'blur': {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: baseTransition,
      },
    },
    'fade': {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: baseTransition,
      },
    },
  };

  return variants[variant];
};

// Get stagger container variants
const getContainerVariants = (staggerDelay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0,
    },
  },
});

// Get stagger child variants
const getChildVariants = (variant: AnimationVariant, duration: number): Variants => {
  const baseVariants = getVariants(variant, duration);
  return {
    hidden: baseVariants.hidden,
    visible: baseVariants.visible,
  };
};

/**
 * ScrollReveal Component
 *
 * A reusable component for scroll-triggered animations.
 * Uses Framer Motion's useInView hook for viewport detection.
 *
 * @example
 * <ScrollReveal variant="fade-up" delay={0.1}>
 *   <h1>Hello World</h1>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  className = '',
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  } as UseInViewOptions);

  const variants = getVariants(variant, duration);
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * ScrollRevealGroup Component
 *
 * A container component for stagger animations on lists/grids.
 * Children will animate in sequence with configurable delay.
 *
 * @example
 * <ScrollRevealGroup staggerDelay={0.1} variant="fade-up">
 *   <ScrollRevealItem>Item 1</ScrollRevealItem>
 *   <ScrollRevealItem>Item 2</ScrollRevealItem>
 *   <ScrollRevealItem>Item 3</ScrollRevealItem>
 * </ScrollRevealGroup>
 */
export function ScrollRevealGroup({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  className = '',
  as = 'div',
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  } as UseInViewOptions);

  const containerVariants = getContainerVariants(staggerDelay);
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * ScrollRevealItem Component
 *
 * Individual item component to be used within ScrollRevealGroup.
 * Inherits animation settings from parent group.
 *
 * @example
 * <ScrollRevealGroup>
 *   <ScrollRevealItem className="card">Card content</ScrollRevealItem>
 * </ScrollRevealGroup>
 */
export interface ScrollRevealItemProps {
  children: ReactNode;
  variant?: AnimationVariant;
  duration?: number;
  className?: string;
  as?: ElementType;
}

export function ScrollRevealItem({
  children,
  variant = 'fade-up',
  duration = 0.6,
  className = '',
  as = 'div',
}: ScrollRevealItemProps) {
  const childVariants = getChildVariants(variant, duration);
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      variants={childVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

// Export pre-configured animation presets for consistency
export const scrollAnimationPresets = {
  // Section headers - subtle fade up
  sectionHeader: {
    variant: 'fade-up' as AnimationVariant,
    duration: 0.6,
    threshold: 0.3,
  },
  // Cards and grid items - stagger effect
  cards: {
    staggerDelay: 0.12,
    variant: 'fade-up' as AnimationVariant,
    duration: 0.5,
    threshold: 0.2,
  },
  // Hero content - faster, more immediate
  hero: {
    variant: 'fade-up' as AnimationVariant,
    duration: 0.5,
    staggerDelay: 0.1,
  },
  // CTA sections - scale effect for emphasis
  cta: {
    variant: 'scale' as AnimationVariant,
    duration: 0.7,
    threshold: 0.3,
  },
} as const;

export default ScrollReveal;
