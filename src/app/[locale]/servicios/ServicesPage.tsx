'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  ArrowUpRight, Heart, Clock, Shield, Users, Check, ChevronDown,
  Activity, Droplets, Apple, Brain, Dumbbell, Stethoscope, UserCog, Scissors,
  type LucideIcon
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StepRampDivider } from '@/components/ui/step-ramp-divider';
import { servicesData, type ServiceDetail, type ServiceIconName } from '@/lib/services-data';

gsap.registerPlugin(ScrollTrigger);

// Map icon names to components
const iconMap: Record<ServiceIconName, LucideIcon> = {
  Activity,
  Droplets,
  Heart,
  Apple,
  Brain,
  Dumbbell,
  Stethoscope,
  UserCog,
  Scissors,
};

// Map services data to grid layout
const services = servicesData.map((service, index) => ({
  ...service,
  row: Math.floor(index / 3),
  col: index % 3,
}));

// Key benefits of Alba (general)
const keyBenefits = [
  {
    icon: Shield,
    titleEs: 'Tecnología de punta',
    titleEn: 'Cutting-edge technology',
    descriptionEs: 'Equipos de última generación para tratamientos más seguros y efectivos.',
    descriptionEn: 'State-of-the-art equipment for safer and more effective treatments.',
  },
  {
    icon: Users,
    titleEs: 'Atención personalizada',
    titleEn: 'Personalized care',
    descriptionEs: 'Un equipo médico que te conoce y adapta el tratamiento a tus necesidades.',
    descriptionEn: 'A medical team that knows you and adapts treatment to your needs.',
  },
  {
    icon: Heart,
    titleEs: 'Ambiente cómodo',
    titleEn: 'Comfortable environment',
    descriptionEs: 'Instalaciones diseñadas para tu comodidad durante cada sesión.',
    descriptionEn: 'Facilities designed for your comfort during each session.',
  },
  {
    icon: Clock,
    titleEs: 'Horarios flexibles',
    titleEn: 'Flexible schedules',
    descriptionEs: 'Turnos matutinos, vespertinos y nocturnos para adaptarnos a tu vida.',
    descriptionEn: 'Morning, afternoon, and evening shifts to fit your life.',
  },
];

// Dynamic grid configuration
const ROWS = 3;
const COLS = 3;
const HOVER_SIZE = 7; // Size of hovered row/col in fr units (out of 12)
const GAP_SIZE = 1; // Gap in pixels

