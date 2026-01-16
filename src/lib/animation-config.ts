/**
 * Centralized animation configuration for Alba landing page
 * Used with GSAP and Framer Motion
 */

export const ANIMATION_CONFIG = {
  // Timing durations (in seconds)
  duration: {
    fast: 0.4,
    base: 0.6,
    slow: 1.0,
    hero: 1.2,
  },

  // Stagger delays (in seconds)
  stagger: {
    tight: 0.05,
    base: 0.1,
    relaxed: 0.15,
  },

  // GSAP easing functions
  ease: {
    smooth: 'power2.out',
    dramatic: 'expo.out',
    bounce: 'back.out(1.7)',
    linear: 'none',
    inOut: 'power2.inOut',
  },

  // Parallax layer speeds (as yPercent values)
  parallax: {
    background: 70,
    midground: 50,
    content: 30,
    foreground: 10,
  },

  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
  },

  // Section-specific scroll triggers
  sections: {
    hero: {
      start: '0% 0%',
      end: '100% 0%',
      scrub: 0,
    },
    fade: {
      start: 'top 85%',
      end: 'top 50%',
      scrub: true,
    },
    pin: {
      start: 'top top',
      end: '+=200%',
      pin: true,
    },
  },
} as const;

// Framer Motion variants
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.base,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.base,
      delayChildren: 0.1,
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.base,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
