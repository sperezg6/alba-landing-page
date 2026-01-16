'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
  className?: string;
  children: ReactNode;
  id?: string;
  background?: 'default' | 'surface' | 'primary' | 'gradient';
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const backgrounds = {
  default: 'bg-[var(--color-background)]',
  surface: 'bg-[var(--color-surface)]',
  primary: 'bg-[var(--color-primary)] text-white',
  gradient: 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white',
};

const containerWidths = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[1440px]',
  full: 'max-w-full',
};

const paddings = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      children,
      id,
      background = 'default',
      containerWidth = 'default',
      padding = 'md',
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(backgrounds[background], paddings[padding], className)}
      >
        <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', containerWidths[containerWidth])}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className,
  titleClassName,
}: SectionHeaderProps) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={cn('max-w-3xl mb-12 md:mb-16', alignments[align], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-[var(--color-secondary)]/20 text-[var(--color-secondary-dark)] rounded-full">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-[var(--color-muted)]">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default Section;
