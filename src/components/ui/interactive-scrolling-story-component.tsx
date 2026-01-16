'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface SlideData {
  title: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
}

interface ScrollingFeatureShowcaseProps {
  slides?: SlideData[];
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

// --- Default data for slides ---
const defaultSlidesData: SlideData[] = [
  {
    title: 'Generate Code with AI',
    description:
      'Describe your logic in plain English and watch as the AI generates clean, efficient code in seconds. From Python scripts to complex algorithms.',
    image:
      'https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070&auto=format&fit=crop',
    bgColor: '#fff100',
    textColor: '#000000',
  },
  {
    title: 'Debug and Refactor Smarter',
    description:
      'Paste your buggy code and let the AI identify errors, suggest improvements, and refactor for better readability and performance.',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
    bgColor: '#fff100',
    textColor: '#000000',
  },
  {
    title: 'Learn New Languages, Instantly',
    description:
      'Translate code snippets between languages. Understand syntax and paradigms of a new language by seeing familiar code transformed.',
    image:
      'https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop',
    bgColor: '#fff100',
    textColor: '#000000',
  },
  {
    title: 'Automate Your Workflow',
    description:
      'From writing documentation to generating unit tests, let AI handle the repetitive tasks so you can focus on building great things.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    bgColor: '#fff100',
    textColor: '#000000',
  },
];

export function ScrollingFeatureShowcase({
  slides = defaultSlidesData,
  buttonText = 'Get Started',
  buttonHref = '#get-started',
  className = '',
}: ScrollingFeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Scroll Handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / slides.length;
      const newActiveIndex = Math.min(
        slides.length - 1,
        Math.floor(container.scrollTop / stepHeight)
      );
      setActiveIndex(newActiveIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [slides.length]);

  const handlePaginationClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / slides.length;
      container.scrollTo({
        top: stepHeight * index,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  // Dynamic styles for the background and text color transitions
  const dynamicStyles: CSSProperties = {
    backgroundColor: slides[activeIndex]?.bgColor || '#ffffff',
    color: slides[activeIndex]?.textColor || '#000000',
    transition: prefersReducedMotion
      ? 'none'
      : 'background-color 0.7s ease, color 0.7s ease',
  };

  // Styles for the grid pattern on the right side
  const gridPatternStyle: CSSProperties = {
    backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)
    `,
    backgroundSize: '3.5rem 3.5rem',
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`h-screen w-full overflow-y-auto ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as CSSProperties}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div style={{ height: `${slides.length * 100}vh` }}>
        <div
          ref={stickyPanelRef}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
          style={dynamicStyles}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
            {/* Left Column: Text Content, Pagination & Button */}
            <div className="relative flex flex-col justify-center p-8 md:p-16 border-r border-black/10">
              {/* Pagination Bars */}
              <div className="absolute top-8 md:top-16 left-8 md:left-16 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaginationClick(index)}
                    className={`h-1 rounded-full transition-all ${
                      prefersReducedMotion ? '' : 'duration-500 ease-in-out'
                    } ${
                      index === activeIndex
                        ? 'w-12 bg-black/80'
                        : 'w-6 bg-black/20'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>

              <div className="relative h-64 w-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all ${
                      prefersReducedMotion ? '' : 'duration-700 ease-in-out'
                    } ${
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                    aria-hidden={index !== activeIndex}
                  >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
                      {slide.title}
                    </h2>
                    <p className="mt-6 text-lg md:text-xl max-w-md">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Get Started Button */}
              <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16">
                <a
                  href={buttonHref}
                  className="px-8 md:px-10 py-3 md:py-4 bg-black text-white font-semibold rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors inline-block"
                >
                  {buttonText}
                </a>
              </div>
            </div>

            {/* Right Column: Image Content with Grid Background */}
            <div
              className="hidden md:flex items-center justify-center p-8"
              style={gridPatternStyle}
            >
              <div className="relative w-[50%] h-[80vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-black/5">
                <div
                  className={`absolute top-0 left-0 w-full h-full ${
                    prefersReducedMotion ? '' : 'transition-transform duration-700 ease-in-out'
                  }`}
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollingFeatureShowcase;
