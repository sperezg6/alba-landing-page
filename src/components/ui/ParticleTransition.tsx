'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  offsetY: number;
}

interface ParticleTransitionProps {
  className?: string;
  particleCount?: number;
  color?: 'teal' | 'secondary' | 'primary';
  height?: string;
}

// Smooth cinematic easing
const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ParticleTransition({
  className = '',
  particleCount = 18,
  color = 'secondary',
  height = 'h-40',
}: ParticleTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Generate particles with varied properties
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: (i / particleCount) * 100 + (Math.random() - 0.5) * 10, // Distributed with slight randomness
      size: 4 + Math.random() * 10, // 4px to 14px
      delay: Math.random() * 1.5, // Stagger delay
      duration: 2.5 + Math.random() * 2, // Animation duration between 2.5-4.5s
      opacity: 0.3 + Math.random() * 0.5, // Opacity between 0.3 and 0.8
      offsetY: Math.random() * 60 - 30, // Initial Y position variation
    }));
  }, [particleCount]);

  // Color classes based on prop
  const colorClasses = {
    teal: 'bg-teal-400',
    secondary: 'bg-[var(--color-secondary)]',
    primary: 'bg-[var(--color-primary)]',
  };

  const glowColors = {
    teal: 'rgba(45, 212, 191, 0.4)',
    secondary: 'rgba(232, 184, 109, 0.4)',
    primary: 'rgba(26, 77, 92, 0.4)',
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${height} overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-background)] to-transparent opacity-50" />

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${colorClasses[color]}`}
          style={{
            left: `${particle.x}%`,
            top: '50%',
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${particle.size * 2}px ${glowColors[color]}`,
          }}
          initial={{
            y: particle.offsetY,
            opacity: 0,
            scale: 0,
          }}
          animate={
            isInView
              ? {
                  y: [particle.offsetY, particle.offsetY - 25, particle.offsetY + 25, particle.offsetY],
                  opacity: [0, particle.opacity, particle.opacity * 0.6, particle.opacity, 0.3],
                  scale: [0, 1, 1.1, 0.9, 1],
                  x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, 0],
                }
              : {
                  y: particle.offsetY,
                  opacity: 0,
                  scale: 0,
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: cinematicEase,
          }}
        />
      ))}

      {/* Decorative lines */}
      <motion.div
        className="absolute left-1/4 top-1/2 w-px h-12 -translate-y-1/2"
        style={{
          background: `linear-gradient(to bottom, transparent, ${glowColors[color]}, transparent)`,
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 0.5, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: cinematicEase }}
      />
      <motion.div
        className="absolute right-1/4 top-1/2 w-px h-12 -translate-y-1/2"
        style={{
          background: `linear-gradient(to bottom, transparent, ${glowColors[color]}, transparent)`,
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 0.5, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: cinematicEase }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-16"
        style={{
          background: `linear-gradient(to bottom, transparent, ${glowColors[color]}, transparent)`,
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 0.7, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: cinematicEase }}
      />
    </div>
  );
}

// New smooth gradient morph transition for hero-to-services
interface GradientMorphTransitionProps {
  className?: string;
  particleCount?: number;
}

export function GradientMorphTransition({
  className,
  particleCount = 12,
}: GradientMorphTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Generate floating particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: (i / particleCount) * 100 + (Math.random() - 0.5) * 15,
      size: 3 + Math.random() * 8,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
      offsetY: Math.random() * 100,
    }));
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-80 -mt-32 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Main gradient background - smooth transition from dark hero to light surface */}
      {/* Starting with black to match hero's from-black/90 gradient bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.85) 8%,
            rgba(0, 0, 0, 0.7) 15%,
            rgba(15, 23, 42, 0.6) 25%,
            rgba(30, 41, 59, 0.4) 35%,
            rgba(100, 116, 139, 0.25) 50%,
            rgba(203, 213, 225, 0.15) 65%,
            rgba(250, 250, 248, 0.5) 78%,
            rgba(250, 250, 248, 0.85) 88%,
            #FAFAF8 100%
          )`
        }}
      />

      {/* Subtle warm gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(
            135deg,
            transparent 0%,
            rgba(232, 184, 109, 0.15) 50%,
            transparent 100%
          )`
        }}
      />

      {/* Floating particles with amber glow */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${40 + p.offsetY * 0.4}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(232, 184, 109, 0.6)',
            boxShadow: `0 0 ${p.size * 3}px rgba(232, 184, 109, 0.4)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? {
                  y: [-10, 15, -10],
                  opacity: [0.1, p.opacity, 0.1],
                  scale: [0.8, 1, 0.8],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Decorative subtle dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(26, 77, 92, 1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Curved SVG overlay for organic transition feel */}
      <svg
        className="absolute bottom-0 w-full h-28"
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#FAFAF8" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C360,80 720,0 1080,60 C1260,90 1360,30 1440,50 L1440,100 L0,100 Z"
          fill="#FAFAF8"
        />
        <path
          d="M0,60 C240,20 480,80 720,40 C960,0 1200,60 1440,30 L1440,100 L0,100 Z"
          fill="url(#curveGradient)"
          opacity="0.5"
        />
      </svg>

      {/* Subtle animated lines */}
      <motion.div
        className="absolute left-1/3 top-1/2 w-px h-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(232, 184, 109, 0.3), transparent)',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 0.6, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: cinematicEase }}
      />
      <motion.div
        className="absolute right-1/3 top-1/2 w-px h-16"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(232, 184, 109, 0.2), transparent)',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 0.5, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: cinematicEase }}
      />
    </div>
  );
}

// Alternative: Dot Grid Wave Pattern
export function DotGridTransition({
  className = '',
  rows = 3,
  columns = 20,
  color = 'secondary',
}: {
  className?: string;
  rows?: number;
  columns?: number;
  color?: 'teal' | 'secondary' | 'primary';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  const colorClasses = {
    teal: 'bg-teal-400',
    secondary: 'bg-[var(--color-secondary)]',
    primary: 'bg-[var(--color-primary)]',
  };

  const dots = useMemo(() => {
    return Array.from({ length: rows * columns }, (_, i) => ({
      id: i,
      row: Math.floor(i / columns),
      col: i % columns,
    }));
  }, [rows, columns]);

  return (
    <div
      ref={containerRef}
      className={`relative py-16 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex flex-col items-center justify-center gap-4"
        style={{ perspective: 1000 }}
      >
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center gap-4">
            {Array.from({ length: columns }, (_, colIndex) => {
              const dotIndex = rowIndex * columns + colIndex;
              const delay = (colIndex * 0.05) + (rowIndex * 0.1);
              const waveDelay = Math.sin((colIndex / columns) * Math.PI) * 0.3;

              return (
                <motion.div
                  key={colIndex}
                  className={`w-2 h-2 rounded-full ${colorClasses[color]}`}
                  initial={{ opacity: 0.2, scale: 0.5, y: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.5, 1.2, 0.5],
                          y: [0, -10 - (Math.sin((colIndex / columns) * Math.PI * 2) * 5), 0],
                        }
                      : { opacity: 0.2, scale: 0.5, y: 0 }
                  }
                  transition={{
                    duration: 2,
                    delay: delay + waveDelay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticleTransition;
