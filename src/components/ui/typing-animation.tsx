"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  startOnView?: boolean;
  /** Delay in milliseconds before starting the animation */
  delay?: number;
}

export function TypingAnimation({
  text,
  duration = 30,
  className,
  as: Component = "p",
  startOnView = true,
  delay = 0,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(!startOnView);
  const [delayComplete, setDelayComplete] = useState<boolean>(delay === 0);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer to start animation when in view
  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  // Handle delay before starting animation
  useEffect(() => {
    if (!hasStarted || delayComplete) return;

    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasStarted, delay, delayComplete]);

  // Typing effect
  useEffect(() => {
    if (!hasStarted || !delayComplete) return;

    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text, hasStarted, delayComplete]);

  return (
    <div ref={ref} className="relative">
      {/* Invisible text to reserve space */}
      <Component
        className={cn(
          "font-display leading-relaxed tracking-[-0.01em] invisible",
          className
        )}
        aria-hidden="true"
      >
        {text}
      </Component>
      {/* Visible typed text positioned on top */}
      <Component
        className={cn(
          "font-display leading-relaxed tracking-[-0.01em] absolute inset-0",
          className
        )}
      >
        {hasStarted && delayComplete ? (displayedText || "") : ""}
        {hasStarted && delayComplete && i < text.length && (
          <span className="inline-block w-[2px] h-[0.9em] bg-current ml-0.5 animate-blink align-middle opacity-70" />
        )}
      </Component>
    </div>
  );
}
