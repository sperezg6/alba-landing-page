'use client';

import { Link } from '@/i18n/navigation';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'filled' | 'outline' | 'outline-dark';
  className?: string;
}

export function AnimatedButton({
  href,
  children,
  variant = 'filled',
  className = ''
}: AnimatedButtonProps) {
  const text = typeof children === 'string' ? children : String(children);

  // Determine colors based on variant
  const colorClasses = variant === 'outline-dark'
    ? 'text-white/80 hover:text-alba-primary'
    : 'text-gray-900 hover:text-alba-primary';

  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300',
        colorClasses,
        className
      )}
    >
      <span>{text.toUpperCase()}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export default AnimatedButton;
