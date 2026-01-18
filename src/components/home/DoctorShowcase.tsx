'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from '@/i18n/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { doctors } from '@/lib/data';

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
}

const DoctorCard = ({ name, role, image, slug, isFounder, founderLabel, viewProfileLabel }: DoctorCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleDoubleClick = () => {
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
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Founder badge */}
        {isFounder && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-sm">
              {founderLabel}
            </span>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="space-y-1">
        <h3
          className="text-sm md:text-base font-medium leading-tight transition-colors duration-300"
          style={{ color: isHovered ? 'var(--color-primary)' : 'white' }}
        >
          {name}
        </h3>
        <p className="text-[#F4F3E8]/50 text-xs md:text-sm">
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
      className="relative bg-alba-dark overflow-hidden"
    >
      {/* Content container */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 md:pt-40 lg:pt-48">
        {/* Two column layout for headline and description */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-24">
          {/* Headline - Left side */}
          <div ref={headlineRef} className="lg:max-w-3xl">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1]"
              style={{ color: 'white' }}
            >
              {t('headline')}
            </h2>
          </div>

          {/* Description - Right side */}
          <div ref={descriptionRef} className="lg:max-w-md lg:pt-4">
            <p className="text-base md:text-lg text-[#F4F3E8]/70 leading-relaxed">
              {t('description')}
            </p>
            <div className="mt-8">
              <AnimatedButton href="/directorio" variant="outline-dark">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorShowcase;
