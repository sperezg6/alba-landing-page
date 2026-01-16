'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const cardVariants = {
  default: 'bg-[var(--color-surface)]',
  glass: 'glass',
  elevated: 'bg-[var(--color-surface)] shadow-lg',
  bordered: 'bg-[var(--color-surface)] border border-[var(--color-border)]',
};

const paddingSizes = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, padding = 'md', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden',
          cardVariants[variant],
          paddingSizes[padding],
          hover && 'transition-all duration-300',
          className
        )}
        whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(26, 77, 92, 0.15)' } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export const CardHeader = ({ className, children }: CardHeaderProps) => (
  <div className={cn('mb-4', className)}>{children}</div>
);

interface CardTitleProps {
  className?: string;
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}

export const CardTitle = ({ className, children, as: Component = 'h3' }: CardTitleProps) => (
  <Component className={cn('text-xl font-bold text-[var(--color-text)]', className)}>
    {children}
  </Component>
);

interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

export const CardDescription = ({ className, children }: CardDescriptionProps) => (
  <p className={cn('text-[var(--color-muted)] mt-2', className)}>{children}</p>
);

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export const CardContent = ({ className, children }: CardContentProps) => (
  <div className={cn('', className)}>{children}</div>
);

interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

export const CardFooter = ({ className, children }: CardFooterProps) => (
  <div className={cn('mt-4 pt-4 border-t border-[var(--color-border)]', className)}>{children}</div>
);

export default Card;
