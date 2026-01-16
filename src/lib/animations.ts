// Easing presets matching Inversa-style animations
export const easings = {
  // Smooth, cinematic ease-out
  smooth: 'power3.out',
  // Dramatic ease for reveals
  dramatic: 'expo.out',
  // Bouncy for buttons/interactions
  bouncy: 'elastic.out(1, 0.5)',
  // Linear for scrub animations
  linear: 'none',
  // Smooth in-out for transitions
  inOut: 'power2.inOut',
} as const;

// Duration presets
export const durations = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  dramatic: 1.6,
} as const;

// Stagger presets
export const staggers = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  dramatic: 0.2,
} as const;

// Common animation configurations
export const animations = {
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
  slideFromLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  slideFromRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  blurIn: {
    from: { opacity: 0, filter: 'blur(20px)' },
    to: { opacity: 1, filter: 'blur(0px)' },
  },
} as const;

// Scroll trigger defaults
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none none',
} as const;

// Mobile breakpoint for disabling heavy animations
export const MOBILE_BREAKPOINT = 1024;

// Check if we should reduce motion
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Check if on mobile device
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

// Check if touch device
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
