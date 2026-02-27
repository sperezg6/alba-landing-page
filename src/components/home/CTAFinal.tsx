'use client';

import { useRef, useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { branches } from '@/lib/data';

// Dynamically import map to avoid SSR issues
const LocationMap = dynamic(() => import('@/components/ui/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-alba-dark animate-pulse" />
  ),
});

gsap.registerPlugin(ScrollTrigger);

export function CTAFinal() {
  const t = useTranslations('cta');
  const tBranches = useTranslations('branches');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Divider line animation
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
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Branch cards stagger animation
      const cards = sectionRef.current?.querySelectorAll('.branch-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-alba-dark min-h-screen pb-24 lg:pb-32"
    >
      {/* Divider line with ticks */}
      <div ref={dividerRef} className="absolute top-0 left-0 right-0 z-10 px-6 md:px-16 lg:px-24">
        <div className="relative w-full h-px">
          <div className="divider-line absolute inset-0 bg-black/20 origin-center" />
          <div className="divider-tick absolute left-0 top-0 w-px h-4 bg-black/20 origin-top -translate-y-1/2" />
          <div className="divider-tick absolute left-1/2 top-0 w-px h-4 bg-black/20 origin-top -translate-x-1/2 -translate-y-1/2" />
          <div className="divider-tick absolute right-0 top-0 w-px h-4 bg-black/20 origin-top -translate-y-1/2" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Content */}
        <div
          ref={contentRef}
          className="flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-0"
        >
          {/* Small label */}
          <span className="text-alba-primary text-xs uppercase tracking-[0.2em] font-medium mb-6">
            {t('label')}
          </span>

          {/* Main headline */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] max-w-xl"
            style={{ color: '#374151' }}
          >
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-gray-900/60 text-base md:text-lg max-w-md leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-6 py-3 bg-alba-primary text-black text-sm font-semibold uppercase tracking-wider rounded hover:bg-alba-primary-dark transition-all duration-300 group"
            >
              {t('button')}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Branch locations list */}
          <div className="mt-16 space-y-3">
            <span className="text-gray-900/40 text-xs uppercase tracking-[0.15em]">
              {tBranches('title')}
            </span>

            <div className="grid gap-2 mt-4">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  className={`branch-card group flex items-center justify-between p-4 rounded-lg border transition-all duration-300 text-left ${
                    activeBranch === branch.id
                      ? 'border-alba-primary/50 bg-alba-primary/5'
                      : 'border-black/10 hover:border-black/20 bg-black/[0.02]'
                  }`}
                  onMouseEnter={() => setActiveBranch(branch.id)}
                  onMouseLeave={() => setActiveBranch(null)}
                >
                  <div className="flex items-center gap-3">
                    <MapPin
                      className={`w-4 h-4 transition-colors ${
                        activeBranch === branch.id ? 'text-alba-primary' : 'text-gray-900/40'
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium transition-colors ${
                          activeBranch === branch.id ? 'text-gray-900' : 'text-gray-900/80'
                        }`}
                      >
                        {tBranches(`${branch.id}.name`)}
                      </p>
                      <p className="text-xs text-gray-900/40 mt-0.5 hidden sm:block">
                        {tBranches(`${branch.id}.address`)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${branch.phone.replace(/-/g, '')}`}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      activeBranch === branch.id
                        ? 'text-alba-primary'
                        : 'text-gray-900/40 group-hover:text-gray-900/60'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-3 h-3" />
                    <span className="hidden md:inline">{branch.phone}</span>
                  </a>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Map */}
        <div className="relative h-[400px] lg:h-auto lg:min-h-screen">
          <LocationMap
            activeBranch={activeBranch}
            onMarkerClick={(id) => setActiveBranch(id)}
          />

          {/* Map overlay gradient for blend */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-alba-dark to-transparent pointer-events-none hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

export default CTAFinal;
