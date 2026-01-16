# Alba Landing Page - Inversa-Style Scroll Animations Implementation

## Project Context
This is a medical clinic (Alba Diálisis y Trasplantes) landing page built with:
- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (currently used for basic animations)
- **next-intl** for i18n (Spanish/English)

The goal is to implement premium, Inversa.com-style scroll animations while maintaining mobile support and accessibility.

---

## 🎨 Brand & Visual Context

### Color Palette (from globals.css)
```css
--color-primary: #1A4D5C;        /* Deep teal */
--color-primary-light: #2A6B7C;
--color-primary-dark: #0F3540;
--color-secondary: #E8B86D;      /* Golden amber */
--color-secondary-light: #F0CB8A;
--color-background: #FAFAF8;
--color-surface: #FFFFFF;
--color-text: #1D2939;
```

### New Hero Image
The hero background is an **abstract water/light image** located at `/public/hero-water-abstract.jpg` (you'll need to add this file).

**Image characteristics:**
- Cinematic macro shot of water with light refractions
- Deep teal base color matching `--color-primary`
- Golden amber bokeh orbs matching `--color-secondary`
- Dark navy edges perfect for text overlay
- Shallow depth of field with dreamy bokeh
- Thematically represents dialysis (water/purification) subtly

**Visual metaphor:** Water filtration = kidney dialysis treatment (elegant, non-literal)

---

## Phase 1: Core Scroll Infrastructure (Do This First)

### 1.1 Install Required Dependencies
```bash
npm install gsap @studio-freight/lenis split-type @gsap/react
```

### 1.2 Create Smooth Scroll Provider
Create `/src/providers/SmoothScrollProvider.tsx`:

```tsx
'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

interface Props {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<number>();

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
```

### 1.3 Create GSAP Provider
Create `/src/providers/GSAPProvider.tsx`:

```tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GSAPContext = createContext({});

export function useGSAPContext() {
  return useContext(GSAPContext);
}

interface Props {
  children: ReactNode;
}

export function GSAPProvider({ children }: Props) {
  return (
    <GSAPContext.Provider value={{}}>
      {children}
    </GSAPContext.Provider>
  );
}
```

### 1.4 Update Layout
Update `/src/app/[locale]/layout.tsx` to wrap with providers:

```tsx
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { GSAPProvider } from '@/providers/GSAPProvider';

// ... existing imports and config ...

export default async function LocaleLayout({ children, params }: Props) {
  // ... existing code ...

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <GSAPProvider>
              <Navigation />
              <main id="main-content" className="min-h-screen pt-20">{children}</main>
              <Footer />
              <WhatsAppButton />
            </GSAPProvider>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## Phase 2: Animation Utilities & Hooks

### 2.1 Create Custom Hooks
Create `/src/hooks/animations/index.ts`:

```tsx
export { useScrollTrigger } from './useScrollTrigger';
export { useParallax } from './useParallax';
export { useSplitText } from './useSplitText';
export { useMagneticButton } from './useMagneticButton';
export { useImageReveal } from './useImageReveal';
```

### 2.2 useParallax Hook
Create `/src/hooks/animations/useParallax.ts`:

```tsx
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
): RefObject<T> {
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
```

### 2.3 useSplitText Hook
Create `/src/hooks/animations/useSplitText.ts`:

```tsx
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
): RefObject<T> {
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
```

### 2.4 useMagneticButton Hook
Create `/src/hooks/animations/useMagneticButton.ts`:

```tsx
'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';

interface MagneticOptions {
  strength?: number;  // 0.1 to 1
  ease?: number;      // Animation smoothness
}

export function useMagneticButton<T extends HTMLElement>(
  options: MagneticOptions = {}
): RefObject<T> {
  const { strength = 0.3, ease = 0.1 } = options;
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let bounds: DOMRect;

    const handleMouseEnter = () => {
      bounds = element.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) return;

      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: ease,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, ease]);

  return elementRef;
}
```

### 2.5 Animation Utilities
Create `/src/lib/animations.ts`:

```tsx
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
```

---

## Phase 3: Reusable Animation Components

### 3.1 TextReveal Component
Create `/src/components/animations/TextReveal.tsx`:

```tsx
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
      ref={containerRef as any}
      className={cn('will-change-transform', className)}
      style={{ perspective: 1000 }}
    >
      {children}
    </Component>
  );
}
```

### 3.2 ParallaxImage Component
Create `/src/components/animations/ParallaxImage.tsx`:

```tsx
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
```

### 3.3 HorizontalScroll Component
Create `/src/components/animations/HorizontalScroll.tsx`:

```tsx
'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  speed?: number;  // Multiplier for scroll distance
}

