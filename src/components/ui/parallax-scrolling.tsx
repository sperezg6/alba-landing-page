'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayer {
  layer: string;
  yPercent: number;
}

interface ParallaxScrollingProps {
  children?: React.ReactNode;
  layers?: ParallaxLayer[];
  className?: string;
}

export function ParallaxScrolling({
  children,
  layers = [
    { layer: '1', yPercent: 70 },
    { layer: '2', yPercent: 55 },
    { layer: '3', yPercent: 40 },
    { layer: '4', yPercent: 10 },
  ],
  className = '',
}: ParallaxScrollingProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (!triggerElement) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<'
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, [layers]);

  return (
    <div className={`parallax ${className}`} ref={parallaxRef}>
      {children}
    </div>
  );
}

// Exported sub-components for flexibility
export function ParallaxLayers({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-parallax-layers className={`parallax__layers ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxLayer({
  layer,
  children,
  className = '',
}: {
  layer: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-parallax-layer={layer} className={className}>
      {children}
    </div>
  );
}

export function ParallaxImage({
  layer,
  src,
  alt = '',
  className = '',
  width,
}: {
  layer: string;
  src: string;
  alt?: string;
  className?: string;
  width?: number;
}) {
  return (
    <img
      src={src}
      loading="eager"
      width={width}
      data-parallax-layer={layer}
      alt={alt}
      className={`parallax__layer-img ${className}`}
    />
  );
}

export default ParallaxScrolling;
