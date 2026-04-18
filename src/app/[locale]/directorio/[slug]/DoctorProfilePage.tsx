'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Dynamic import GSAP to reduce initial bundle size
const loadGSAP = async () => {
  const gsap = (await import('gsap')).default;
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
};
import {
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  Globe,
  Calendar,
  ChevronRight,
  Award,
  GraduationCap,
  BadgeCheck,
  Building2,
  Users,
  Newspaper,
  ExternalLink,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { branches, type Doctor } from '@/lib/data';
import { CalComBooking } from '@/components/scheduling';
import type { CalComConfig } from '@/lib/scheduling/types';

// Social media icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DoctoraliaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

interface DoctorProfilePageProps {
  doctor: Doctor;
  calConfig: CalComConfig;
}

export function DoctorProfilePage({ doctor, calConfig }: DoctorProfilePageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isEn = locale === 'en';

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null;

    const initAnimations = async () => {
      const { gsap } = await loadGSAP();

      // Wait for next frame to ensure DOM is fully rendered
      await new Promise(resolve => requestAnimationFrame(resolve));

      ctx = gsap.context(() => {
        // Hero animations
        if (heroRef.current) {
          gsap.fromTo(heroRef.current.querySelectorAll('.animate-in'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }

        // Content section animations with ScrollTrigger
        if (contentRef.current) {
          // Animate large background numbers
          const numbers = contentRef.current.querySelectorAll('.section-number');
          numbers.forEach((num) => {
            gsap.fromTo(num,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 0.05,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: num.parentElement,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          // Animate content sections
          const sections = contentRef.current.querySelectorAll('.content-section');
          sections.forEach((section) => {
            gsap.fromTo(section.querySelectorAll('.animate-content'),
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          // Animate timeline items
          const timelineItems = contentRef.current.querySelectorAll('.timeline-item');
          timelineItems.forEach((item, index) => {
            gsap.fromTo(item,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: index * 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });
        }
      });
    };

    initAnimations();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const doctorBranches = doctor.branches
    .map((branchId) => branches.find((b) => b.id === branchId))
    .filter(Boolean);

  const hasHeroImage = !!doctor.heroImage;
  const hasQuote = !!doctor.quote;
  const hasExtendedBio = !!doctor.extendedBio;
  const hasPhilosophy = !!doctor.philosophy;
  const hasCareerHighlights = doctor.careerHighlights && doctor.careerHighlights.length > 0;
  const hasExternalPractices = doctor.externalPractices && doctor.externalPractices.length > 0;
  const hasCertifications = doctor.certifications && doctor.certifications.length > 0;
  const hasMemberships = doctor.memberships && doctor.memberships.length > 0;
  const hasSocialMedia = doctor.socialMedia && (doctor.socialMedia.facebook || doctor.socialMedia.linkedin || doctor.socialMedia.doctoralia);
  const hasPressMentions = doctor.pressMentions && doctor.pressMentions.length > 0;

  // Separate career highlights with years from those without
  const timedHighlights = hasCareerHighlights
    ? doctor.careerHighlights!.filter(h => h.year)
    : [];
  const otherHighlights = hasCareerHighlights
    ? doctor.careerHighlights!.filter(h => !h.year)
    : [];

  return (
    <div className="min-h-screen bg-alba-dark">
      {/* ==================== HERO SECTION (KEEP AS IS) ==================== */}
      <section className="relative bg-alba-dark overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        {hasHeroImage && (
          <div className="absolute inset-0">
            <Image
              src={doctor.heroImage!}
              alt={doctor.name}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: 'center 20%' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-alba-dark/95 via-alba-dark/85 to-alba-dark/50" />
          </div>
        )}

        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="pt-28 md:pt-32 animate-in">
            <Link
              href="/directorio"
              className="inline-flex items-center gap-2 text-black/50 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEn ? 'Back to directory' : 'Volver al directorio'}</span>
            </Link>
          </div>

          <div className={`pt-12 pb-20 md:pb-28 ${hasHeroImage ? 'max-w-2xl' : ''}`}>
            {doctor.isFounder && (
              <div className="animate-in mb-4">
                <span className="inline-flex items-center gap-2 text-alba-primary text-sm font-medium">
                  <Award className="w-4 h-4" />
                  {t('doctors.founder')}
                </span>
              </div>
            )}

            <h1 className="animate-in text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-alba-text">
              {doctor.name}
            </h1>

            <p className="animate-in mt-4 text-xl md:text-2xl text-black/60 font-light">
              {doctor.role}
            </p>

            <div className="animate-in mt-10 flex flex-wrap gap-6">
              {doctorBranches.map((branch) => (
                <div key={branch!.id} className="flex items-center gap-2 text-black/40">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{branch!.name}</span>
                </div>
              ))}
              {doctor.languages && (
                <div className="flex items-center gap-2 text-black/40">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{(isEn ? doctor.languagesEn : doctor.languages)?.join(' · ')}</span>
                </div>
              )}
            </div>

            <div className="animate-in mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${doctor.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/10 hover:bg-black/20 rounded-full text-gray-900 text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{doctor.email}</span>
              </a>
              {doctor.phone && (
                <a
                  href={`tel:${doctor.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black/10 hover:bg-black/20 rounded-full text-gray-900 text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{doctor.phone}</span>
                </a>
              )}
              {hasSocialMedia && (
                <div className="flex items-center gap-2">
                  {doctor.socialMedia?.facebook && (
                    <a href={doctor.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
                      <FacebookIcon className="w-4 h-4 text-gray-900" />
                    </a>
                  )}
                  {doctor.socialMedia?.linkedin && (
                    <a href={doctor.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
                      <LinkedInIcon className="w-4 h-4 text-gray-900" />
                    </a>
                  )}
                  {doctor.socialMedia?.doctoralia && (
                    <a href={doctor.socialMedia.doctoralia} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
                      <DoctoraliaIcon className="w-4 h-4 text-gray-900" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {(doctor.cedula || doctor.cedulaEspecialidad) && (
              <div className="animate-in mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/30">
                {doctor.cedula && <span>{isEn ? 'License' : 'Cédula'}: {doctor.cedula}</span>}
                {doctor.cedulaEspecialidad && <span>{isEn ? 'Specialty' : 'Especialidad'}: {doctor.cedulaEspecialidad}</span>}
              </div>
            )}
          </div>
        </div>

        {!hasHeroImage && (
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <div className="relative h-full">
              <Image src={doctor.image} alt={doctor.name} fill sizes="50vw" className="object-cover object-top" priority />
              <div className="absolute inset-0 bg-gradient-to-r from-alba-dark via-alba-dark/50 to-transparent" />
            </div>
          </div>
        )}
      </section>

      {/* ==================== MAIN CONTENT - IMMERSIVE SECTIONS ==================== */}
      <div ref={contentRef}>

        {/* SECTION 01: QUOTE */}
        {hasQuote && (
          <section className="content-section relative py-20 md:py-28 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Large decorative number */}
            <span className="section-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] font-bold text-gray-900 opacity-0 select-none pointer-events-none">
              01
            </span>

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center">
              {/* Decorative opening quote */}
              <span className="animate-content block text-6xl md:text-7xl font-serif text-alba-primary/20 leading-none mb-2">
                &ldquo;
              </span>

              <blockquote className="animate-content">
                <p className="text-xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed italic">
                  {isEn ? doctor.quoteEn : doctor.quote}
                </p>
              </blockquote>

              <footer className="animate-content mt-6">
                <cite className="not-italic text-base md:text-lg text-gray-500">
                  &mdash; {doctor.name.split(' ').slice(0, 3).join(' ')}
                </cite>
              </footer>
            </div>
          </section>
        )}

        {/* SECTION 02: ABOUT (Extended Bio with Background Image) */}
        {hasExtendedBio && (
          <section className="content-section relative py-20 md:py-28 overflow-hidden">
            {/* Background Image - lazy loaded */}
            {doctor.profileImage && (
              <div className="absolute inset-0">
                <Image
                  src={doctor.profileImage}
                  alt={doctor.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 20%' }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8AzrTtF07UtLivLi6nSaRnDKhAAwxAx/aKKKmuxuTYc7FKuf/Z"
                />
                {/* Lighter overlay to show image while maintaining text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
              </div>
            )}

            {/* Large decorative number */}
            <span className="section-number absolute top-10 right-10 text-[10rem] md:text-[14rem] font-bold text-gray-900 opacity-0 select-none pointer-events-none">
              02
            </span>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
              <div className="max-w-2xl">
                <span className="animate-content block text-sm font-medium text-alba-primary uppercase tracking-wider mb-4">
                  {isEn ? 'About' : 'Sobre mí'}
                </span>

                <div className="animate-content space-y-4">
                  {(isEn ? doctor.extendedBioEn : doctor.extendedBio)!.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 03: PHILOSOPHY (if exists) */}
        {hasPhilosophy && (
          <section className="content-section relative py-20 md:py-28 overflow-hidden">
            {/* Background Image - lazy loaded */}
            {doctor.heroImage && (
              <div className="absolute inset-0">
                <Image
                  src={doctor.heroImage}
                  alt={doctor.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8AzrTtF07UtLivLi6nSaRnDKhAAwxAx/aKKKmuxuTYc7FKuf/Z"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-white/80" />
              </div>
            )}

            {/* Large decorative number */}
            <span className="section-number absolute top-10 left-10 text-[10rem] md:text-[14rem] font-bold text-gray-900 opacity-0 select-none pointer-events-none">
              03
            </span>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
              <div className="max-w-2xl ml-auto">
                <span className="animate-content block text-sm font-medium text-alba-primary uppercase tracking-wider mb-4">
                  {isEn ? 'Philosophy & Approach' : 'Filosofía y Enfoque'}
                </span>

                <div className="animate-content space-y-4">
                  {(isEn ? doctor.philosophyEn : doctor.philosophy)!.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION: SPECIALTIES */}
        <section className="content-section py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <span className="animate-content block text-sm font-medium text-alba-primary uppercase tracking-wider mb-8">
              {t('doctors.specialties')}
            </span>
            <div className="animate-content flex flex-wrap gap-3">
              {(isEn ? doctor.specialtiesEn : doctor.specialties).map((specialty, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-alba-dark transition-colors cursor-default"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CREDENTIALS (Vertical Timeline) */}
        <section className="content-section py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

              {/* Education */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-alba-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-alba-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    {t('doctors.education')}
                  </span>
                </div>
                <div className="space-y-4 border-l-2 border-gray-200 pl-6">
                  {(isEn ? doctor.educationEn : doctor.education).map((edu, index) => (
                    <div key={index} className="timeline-item relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-alba-primary" />
                      <p className="text-gray-700">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {hasCertifications && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-alba-primary/10 flex items-center justify-center">
                      <BadgeCheck className="w-5 h-5 text-alba-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      {isEn ? 'Certifications' : 'Certificaciones'}
                    </span>
                  </div>
                  <div className="space-y-4 border-l-2 border-gray-200 pl-6">
                    {(isEn ? doctor.certificationsEn || doctor.certifications : doctor.certifications)!.map((cert, index) => (
                      <div key={index} className="timeline-item relative">
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-alba-primary" />
                        <p className="text-gray-700">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Memberships */}
              {hasMemberships && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-alba-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-alba-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      {isEn ? 'Memberships' : 'Membresías'}
                    </span>
                  </div>
                  <div className="space-y-4 border-l-2 border-gray-200 pl-6">
                    {(isEn ? doctor.membershipsEn || doctor.memberships : doctor.memberships)!.map((membership, index) => (
                      <div key={index} className="timeline-item relative">
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-alba-primary" />
                        <p className="text-gray-700">{membership}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION: CAREER HIGHLIGHTS (Horizontal Timeline) */}
        {timedHighlights.length > 0 && (
          <section className="content-section py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
              <span className="animate-content block text-sm font-medium text-alba-primary uppercase tracking-wider mb-12">
                {isEn ? 'Career Highlights' : 'Momentos Destacados'}
              </span>

              {/* Horizontal Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {timedHighlights.map((highlight, index) => (
                    <div key={index} className="timeline-item relative pt-12">
                      {/* Timeline dot */}
                      <div className="absolute top-4 left-0 w-4 h-4 rounded-full bg-alba-primary border-4 border-white shadow-md" />

                      {/* Year */}
                      <span className="text-alba-primary text-sm font-bold">{highlight.year}</span>

                      {/* Title */}
                      <p className="mt-2 text-lg font-medium text-gray-900">
                        {isEn ? highlight.titleEn : highlight.title}
                      </p>

                      {/* Description */}
                      {(highlight.description || highlight.descriptionEn) && (
                        <p className="mt-2 text-gray-600 text-sm">
                          {isEn ? highlight.descriptionEn : highlight.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Other highlights without years */}
              {otherHighlights.length > 0 && (
                <div className="mt-16">
                  <span className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                    {isEn ? 'Additional Achievements' : 'Logros Adicionales'}
                  </span>
                  <div className="grid md:grid-cols-2 gap-4">
                    {otherHighlights.map((highlight, index) => (
                      <div key={index} className="timeline-item flex items-start gap-3 p-4 bg-white rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-alba-primary mt-2 flex-shrink-0" />
                        <p className="text-gray-700">
                          {isEn ? highlight.titleEn : highlight.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION: PRESS MENTIONS */}
        {hasPressMentions && (
          <section className="content-section py-12 md:py-16 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
              <span className="animate-content block text-sm font-medium text-alba-primary uppercase tracking-wider mb-6">
                {isEn ? 'Recognition' : 'Reconocimientos'}
              </span>
              <a
                href={doctor.pressMentions![0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-content group flex items-center gap-6 md:gap-8"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-alba-primary/10 flex items-center justify-center group-hover:bg-alba-primary/20 transition-colors">
                  <Award className="w-7 h-7 md:w-8 md:h-8 text-alba-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-alba-primary">
                      {doctor.pressMentions![0].year}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">
                      {doctor.pressMentions![0].source}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-medium text-gray-900 group-hover:text-alba-primary transition-colors">
                    {isEn ? doctor.pressMentions![0].titleEn || doctor.pressMentions![0].title : doctor.pressMentions![0].title}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-alba-primary group-hover:text-white transition-all">
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </a>
            </div>
          </section>
        )}

        {/* SECTION: EXTERNAL PRACTICES (Dark Section) */}
        {hasExternalPractices && (
          <section className="content-section py-16 md:py-24 bg-alba-dark">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
              <div className="flex items-center gap-3 mb-12">
                <Building2 className="w-6 h-6 text-alba-primary" />
                <span className="text-sm font-medium text-black/60 uppercase tracking-wider">
                  {isEn ? 'Also Practices At' : 'También Atiende En'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {doctor.externalPractices!.map((practice, index) => (
                  <div key={index} className="animate-content bg-black/5 border border-black/10 rounded-2xl p-6 md:p-8 hover:bg-black/10 transition-colors">
                    <p className="text-xl font-medium text-gray-900 mb-3">{practice.name}</p>
                    <div className="flex items-start gap-2 text-black/60 mb-2">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <p className="text-sm">{practice.address}</p>
                    </div>
                    {practice.phone && (
                      <a
                        href={`tel:${practice.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 text-alba-primary hover:text-alba-primary-light transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{practice.phone}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION: CTA + ALBA LOCATIONS */}
        <section className="content-section py-20 md:py-28 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            {/* Alba Locations */}
            <div className="animate-content mb-12">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                {isEn ? 'Alba Dialysis Locations' : 'Sucursales Alba Diálisis'}
              </span>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {doctorBranches.map((branch) => (
                  <Link
                    key={branch!.id}
                    href={`/sucursales#${branch!.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-gray-700 hover:text-alba-primary shadow-sm hover:shadow-md transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{branch!.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="animate-content">
              <p className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                {isEn ? 'Ready to schedule your consultation?' : '¿Listo para agendar tu consulta?'}
              </p>
              <p className="text-lg text-gray-500 mb-8">
                {isEn
                  ? `Book an appointment with ${doctor.name.split(' ').slice(0, 3).join(' ')}.`
                  : `Agenda una cita con ${doctor.name.split(' ').slice(0, 3).join(' ')}.`
                }
              </p>
              <a
                href="#agendar"
                className="inline-flex items-center gap-3 px-10 py-4 bg-alba-primary hover:bg-alba-primary/90 text-white rounded-full text-lg font-medium transition-colors shadow-lg shadow-alba-primary/25"
              >
                <Calendar className="w-5 h-5" />
                {isEn ? 'Book Appointment' : 'Agendar Cita'}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ==================== BOOKING CALENDAR SECTION ==================== */}
      <section id="agendar" className="bg-alba-dark">
        <CalComBooking
          calUsername={calConfig.username}
          doctorName={doctor.name}
          eventSlug={calConfig.eventSlug}
        />
      </section>
    </div>
  );
}

export default DoctorProfilePage;