export function HorizontalScroll({
  children,
  className,
  containerClassName,
  speed = 1,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const content = contentRef.current;

    if (!section || !trigger || !content) return;

    // Disable on mobile
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Calculate scroll distance
    const scrollWidth = content.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(content, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: `+=${scrollWidth * speed}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <section ref={sectionRef} className={cn('relative', className)}>
      <div ref={triggerRef} className="overflow-hidden">
        <div
          ref={contentRef}
          className={cn('flex', containerClassName)}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
```

### 3.4 MagneticButton Component
Create `/src/components/animations/MagneticButton.tsx`:

```tsx
'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let bounds: DOMRect;

    const handleMouseEnter = () => {
      bounds = button.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) return;

      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, disabled]);

  return (
    <div ref={buttonRef} className={cn('inline-block', className)}>
      {children}
    </div>
  );
}
```

### 3.5 ScrollProgress Component
Create `/src/components/animations/ScrollProgress.tsx`:

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';
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
```

### 3.6 Export all animation components
Create `/src/components/animations/index.ts`:

```tsx
export { TextReveal } from './TextReveal';
export { ParallaxImage } from './ParallaxImage';
export { HorizontalScroll } from './HorizontalScroll';
export { MagneticButton } from './MagneticButton';
export { ScrollProgress } from './ScrollProgress';
```

---

## Phase 4: Update Hero Component (Critical)

### 4.1 New Hero.tsx Implementation

Replace `/src/components/home/Hero.tsx` with this enhanced version:

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui';
import { TextReveal, ParallaxImage, MagneticButton } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const t = useTranslations();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const overlay = overlayRef.current;

    if (!hero || !content) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Content fade out and move up on scroll
      gsap.to(content, {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      });

      // Overlay darkness increases on scroll
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Scroll indicator fade out
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '20% top',
            scrub: true,
          },
        });
      }

      // Initial animations (on load, not scroll)
      const tl = gsap.timeline({ delay: 0.5 });

      // Scroll indicator entrance
      if (scrollIndicator) {
        tl.from(scrollIndicator, {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'expo.out',
        }, 1.5);
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  // Bounce animation for scroll indicator
  useEffect(() => {
    const scrollIndicator = scrollIndicatorRef.current;
    if (!scrollIndicator) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollIndicator.querySelector('.bounce-element'), {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end -mt-20 overflow-hidden"
      aria-label={t('hero.ariaLabel') || 'Hero section'}
    >
      {/* Background Image with Parallax */}
      <ParallaxImage 
        speed={0.3} 
        scale={1.15}
        className="absolute inset-0"
        imageClassName="w-full h-full"
      >
        <Image
          src="/hero-water-abstract.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: '50% 60%' }}
          priority
          quality={90}
          sizes="100vw"
        />
      </ParallaxImage>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/0 pointer-events-none" 
      />

      {/* Content Container */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full p-8 md:p-16 lg:p-24 pb-32"
      >
        <div className="max-w-4xl">
          {/* Section Label */}
          <div className="overflow-hidden mb-6">
            <TextReveal 
              type="words" 
              animation="fade-up" 
              stagger={0.05}
              duration={0.8}
              start="top 95%"
              className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-[var(--color-secondary)]"
            >
              // {t('hero.badge')}
            </TextReveal>
          </div>

          {/* Headline - Line by Line Reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 text-white">
            <TextReveal 
              type="lines" 
              animation="fade-up" 
              stagger={0.15}
              duration={1.2}
              delay={0.2}
              start="top 95%"
            >
              {t('hero.line1') || 'Tu salud renal'}
            </TextReveal>
            <TextReveal 
              type="lines" 
              animation="fade-up" 
              stagger={0.15}
              duration={1.2}
              delay={0.35}
              start="top 95%"
            >
              {t('hero.line2') || 'en las mejores'}
            </TextReveal>
            <TextReveal 
              type="lines" 
              animation="fade-up" 
              stagger={0.15}
              duration={1.2}
              delay={0.5}
              start="top 95%"
            >
              {t('hero.line3') || 'manos.'}
            </TextReveal>
          </h1>

          {/* Subtitle */}
          <TextReveal
            type="lines"
            animation="fade-up"
            duration={1}
            delay={0.7}
            start="top 95%"
            className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </TextReveal>

          {/* CTA Button with Magnetic Effect */}
          <div className="overflow-hidden">
            <TextReveal
              type="words"
              animation="fade-up"
              duration={0.8}
              delay={0.9}
              start="top 95%"
            >
              <MagneticButton strength={0.3}>
                <Link href="/servicios">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="bg-[var(--color-secondary)] text-gray-900 hover:bg-[var(--color-secondary-light)] border-none shadow-lg shadow-[var(--color-secondary)]/20"
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </MagneticButton>
            </TextReveal>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
          Scroll
        </span>
        <div className="bounce-element">
          <ChevronDown className="w-5 h-5 text-white/50" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
```

### 4.2 Hero Image Notes

**IMPORTANT:** Copy the generated water abstract image to `/public/hero-water-abstract.jpg`

The image should be positioned with `objectPosition: '50% 60%'` to:
- Keep the beautiful water ripples in view
- Leave darker areas in top-left for text
- Show golden bokeh on the right

---

## Phase 5: Update Other Components

### 5.1 ServicesPreview with Horizontal Scroll (Desktop)

Update the component to use HorizontalScroll on desktop while keeping vertical on mobile. The horizontal scroll should:
- Pin the section
- Scroll through all 8 service cards horizontally
- Each card scales slightly on enter
- Mobile: vertical grid as before

### 5.2 FeaturesShowcase Enhancements

- Add parallax to the background image (speed: 0.2)
- Glass cards should fade-up with stagger (0.15s)
- Counter numbers should animate when scrolled into view
- Add subtle particle drift synced to scroll

### 5.3 DoctorsPreview Enhancements

- Doctor photos should reveal with scale effect (0.9 → 1)
- Names animate with TextReveal (words, fade-up)
- Cards stagger in from bottom

### 5.4 Testimonials Enhancements

- Horizontal scroll through testimonials on desktop
- Quote marks scale in
- Text reveals line by line

### 5.5 CTASection Enhancements

- Section scales from 0.95 to 1 on scroll
- Button has magnetic effect
- Background parallax (subtle)

---

## Phase 6: Global Styles Update

Add to `/src/app/globals.css`:

```css
/* ===== SMOOTH SCROLL (LENIS) ===== */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* ===== GPU ACCELERATION ===== */
.will-animate {
  will-change: transform, opacity;
}

.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* ===== SPLIT TEXT STYLES ===== */
.split-line {
  display: block;
  overflow: hidden;
}

.split-word {
  display: inline-block;
}

.split-char {
  display: inline-block;
}

/* ===== HERO SPECIFIC ===== */
.hero-gradient-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

/* ===== HORIZONTAL SCROLL ===== */
@media (min-width: 1024px) {
  .horizontal-scroll-section {
    overflow: hidden;
  }
  
  .horizontal-scroll-content {
    display: flex;
    flex-wrap: nowrap;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .will-animate {
    will-change: auto;
  }
}

/* ===== SCROLL PROGRESS BAR ===== */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-secondary);
  transform-origin: left;
  z-index: 9999;
}

/* ===== MAGNETIC BUTTON ===== */
.magnetic-button {
  display: inline-block;
  transition: transform 0.1s ease-out;
}

/* ===== PARALLAX CONTAINER ===== */
.parallax-container {
  overflow: hidden;
  position: relative;
}

.parallax-element {
  will-change: transform;
}
```

---

## Phase 7: Performance & Mobile Optimization

### 7.1 Performance Checklist

- [ ] Use `will-change` only on animating elements
- [ ] Remove `will-change` after animation completes where possible
- [ ] Use `transform` and `opacity` only (GPU-accelerated)
- [ ] Lazy load images below the fold
- [ ] Throttle scroll listeners if needed
- [ ] Test on Chrome DevTools Performance tab (aim for 60fps)

### 7.2 Mobile Optimizations

For screens < 1024px:
- Disable horizontal scroll (use vertical grid)
- Reduce parallax intensity (speed: 0.1 instead of 0.3)
- Simplify text animations (fade only, no split)
- Disable magnetic buttons
- Reduce particle counts in transitions

### 7.3 Accessibility

- All animations respect `prefers-reduced-motion`
- Content is accessible without animations
- Focus states work correctly
- Screen reader testing completed

---

## File Structure After Implementation

```
src/
├── providers/
│   ├── SmoothScrollProvider.tsx
│   └── GSAPProvider.tsx
├── hooks/
│   └── animations/
│       ├── index.ts
│       ├── useParallax.ts
│       ├── useSplitText.ts
│       ├── useMagneticButton.ts
│       └── useScrollTrigger.ts
├── components/
│   ├── animations/
│   │   ├── index.ts
│   │   ├── TextReveal.tsx
│   │   ├── ParallaxImage.tsx
│   │   ├── HorizontalScroll.tsx
│   │   ├── MagneticButton.tsx
│   │   └── ScrollProgress.tsx
│   ├── home/
│   │   ├── Hero.tsx (updated)
│   │   ├── ServicesPreview.tsx (updated)
│   │   ├── FeaturesShowcase.tsx (updated)
│   │   └── ... (other components updated)
│   └── ...
├── lib/
│   ├── animations.ts
│   └── utils.ts
└── app/
    ├── globals.css (updated)
    └── [locale]/
        └── layout.tsx (updated)
```

---

## Success Criteria

- [ ] Smooth, buttery scrolling throughout the site (Lenis)
- [ ] Hero text reveals line by line with cinematic timing
- [ ] Hero background parallax with water image
- [ ] Parallax effects on hero and feature sections
- [ ] Horizontal scroll for services on desktop
- [ ] Magnetic effect on primary buttons
- [ ] Scroll progress indicator
- [ ] 60fps performance on desktop
- [ ] 30fps minimum on mobile
- [ ] Graceful degradation for reduced motion
- [ ] All existing functionality preserved
- [ ] i18n still works correctly (ES/EN)

---

## Implementation Order

1. **Phase 1** - Install dependencies, create providers
2. **Phase 2** - Create hooks and utilities
3. **Phase 3** - Create animation components
4. **Phase 4** - Update Hero (this is the showpiece!)
5. **Phase 5** - Update other home components
6. **Phase 6** - Global styles
7. **Phase 7** - Performance testing and optimization

---

## Notes for Claude Code

1. **Don't remove Framer Motion** - Keep it for menu animations and modals
2. **Test after each phase** - Make sure nothing breaks
3. **Mobile first** - Always check mobile after desktop implementation
4. **Preserve i18n** - All text must work with translations
5. **Keep brand colors** - Use CSS variables, don't hardcode colors

Start with Phase 1 and work sequentially. Ask for clarification if needed!
