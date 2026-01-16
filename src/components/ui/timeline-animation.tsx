"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  as?: "div" | "span" | "figure" | "a" | "button" | "p" | "h1" | "h2" | "h3";
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function TimelineContent({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  href,
  target,
  rel,
  onClick,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, animationNum * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, animationNum]);

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const variants = customVariants || defaultVariants;

  const content = () => {
    switch (as) {
      case "a":
        return (
          <a href={href} target={target} rel={rel} className="contents">
            {children}
          </a>
        );
      case "button":
        return (
          <button onClick={onClick} className="contents">
            {children}
          </button>
        );
      case "figure":
        return <figure className="contents">{children}</figure>;
      case "span":
        return <span className="contents">{children}</span>;
      case "p":
        return <p className="contents">{children}</p>;
      case "h1":
        return <h1 className="contents">{children}</h1>;
      case "h2":
        return <h2 className="contents">{children}</h2>;
      case "h3":
        return <h3 className="contents">{children}</h3>;
      default:
        return children;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      custom={animationNum}
      variants={variants}
      className={cn(className)}
    >
      {content()}
    </motion.div>
  );
}
