'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Services data
const services = [
  {
    id: 'hemodialysis',
    labelKey: 'services.hemodialysis.title',
    descriptionKey: 'services.hemodialysis.description',
    image: '/images/services/procedimientos-quirurgicos.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios#hemodialisis',
  },
  {
    id: 'hemodiafiltration',
    labelKey: 'services.hemodiafiltration.title',
    descriptionKey: 'services.hemodiafiltration.description',
    image: '/images/alba-extracted/fotos-servicios-2.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios#hemodiafiltracion',
  },
  {
    id: 'transplant',
    labelKey: 'services.transplant.title',
    descriptionKey: 'services.transplant.description',
    image: '/images/services/clinica-dialisis.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios#trasplante',
  },
  {
    id: 'nutrition',
    labelKey: 'services.nutrition.title',
    descriptionKey: 'services.nutrition.description',
    image: '/images/alba-extracted/fotos-servicios-13.jpg',
    ctaKey: 'common.learnMore',
    href: '/servicios#nutricion',
  },
];

export function ServicesShowcase() {
  const t = useTranslations();
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

      {/* Divider */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
        <div className="h-px bg-gray-200 w-full" />
      </div>

      {/* Service Cards */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={service.id}
            className={`service-card-alba relative z-10 min-h-[60vh] md:min-h-[70vh] flex ${isEven ? 'flex-row' : 'flex-row-reverse'} flex-wrap md:flex-nowrap`}
          >
            {/* Content Side */}
            <div
              className={`
                service-content
                w-full md:w-[45%]
                flex items-center
                px-6 md:px-16 lg:px-24
                py-16 md:py-0
                z-10
                order-2 md:order-none
              `}
            >
              <div className="max-w-md">
                {/* Bullet Label */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-900">
                    {t(service.labelKey)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8">
                  {t(service.descriptionKey)}
                </p>

                {/* CTA Button - Corner-cut clip-path animation with letter animation */}
                <AnimatedButton href={service.href} variant="filled">
                  {t(service.ctaKey)}
                </AnimatedButton>

                {/* Secondary CTA for Nutrition - Chatbot Link */}
                {service.id === 'nutrition' && (
                  <a
                    href="https://nutritional-chatbot-ui.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
                  >
                    {t('nutritionAssistant.link')}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Image Side - Alba-style frame with rounded corners and diagonal cuts */}
            <div
              className={`
                service-image
                w-full md:w-[50%]
                h-[40vh] md:h-auto
                aspect-[4/3]
                order-1 md:order-none
                ${isEven ? 'frame-alba-right' : 'frame-alba-left'}
              `}
            >
              <div className="relative w-full h-full">
                <Image
                  src={service.image}
                  alt={t(service.labelKey)}
                  fill
                  className="object-cover"
                />
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