export function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isEn = locale === 'en';
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Refs for GSAP animations
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionHeaderRef = useRef<HTMLHeadingElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);
  const featuredHeaderRef = useRef<HTMLDivElement>(null);
  const featuredImageRef = useRef<HTMLDivElement>(null);
  const desktopStatsRef = useRef<HTMLDivElement>(null);
  const mobileStatsRef = useRef<HTMLDivElement>(null);
  const ctaHeadlineRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const educationHeaderRef = useRef<HTMLDivElement>(null);
  const educationContentRef = useRef<HTMLDivElement>(null);
  const processHeaderRef = useRef<HTMLDivElement>(null);
  const processStepsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Hero animation
  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(heroContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      if (sectionHeaderRef.current) {
        gsap.fromTo(sectionHeaderRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: sectionHeaderRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Grid items - staggered (desktop)
      if (gridContainerRef.current) {
        const gridItems = gridContainerRef.current.querySelectorAll('.service-card');
        gsap.fromTo(gridItems,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
            scrollTrigger: { trigger: gridContainerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Mobile grid items - staggered
      if (mobileGridRef.current) {
        const mobileItems = mobileGridRef.current.querySelectorAll('.mobile-service-card');
        gsap.fromTo(mobileItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: mobileGridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Featured header
      if (featuredHeaderRef.current) {
        gsap.fromTo(featuredHeaderRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: featuredHeaderRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Featured image
      if (featuredImageRef.current) {
        gsap.fromTo(featuredImageRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: featuredImageRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Desktop stats - staggered
      if (desktopStatsRef.current) {
        const stats = desktopStatsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(stats,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out',
            scrollTrigger: { trigger: desktopStatsRef.current, start: 'top 90%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Mobile stats - staggered
      if (mobileStatsRef.current) {
        const mobileStats = mobileStatsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(mobileStats,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: mobileStatsRef.current, start: 'top 90%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // CTA headline
      if (ctaHeadlineRef.current) {
        gsap.fromTo(ctaHeadlineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: ctaHeadlineRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // CTA content
      if (ctaContentRef.current) {
        gsap.fromTo(ctaContentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: ctaContentRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Education header
      if (educationHeaderRef.current) {
        gsap.fromTo(educationHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: educationHeaderRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Education content
      if (educationContentRef.current) {
        gsap.fromTo(educationContentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: educationContentRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Process header
      if (processHeaderRef.current) {
        gsap.fromTo(processHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: processHeaderRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Process steps - staggered
      if (processStepsRef.current) {
        const steps = processStepsRef.current.querySelectorAll('.process-step');
        gsap.fromTo(steps,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: processStepsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Benefits - staggered
      if (benefitsRef.current) {
        const benefits = benefitsRef.current.querySelectorAll('.benefit-card');
        gsap.fromTo(benefits,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: benefitsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Calculate grid template sizes based on hover state
  const getRowSizes = () => {
    if (hovered === null) return '1fr 1fr 1fr';
    const { row } = hovered;
    const nonHoveredSize = (12 - HOVER_SIZE) / (ROWS - 1);
    return Array.from({ length: ROWS }, (_, r) =>
      r === row ? `${HOVER_SIZE}fr` : `${nonHoveredSize}fr`
    ).join(' ');
  };

  const getColSizes = () => {
    if (hovered === null) return '1fr 1fr 1fr';
    const { col } = hovered;
    const nonHoveredSize = (12 - HOVER_SIZE) / (COLS - 1);
    return Array.from({ length: COLS }, (_, c) =>
      c === col ? `${HOVER_SIZE}fr` : `${nonHoveredSize}fr`
    ).join(' ');
  };

  return (
    <>
      {/* Hero Section - Alba Style */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/alba-extracted/fotos-servicios-4.jpg"
          alt="Alba Diálisis Services"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content - Bottom left positioned */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 xl:px-24 pb-32 md:pb-40 lg:pb-48">
          <div ref={heroContentRef} className="opacity-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                {isEn ? 'Our Services' : 'Nuestros Servicios'}
              </span>
            </div>
            <h1
              className="font-light leading-[0.95] tracking-tight"
              style={{ color: '#FFFFFF', fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              {isEn ? (
                <>Comprehensive care for<br />your kidney health</>
              ) : (
                <>Atención integral para<br />tu salud renal</>
              )}
            </h1>
          </div>
        </div>

        {/* Double Notch Divider - Both corners cut */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[100px] md:h-[150px]">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
          >
            {/* Cream shape with notches on both sides, center image extends down */}
            <path
              d="M0,50 L0,150 L1200,150 L1200,50 L950,50 L950,0 L250,0 L250,50 Z"
              fill="#F0EDDC"
            />
          </svg>
        </div>
      </section>

      {/* Services Grid - Dynamic Expanding Animation */}
      <section className="bg-alba-dark pt-12 md:pt-16 pb-20 md:pb-28 lg:pb-32 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Centered */}
          <div className="mb-12 md:mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                {isEn ? 'Explore our services' : 'Explora nuestros servicios'}
              </span>
            </div>
            <h2
              ref={sectionHeaderRef}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight max-w-2xl mx-auto opacity-0"
            >
              {isEn ? 'Comprehensive care for your kidney health' : 'Atención integral para tu salud renal'}
            </h2>
          </div>

          {/* Desktop: Dynamic Expanding Grid (hidden on mobile/touch) */}
          <div
            ref={gridContainerRef}
            className={`h-[60vh] min-h-[400px] max-h-[600px] border border-gray-900/10 ${isTouchDevice ? 'hidden' : 'hidden md:grid'}`}
            style={{
              gridTemplateRows: getRowSizes(),
              gridTemplateColumns: getColSizes(),
              gap: `${GAP_SIZE}px`,
              transition: 'grid-template-rows 0.4s ease, grid-template-columns 0.4s ease',
            }}
          >
            {services.map((service, index) => {
              const isHovered = hovered?.row === service.row && hovered?.col === service.col;
              // Border logic for 3x3 grid
              const isLastCol = service.col === 2;
              const isLastRow = service.row === 2;
              const IconComponent = iconMap[service.iconName];

              return (
                <div
                  key={service.id}
                  className={`service-card relative overflow-hidden cursor-pointer bg-alba-dark border-gray-900/10 opacity-0 ${
                    !isLastCol ? 'border-r' : ''
                  } ${!isLastRow ? 'border-b' : ''}`}
                  onMouseEnter={() => setHovered({ row: service.row, col: service.col })}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Content container */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10">
                    {/* Top: Number and Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        0{index + 1}
                      </span>
                      <IconComponent className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-alba-primary' : 'text-gray-300'}`} />
                    </div>

                    {/* Content - positioned at bottom */}
                    <div>
                      {/* Title - always visible */}
                      <h3
                        className={`text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                          isHovered ? 'mb-3' : 'mb-0'
                        }`}
                      >
                        {isEn ? service.titleEn : service.title}
                      </h3>

                      {/* Description and CTA - only visible on hover */}
                      <div
                        className={`transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] overflow-hidden ${
                          isHovered
                            ? 'max-h-[250px] opacity-100 translate-y-0'
                            : 'max-h-0 opacity-0 translate-y-2'
                        }`}
                      >
                        <p className="text-sm md:text-base leading-relaxed text-gray-500 mb-4">
                          {isEn ? service.shortDescriptionEn : service.shortDescription}
                        </p>
                        <Link
                          href={`/servicios/${service.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-alba-primary hover:text-alba-primary/80 transition-colors"
                        >
                          {isEn ? 'Learn more' : 'Ver más'}
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/Touch: Expandable card layout with benefits preview */}
          <div
            ref={mobileGridRef}
            className={`grid grid-cols-1 gap-4 ${isTouchDevice ? 'block' : 'md:hidden'}`}
          >
            {services.map((service, index) => {
              const isExpanded = expandedService === service.id;
              const IconComponent = iconMap[service.iconName];
              const benefits = isEn ? service.benefitsEn : service.benefits;

              return (
                <div
                  key={service.id}
                  className="mobile-service-card bg-alba-dark border border-gray-900/10 overflow-hidden opacity-0"
                >
                  {/* Header - always visible, clickable to expand */}
                  <button
                    onClick={() => setExpandedService(isExpanded ? null : service.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-medium text-gray-400">
                            0{index + 1}
                          </span>
                          <IconComponent className={`w-4 h-4 transition-colors duration-300 ${isExpanded ? 'text-alba-primary' : 'text-gray-300'}`} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {isEn ? service.titleEn : service.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-500 mb-4">
                        {isEn ? service.shortDescriptionEn : service.shortDescription}
                      </p>

                      {/* Benefits preview - show first 3 */}
                      <div className="space-y-2 mb-5">
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                          {isEn ? 'Benefits' : 'Beneficios'}
                        </span>
                        {benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-alba-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Duration/Frequency if available */}
                      {(service.duration || service.frequency) && (
                        <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-gray-100">
                          {service.duration && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {service.duration}
                            </div>
                          )}
                          {service.frequency && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              {service.frequency}
                            </div>
                          )}
                        </div>
                      )}

                      {/* CTA Link */}
                      <Link
                        href={`/servicios/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-alba-primary hover:text-alba-primary/80 transition-colors"
                      >
                        {isEn ? 'View full details' : 'Ver información completa'}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Section - What is Hemodialysis? */}
      <section className="bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Header and main explanation */}
            <div ref={educationHeaderRef} className="opacity-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-alba-primary" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                  {isEn ? 'Understanding the treatment' : 'Entendiendo el tratamiento'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight mb-6">
                {isEn ? 'What is hemodialysis?' : '¿Qué es la hemodiálisis?'}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {isEn
                  ? 'Hemodialysis is a treatment that performs the filtering function that healthy kidneys do naturally. When kidneys lose their ability to filter, toxins and excess fluids accumulate in the body.'
                  : 'La hemodiálisis es un tratamiento que realiza la función de filtrado que los riñones sanos hacen de forma natural. Cuando los riñones pierden su capacidad de filtrar, las toxinas y el exceso de líquidos se acumulan en el cuerpo.'}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {isEn
                  ? 'During treatment, your blood passes through a special filter called a '
                  : 'Durante el tratamiento, tu sangre pasa a través de un filtro especial llamado '}
                <span className="font-medium text-gray-700">{isEn ? 'dialyzer' : 'dializador'}</span>
                {isEn
                  ? ', which acts as an artificial kidney. This process removes waste, excess salt and fluids, helping maintain a healthy balance in your body.'
                  : ', que actúa como un riñón artificial. Este proceso elimina los desechos, el exceso de sal y líquidos, ayudando a mantener un equilibrio saludable en tu cuerpo.'}
              </p>
            </div>

            {/* Right: Key facts and image */}
            <div ref={educationContentRef} className="opacity-0">
              <div className="relative aspect-[4/3] mb-8 overflow-hidden">
                <Image
                  src="/images/services/hemodialisis.jpg"
                  alt={isEn ? 'Hemodialysis process' : 'Proceso de hemodiálisis'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-alba-primary pl-4">
                  <span className="text-2xl font-light text-gray-900">3-4 hrs</span>
                  <p className="text-sm text-gray-500 mt-1">{isEn ? 'Typical session duration' : 'Duración típica de cada sesión'}</p>
                </div>
                <div className="border-l-2 border-alba-primary pl-4">
                  <span className="text-2xl font-light text-gray-900">{isEn ? '3 times' : '3 veces'}</span>
                  <p className="text-sm text-gray-500 mt-1">{isEn ? 'Per week generally' : 'Por semana generalmente'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits grid */}
          <div ref={benefitsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-100">
            {keyBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="benefit-card group opacity-0">
                  <div className="w-12 h-12 rounded-full bg-alba-primary/10 flex items-center justify-center mb-4 group-hover:bg-alba-primary/20 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 text-alba-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{isEn ? benefit.titleEn : benefit.titleEs}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{isEn ? benefit.descriptionEn : benefit.descriptionEs}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Treatment Process Timeline */}
      <section className="bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={processHeaderRef} className="text-center mb-16 opacity-0">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                {isEn ? 'Your session step by step' : 'Tu sesión paso a paso'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight max-w-2xl mx-auto">
              {isEn ? 'What is a hemodialysis session like?' : '¿Cómo es una sesión de hemodiálisis?'}
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              {isEn
                ? 'Learn about each stage of your treatment so you feel safe and confident.'
                : 'Conoce cada etapa de tu tratamiento para que te sientas seguro y tranquilo.'}
            </p>
          </div>

          {/* Process steps - use hemodialysis process from services data */}
          <div ref={processStepsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {servicesData[0].process.map((step, index) => (
              <div
                key={index}
                className="process-step relative bg-alba-dark p-6 lg:p-8 border border-gray-100 opacity-0"
              >
                {/* Connector line (hidden on mobile and last item) */}
                {index < servicesData[0].process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gray-200" />
                )}

                {/* Step number */}
                <span className="inline-block text-xs font-medium text-alba-primary mb-4">
                  {isEn ? `Step ${step.step}` : `Paso ${step.step}`}
                </span>

                {/* Content */}
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {isEn ? step.titleEn : step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {isEn ? step.descriptionEn : step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 max-w-2xl mx-auto">
              <span className="font-medium text-gray-700">{isEn ? 'First time?' : '¿Primera vez?'}</span>{' '}
              {isEn
                ? "Don't worry. Our team will accompany you every step and answer all your questions. Most patients feel comfortable from the first session."
                : 'No te preocupes. Nuestro equipo te acompañará en cada paso y responderá todas tus preguntas. La mayoría de los pacientes se sienten cómodos desde la primera sesión.'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Service - Full width image */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-25 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            ref={featuredHeaderRef}
            className="mb-12 md:mb-16 opacity-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                {isEn ? 'Featured service' : 'Servicio destacado'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light !text-gray-900 tracking-tight">
              {isEn ? 'High-efficiency hemodialysis' : 'Hemodiálisis de alta eficiencia'}
            </h2>
          </div>

          {/* Image with SVG mask + Stats overlay */}
          <div
            ref={featuredImageRef}
            className="relative opacity-0"
          >
            <svg
              className="w-full"
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <clipPath id="service-mask">
                  {/* Alba-style asymmetric: full top, step cut bottom-left */}
                  <path d="M0,0 L1200,0 L1200,380 L250,380 L250,500 L0,500 Z" />
                </clipPath>
              </defs>
              <image
                clipPath="url(#service-mask)"
                href="/images/services/hemodialisis-clinic.jpg"
                width="1200"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>

            {/* Stats positioned in the cropped area */}
            <div
              ref={desktopStatsRef}
              className="absolute hidden md:grid grid-cols-4 gap-6 lg:gap-8 items-end px-6 lg:px-10"
              style={{
                left: '20.83%', // 250/1200 = where the step starts
                right: '0',
                top: '76%', // 380/500 = where the step starts vertically
                bottom: '0',
              }}
            >
              {[
                { number: '4', labelEs: 'Clínicas en el Bajío', labelEn: 'Clinics in Bajío' },
                { number: '50+', labelEs: 'Profesionales', labelEn: 'Professionals' },
                { number: '5,000+', labelEs: 'Pacientes atendidos', labelEn: 'Patients served' },
                { number: '25', labelEs: 'Años de experiencia', labelEn: 'Years of experience' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="stat-item text-left opacity-0"
                >
                  <span className="text-2xl lg:text-3xl xl:text-4xl font-light text-alba-primary">
                    {stat.number}
                  </span>
                  <p className="text-xs lg:text-sm text-gray-900/50 mt-1 uppercase tracking-wider">
                    {isEn ? stat.labelEn : stat.labelEs}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile stats - below image */}
            <div ref={mobileStatsRef} className="grid grid-cols-2 gap-6 mt-8 md:hidden">
              {[
                { number: '4', labelEs: 'Clínicas en el Bajío', labelEn: 'Clinics in Bajío' },
                { number: '50+', labelEs: 'Profesionales', labelEn: 'Professionals' },
                { number: '5,000+', labelEs: 'Pacientes atendidos', labelEn: 'Patients served' },
                { number: '25', labelEs: 'Años de experiencia', labelEn: 'Years of experience' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="stat-item text-center opacity-0"
                >
                  <span className="text-3xl font-light text-alba-primary">
                    {stat.number}
                  </span>
                  <p className="text-sm text-gray-900/50 mt-2 uppercase tracking-wider">
                    {isEn ? stat.labelEn : stat.labelEs}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step divider */}
        <StepRampDivider
          color="#F0EDDC"
          height={100}
          className="absolute bottom-0 left-0 right-0 translate-y-[99px]"
        />
      </section>

      {/* CTA Section - With Gradient Blob Background */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large teal/cyan blob - top right */}
          <div
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, rgba(45, 212, 191, 0) 70%)',
            }}
          />
          {/* Lime/yellow blob - bottom left */}
          <div
            className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(212, 255, 0, 0.5) 0%, rgba(212, 255, 0, 0) 70%)',
            }}
          />
          {/* Smaller accent blob - center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0) 70%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side - Large headline */}
            <div
              ref={ctaHeadlineRef}
              className="lg:col-span-7 opacity-0"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  {isEn ? 'Take the first step' : 'Da el primer paso'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[0.95] tracking-tight">
                {isEn ? (
                  <>Ready to start<br />your treatment?</>
                ) : (
                  <>¿Listo para comenzar<br />tu tratamiento?</>
                )}
              </h2>
            </div>

            {/* Right side - CTA content */}
            <div
              ref={ctaContentRef}
              className="lg:col-span-5 lg:border-l lg:border-gray-900/10 lg:pl-12 opacity-0"
            >
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8">
                {isEn
                  ? 'Schedule a consultation with our specialists and find the ideal treatment for you.'
                  : 'Agenda una consulta con nuestros especialistas y conoce el tratamiento ideal para ti.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                    {isEn ? 'Book appointment' : 'Agendar cita'}
                  </span>
                  <span className="w-12 h-12 rounded-full border border-gray-900/20 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;
