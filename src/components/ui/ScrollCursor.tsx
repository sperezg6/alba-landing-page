'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollCursorProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

// SVG circle constants
const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollCursor({ containerRef }: ScrollCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Use GSAP ScrollTrigger scoped to the hero container
  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef.current;
    if (!circle || !container) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef, {
        current: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
          onUpdate: (self) => {
            const offset = CIRCUMFERENCE * (1 - self.progress);
            circle.style.strokeDashoffset = String(offset);
          },
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-50 hidden md:flex items-center justify-center"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Circle with scroll progress */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* SVG progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 112 112"
        >
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r={RADIUS}
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
          {/* Progress circle - alba primary orange */}
          <circle
            ref={circleRef}
            cx="56"
            cy="56"
            r={RADIUS}
            fill="none"
            stroke="#F59F20"
            strokeWidth="1.5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
          />
        </svg>

        {/* SCROLL text */}
        <span className="text-white/80 text-[10px] uppercase tracking-[0.25em] font-medium">
          Scroll
        </span>
      </div>
    </motion.div>
  );
}

export default ScrollCursor;
