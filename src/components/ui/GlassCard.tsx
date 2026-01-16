'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export type GlassVariant = 'light' | 'dark' | 'teal' | 'lime';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: GlassVariant;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  children: ReactNode;
}

const glassVariants = {
  light: 'bg-white/10 border-white/20 text-white',
  dark: 'bg-black/20 border-black/10 text-gray-900',
  teal: 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20 text-white',
  lime: 'bg-lime-400/10 border-lime-400/20 text-white',
};

const blurLevels = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'light',
      blur = 'md',
      hover = true,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl lg:rounded-3xl overflow-hidden border shadow-xl',
          glassVariants[variant],
          blurLevels[blur],
          hover && 'transition-all duration-300',
          glow && 'shadow-[0_0_30px_rgba(212,255,0,0.15)]',
          className
        )}
        whileHover={
          hover
            ? {
                y: -4,
                boxShadow: glow
                  ? '0 20px 40px rgba(212, 255, 0, 0.2)'
                  : '0 20px 40px rgba(0, 0, 0, 0.25)',
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

// Glass Badge component for labels/tags
interface GlassBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'lime' | 'teal';
  className?: string;
}

export const GlassBadge = ({ children, variant = 'default', className }: GlassBadgeProps) => {
  const badgeVariants = {
    default: 'bg-white/20 text-white border-white/30',
    lime: 'bg-lime-400/20 text-lime-300 border-lime-400/30',
    teal: 'bg-teal-400/20 text-teal-300 border-teal-400/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border backdrop-blur-sm',
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// Glass Metric component for displaying stats
interface GlassMetricProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  accent?: boolean;
  className?: string;
}

export const GlassMetric = ({ value, label, icon, accent = false, className }: GlassMetricProps) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-2">
        {icon && <span className={accent ? 'text-lime-400' : 'text-white/60'}>{icon}</span>}
        <span
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold tabular-nums tracking-tight',
            accent ? 'text-lime-400' : 'text-white'
          )}
        >
          {value}
        </span>
      </div>
      <span className="text-xs md:text-sm font-mono uppercase tracking-wider text-white/60 mt-1">
        {label}
      </span>
    </div>
  );
};

// Glass Status Indicator
interface GlassStatusProps {
  status: 'online' | 'active' | 'available';
  label?: string;
  className?: string;
}

export const GlassStatus = ({ status, label, className }: GlassStatusProps) => {
  const statusColors = {
    online: 'bg-lime-400',
    active: 'bg-teal-400',
    available: 'bg-green-400',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            statusColors[status]
          )}
        />
        <span
          className={cn('relative inline-flex rounded-full h-2.5 w-2.5', statusColors[status])}
        />
      </span>
      {label && <span className="text-xs font-mono uppercase tracking-wider text-white/80">{label}</span>}
    </div>
  );
};

// Glass Progress Bar
interface GlassProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  accentColor?: 'lime' | 'teal' | 'white';
  className?: string;
}

export const GlassProgress = ({
  value,
  max = 100,
  showLabel = true,
  accentColor = 'lime',
  className,
}: GlassProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const accentColors = {
    lime: 'bg-lime-400',
    teal: 'bg-teal-400',
    white: 'bg-white',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-white/60">Progreso</span>
          <span className="text-sm font-mono text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', accentColors[accentColor])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default GlassCard;
