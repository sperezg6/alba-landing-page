'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsEditorial() {
  const locale = useLocale();
  const t = useTranslations('testimonials');
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1;
    handleChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
  };

  const current = testimonials[active];
  const quote = locale === 'es' ? current.content : current.contentEn;
  const role = locale === 'es' ? current.role : current.roleEn;

  // Scroll-triggered entrance animation
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Divider line animation - grows from center
      if (dividerRef.current) {
        const line = dividerRef.current.querySelector('.divider-line');
        const ticks = dividerRef.current.querySelectorAll('.divider-tick');

        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          ticks,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-alba-dark py-24 md:py-32 lg:py-40"
    >
      {/* Divider line with ticks */}
      <div ref={dividerRef} className="absolute top-0 left-0 right-0 px-6 md:px-16 lg:px-24">
        <div className="relative w-full h-px">
          {/* Animated line */}
          <div className="divider-line absolute inset-0 bg-white/20 origin-center" />
          {/* Left tick */}
          <div className="divider-tick absolute left-0 top-0 w-px h-4 bg-white/20 origin-top -translate-y-1/2" />
          {/* Center tick */}
          <div className="divider-tick absolute left-1/2 top-0 w-px h-4 bg-white/20 origin-top -translate-x-1/2 -translate-y-1/2" />
          {/* Right tick */}
          <div className="divider-tick absolute right-0 top-0 w-px h-4 bg-white/20 origin-top -translate-y-1/2" />
        </div>
      </div>

      {/* Section Title */}
      <div
        ref={titleRef}
        className="w-full max-w-4xl mx-auto px-6 md:px-12 mb-16 md:mb-20"
      >
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
          style={{ color: 'white' }}
        >
          {t('title')}
        </h2>
        <p className="mt-4 text-[#F4F3E8]/50 text-base md:text-lg">
          {t('subtitle')}
        </p>
      </div>

      <div
        ref={contentRef}
        className="w-full max-w-4xl mx-auto px-6 md:px-12"
      >
        {/* Large index number */}
        <div className="flex items-start gap-6 md:gap-10">
          <span
            className="text-[80px] md:text-[120px] lg:text-[150px] font-light leading-none text-white/10 select-none transition-all duration-500"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(active + 1).padStart(2, '0')}
          </span>

          <div className="flex-1 pt-4 md:pt-8">
            {/* Quote - fixed min height to prevent layout shifts */}
            <blockquote
              className={`text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight transition-all duration-300 min-h-[180px] md:min-h-[200px] lg:min-h-[220px] ${
                isTransitioning
                  ? 'opacity-0 translate-x-4'
                  : 'opacity-100 translate-x-0'
              }`}
              style={{ color: 'white' }}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Author info */}
            <div
              className={`mt-8 md:mt-10 transition-all duration-300 delay-100 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className="font-medium text-white">{current.name}</p>
              <p className="text-sm text-[#F4F3E8]/50">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 md:mt-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleChange(index)}
                  className="group relative py-4"
                >
                  <span
                    className={`block h-px transition-all duration-500 ease-out ${
                      index === active
                        ? 'w-12 bg-alba-primary'
                        : 'w-6 bg-white/20 group-hover:w-8 group-hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs text-[#F4F3E8]/40 tracking-widest uppercase">
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
