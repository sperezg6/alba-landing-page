'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from '@/i18n/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { doctors } from '@/lib/data';
import { usePostHog } from 'posthog-js/react';
gsap.registerPlugin(ScrollTrigger);

// Doctor Card Component with grayscale-to-color hover effect
interface DoctorCardProps {
  name: string;
  role: string;
  image: string;
  slug: string;
  isFounder?: boolean;
  founderLabel: string;
  viewProfileLabel: string;
  onProfileClick?: (name: string, slug: string) => void;
}

const DoctorCard = ({ name, role, image, slug, isFounder, founderLabel, viewProfileLabel, onProfileClick }: DoctorCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleDoubleClick = () => {
    onProfileClick?.(name, slug);
    router.push(`/directorio/${slug}`);
  };

  return (
    <div
      className="team-card group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
      title={viewProfileLabel}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Founder badge */}
        {isFounder && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] uppercase tracking-widest text-gray-900/90 bg-black/10 backdrop-blur-sm px-2 py-1 rounded-md">
              {founderLabel}
            </span>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="space-y-1">
        <h3
          className={`text-sm md:text-base font-medium leading-tight transition-colors duration-300 ${isHovered ? 'text-alba-primary' : 'text-alba-text'}`}
        >
          {name}
        </h3>
        <p className="text-gray-900/50 text-xs md:text-sm">
          {role}
        </p>
      </div>
    </div>
  );
};

export function DoctorShowcase() {
  const t = useTranslations('team');
  const tCard = useTranslations('doctorCard');
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const illustrationsRef = useRef<HTMLDivElement>(null);
  const posthog = usePostHog();

  const [waterPos, setWaterPos] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastRippleTime = useRef(0);
  const rippleIdRef = useRef(0);

  const handleWaterMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setWaterPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    const now = Date.now();
    if (now - lastRippleTime.current > 400) {
      lastRippleTime.current = now;
      const id = rippleIdRef.current++;
      setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1400);
    }
  }, []);

  const handleDoctorProfileClick = (doctorName: string, doctorSlug: string) => {
    posthog?.capture('doctor_profile_clicked', {
      doctor_name: doctorName,
      doctor_slug: doctorSlug,
    });
  };

  useEffect(() => {
    // Refresh ScrollTrigger after layout settles so downstream triggers fire correctly
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate headline
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate doctor cards - staggered entrance
      if (illustrationsRef.current) {
        const cards = illustrationsRef.current.querySelectorAll('.team-card');

        // Staggered fade-in animation
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: illustrationsRef.current,
              start: 'top 90%',
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
      className="relative overflow-hidden bg-alba-dark"
      onMouseMove={handleWaterMouseMove}
    >
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.22] blur-3xl"
          style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
        />
      </div>

      {/* Water glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 500px at ${waterPos.x}% ${waterPos.y}%, rgba(245,159,32,0.06) 0%, transparent 70%)`,
        }}
      />
      {/* Ripple rings */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="water-ripple absolute pointer-events-none z-10 rounded-full border border-alba-primary/20"
          style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      {/* Content container */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 md:pt-40 lg:pt-48">
        {/* Two column layout for headline and description */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-24">
          {/* Headline - Left side */}
          <div ref={headlineRef} className="lg:max-w-3xl">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-alba-text"
            >
              {t('headline')}
            </h2>
          </div>

          {/* Description - Right side */}
          <div ref={descriptionRef} className="lg:max-w-md lg:pt-4">
            <p className="text-base md:text-lg text-gray-900/70 leading-relaxed">
              {t('description')}
            </p>
            <div className="mt-8">
              <AnimatedButton href="/directorio" variant="outline">
                {t('cta')}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div
        ref={illustrationsRef}
        className="px-6 md:px-16 lg:px-24 pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28 lg:pb-32"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              role={doctor.role}
              image={doctor.image}
              slug={doctor.slug}
              isFounder={doctor.isFounder}
              founderLabel={tCard('founder')}
              viewProfileLabel={tCard('viewProfile')}
              onProfileClick={handleDoctorProfileClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorShowcase;
