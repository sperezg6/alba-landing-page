'use client';

import { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  children: string;
  className?: string;
  charClassName?: string;
  wordClassName?: string;
}

/**
 * SplitText component that splits text into individual characters
 * wrapped in spans for GSAP animations (especially scrub animations)
 *
 * Usage:
 * <SplitText>Your text here</SplitText>
 *
 * Then target .char elements with GSAP:
 * gsap.to('.char', { opacity: 1, stagger: 0.02 });
 */
export function SplitText({
  children,
  className,
  charClassName,
  wordClassName,
}: SplitTextProps) {
  const words = useMemo(() => {
    return children.split(' ').map((word, wordIndex) => ({
      word,
      chars: word.split('').map((char, charIndex) => ({
        char,
        key: `${wordIndex}-${charIndex}`,
      })),
      key: `word-${wordIndex}`,
    }));
  }, [children]);

  return (
    <span className={cn('inline', className)}>
      {words.map((wordObj, wordIndex) => (
        <span key={wordObj.key} className={cn('inline-block', wordClassName)}>
          {wordObj.chars.map((charObj) => (
            <span
              key={charObj.key}
              className={cn(
                'char inline-block',
                charClassName
              )}
            >
              {charObj.char}
            </span>
          ))}
          {/* Add space after each word except the last */}
          {wordIndex < words.length - 1 && (
            <span className="char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}

export default SplitText;
