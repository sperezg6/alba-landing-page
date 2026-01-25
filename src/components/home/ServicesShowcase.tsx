'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ArrowUpRight, Activity, Droplets, Heart, Apple, Clock, Users, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Services data - links go to individual service detail pages
const services = [
  {
    id: 'hemodialysis',
    labelKey: 'services.hemodialysis.title',
    descriptionKey: 'services.hemodialysis.description',
    image: '/images/services/procedimientos-quirurgicos.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios/hemodialisis',
    icon: Activity,
    highlights: [
      { icon: Clock, textEs: '3-4 horas por sesión', textEn: '3-4 hours per session' },
      { icon: Users, textEs: '+5,000 pacientes atendidos', textEn: '+5,000 patients served' },
      { icon: Shield, textEs: 'Tecnología de última generación', textEn: 'State-of-the-art technology' },
    ],
  },
  {
    id: 'hemodiafiltration',
    labelKey: 'services.hemodiafiltration.title',
    descriptionKey: 'services.hemodiafiltration.description',
    image: '/images/alba-extracted/fotos-servicios-2.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios/hemodiafiltracion',
    icon: Droplets,
    highlights: [
      { icon: Shield, textEs: 'Filtración más avanzada', textEn: 'More advanced filtration' },
      { icon: Heart, textEs: 'Mejor calidad de vida', textEn: 'Better quality of life' },
      { icon: Activity, textEs: 'Menos síntomas post-diálisis', textEn: 'Fewer post-dialysis symptoms' },
    ],
  },
  {
    id: 'transplant',
    labelKey: 'services.transplant.title',
    descriptionKey: 'services.transplant.description',
    image: '/images/services/clinica-dialisis.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios/trasplante-renal',
    icon: Heart,
    highlights: [
      { icon: Users, textEs: 'Equipo multidisciplinario', textEn: 'Multidisciplinary team' },
      { icon: Shield, textEs: 'Seguimiento integral', textEn: 'Comprehensive follow-up' },
      { icon: Clock, textEs: 'Acompañamiento en cada etapa', textEn: 'Support at every stage' },
    ],
  },
  {
    id: 'nutrition',
    labelKey: 'services.nutrition.title',
    descriptionKey: 'services.nutrition.description',
    image: '/images/alba-extracted/fotos-servicios-13.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios/nutricion-renal',
    icon: Apple,
    highlights: [
      { icon: Users, textEs: 'Planes personalizados', textEn: 'Personalized plans' },
      { icon: Heart, textEs: 'Mejora tu bienestar', textEn: 'Improve your wellbeing' },
      { icon: Shield, textEs: 'Nutriólogos especializados', textEn: 'Specialized nutritionists' },
    ],
  },
];

export function ServicesShowcase() {
  const t = useTranslations();
  const locale = useLocale();
  const isEn = locale === 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate each service card
      const cards = gsap.utils.toArray<HTMLElement>('.service-card-alba');
      cards.forEach((card) => {
        const content = card.querySelector('.service-content');
        const image = card.querySelector('.service-image');

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, scale: 1.02 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-creme-alba relative overflow-hidden">
      {/* Gradient Blobs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left lime blob */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-alba-primary/20 blur-[120px]" />
        {/* Center-right gold blob */}
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-amber-400/15 blur-[150px]" />
        {/* Bottom-left teal blob */}
        <div className="absolute bottom-1/4 -left-24 w-[400px] h-[400px] rounded-full bg-teal-400/10 blur-[100px]" />
        {/* Bottom-right lime blob */}
        <div className="absolute -bottom-48 right-1/4 w-[550px] h-[550px] rounded-full bg-alba-primary/15 blur-[130px]" />
      </div>

      {/* Family Mission Statement */}
      <div ref={headerRef} className="relative z-10 pt-32 pb-8 md:pt-40 md:pb-12 px-6 md:px-16 lg:px-24">
        {/* Family Mission Badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-alba-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
            {t('services.familyMission.headline')}
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 max-w-5xl leading-[1.1]">
          {t('services.title')}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-xl md:text-2xl text-gray-500 max-w-2xl">
          {t('services.subtitle')}
        </p>

        {/* Family Mission Description */}
        <p className="mt-8 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
          {t('services.familyMission.description')}
        </p>

        {/* Pillars */}
        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-600">{t('services.familyMission.pillars.care')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-600">{t('services.familyMission.pillars.support')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-600">{t('services.familyMission.pillars.quality')}</span>
          </div>
        </div>
      </div>

      {/* Service Cards - Full Background with Gradient Overlay */}
      {services.map((service, index) => {
        const isEvenCard = index % 2 === 0;
        const ServiceIcon = service.icon;

        return (
          <div
            key={service.id}
            className="service-card-alba relative z-10 min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden"
          >
            {/* Full Background Image */}
            <div className="service-image absolute inset-0">
              <Image
                src={service.image}
                alt={t(service.labelKey)}
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
              {/* Gradient Overlay - alternates sides */}
              <div
                className={`absolute inset-0 ${
                  isEvenCard
                    ? 'bg-gradient-to-r from-[#F5F1EB] via-[#F5F1EB]/80 to-transparent'
                    : 'bg-gradient-to-l from-[#F5F1EB] via-[#F5F1EB]/80 to-transparent'
                }`}
              />
            </div>

            {/* Content */}
            <div
              className={`
                service-content
                relative z-10
                w-full
                flex
                ${isEvenCard ? 'justify-start' : 'justify-end'}
                px-6 md:px-16 lg:px-24
                py-16 md:py-24
              `}
            >
              <div className="max-w-lg">
                {/* Icon and Label */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-alba-primary/10 backdrop-blur-sm flex items-center justify-center">
                    <ServiceIcon className="w-6 h-6 text-alba-primary" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-900">
                    {t(service.labelKey)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8">
                  {t(service.descriptionKey)}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {service.highlights.map((highlight, idx) => {
                    const HighlightIcon = highlight.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <HighlightIcon className="w-4 h-4 text-alba-primary flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {isEn ? highlight.textEn : highlight.textEs}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <AnimatedButton href={service.href} variant="filled">
                  {t(service.ctaKey)}
                </AnimatedButton>

                {/* Secondary CTA for Nutrition - Chatbot Link */}
                {service.id === 'nutrition' && (
                  <a
                    href="https://nutritional-chatbot-ui.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
                  >
                    {t('nutritionAssistant.link')}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* View All Services Link - Corner-cut outline button with letter animation */}
      <div className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 text-center">
        <AnimatedButton href="/servicios" variant="outline">
          {t('services.viewAll')}
        </AnimatedButton>
      </div>
    </section>
  );
}

export default ServicesShowcase;
