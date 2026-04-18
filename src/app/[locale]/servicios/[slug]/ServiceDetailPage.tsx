'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight, Check, ChevronDown, Clock, ArrowLeft,
  Activity, Droplets, Heart, Apple, Brain, Dumbbell, Stethoscope, UserCog, Scissors,
  type LucideIcon
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { type ServiceDetail, type ServiceIconName, getServiceBySlug } from '@/lib/services-data';

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

interface ServiceDetailPageProps {
  service: ServiceDetail;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Water effect state
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

  // Refs for animations
  const heroContentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const whoNeedsItRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const expectRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const IconComponent = iconMap[service.iconName];

  // Get content based on locale
  const title = isEn ? service.titleEn : service.title;
  const shortDescription = isEn ? service.shortDescriptionEn : service.shortDescription;
  const fullDescription = isEn ? service.fullDescriptionEn : service.fullDescription;
  const whoNeedsIt = isEn ? service.whoNeedsItEn : service.whoNeedsIt;
  const benefits = isEn ? service.benefitsEn : service.benefits;
  const whatToExpect = isEn ? service.whatToExpectEn : service.whatToExpect;

  // Get related services
  const relatedServices = service.relatedServices
    .map(slug => getServiceBySlug(slug))
    .filter(Boolean) as ServiceDetail[];

  // Hero animation
  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateOnScroll = (ref: React.RefObject<HTMLElement | null>) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      };

      animateOnScroll(descriptionRef);
      animateOnScroll(whoNeedsItRef);
      animateOnScroll(processRef);
      animateOnScroll(benefitsRef);
      animateOnScroll(expectRef);
      animateOnScroll(faqRef);
      animateOnScroll(relatedRef);
      animateOnScroll(ctaRef);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section - Minimal Dark (like directorio page) */}
      <section className="relative bg-alba-dark pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Orange blob top-right */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.22] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Back button */}
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity mb-8 text-alba-text/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{isEn ? 'All services' : 'Todos los servicios'}</span>
          </Link>

          <div ref={heroContentRef} className="opacity-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-alba-text/50">
                {isEn ? 'Service' : 'Servicio'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-alba-text">
              {(() => {
                const words = title.split(' ');
                if (words.length <= 1) return <span style={{ color: '#F59F20' }}>{title}</span>;
                const last = words[words.length - 1];
                const rest = words.slice(0, -1).join(' ');
                return <>{rest} <span style={{ color: '#F59F20' }}>{last}</span></>;
              })()}
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl leading-relaxed text-alba-text/60">
              {shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Full Description Section */}
      <section className="bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24">
        <div ref={descriptionRef} className="max-w-4xl mx-auto opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-alba-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
              {isEn ? 'About this service' : 'Sobre este servicio'}
            </span>
          </div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {fullDescription}
          </p>
        </div>
      </section>

      {/* Who Needs It Section */}
      <section className="bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={whoNeedsItRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center opacity-0">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  {isEn ? 'Who is it for' : 'Para quién es'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-6">
                {isEn ? 'Who needs this service?' : '¿Quién necesita este servicio?'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {whoNeedsIt}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={service.image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section - Horizontal Timeline */}
      <section className="relative bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Teal blob top-left */}
        <div
          className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div ref={processRef} className="opacity-0">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  {isEn ? 'How it works' : 'Cómo funciona'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
                {isEn ? 'The process' : 'El proceso'}
              </h2>
            </div>

            {/* Horizontal Timeline - Desktop */}
            <div className="hidden md:block relative">
              {/* Timeline Line */}
              <div className="absolute top-6 left-0 right-0 h-px bg-gray-300" />

              {/* Steps */}
              <div className="relative grid grid-cols-4 gap-4">
                {service.process.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Node */}
                    <div className="relative flex justify-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-alba-dark flex items-center justify-center relative z-10">
                        <span className="text-sm font-semibold text-gray-900">
                          {String(step.step).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                        {isEn ? step.titleEn : step.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {isEn ? step.descriptionEn : step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Timeline - Mobile */}
            <div className="md:hidden relative">
              {/* Timeline Line */}
              <div className="absolute top-0 bottom-0 left-6 w-px bg-gray-300" />

              {/* Steps */}
              <div className="space-y-10">
                {service.process.map((step, index) => (
                  <div key={index} className="relative flex gap-6">
                    {/* Timeline Node */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-alba-dark flex items-center justify-center relative z-10">
                        <span className="text-sm font-semibold text-gray-900">
                          {String(step.step).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {isEn ? step.titleEn : step.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {isEn ? step.descriptionEn : step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Orange blob bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <div ref={benefitsRef} className="opacity-0">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-alba-primary" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                    {isEn ? 'Benefits' : 'Beneficios'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-6">
                  {isEn ? 'Why choose this service?' : '¿Por qué elegir este servicio?'}
                </h2>
                <p className="text-gray-500">
                  {isEn
                    ? 'Each benefit is designed to improve your quality of life and support your kidney health journey.'
                    : 'Cada beneficio está diseñado para mejorar tu calidad de vida y apoyar tu camino hacia la salud renal.'}
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-alba-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-alba-primary" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section
        className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(77,189,201,0.15) 0%, #FAFAF7 50%, rgba(245,159,32,0.35) 100%)' }}
        onMouseMove={handleWaterMouseMove}
      >
        {/* Teal blob bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full opacity-[0.20] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
        />
        {/* Water glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 380px at ${waterPos.x}% ${waterPos.y}%, rgba(255,255,255,0.22) 0%, rgba(77,189,201,0.10) 45%, transparent 70%)`,
            transition: 'background 80ms linear',
          }}
        />
        {/* Ripple rings */}
        {ripples.map((r) => (
          <div
            key={r.id}
            className="water-ripple absolute rounded-full pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              transform: 'translate(-50%, -50%)',
              border: '1.5px solid rgba(77,189,201,0.55)',
            }}
          />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div ref={expectRef} className="opacity-0 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                {isEn ? 'What to expect' : 'Qué esperar'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8 text-alba-text">
              {isEn ? 'During your treatment' : 'Durante tu tratamiento'}
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-alba-text/80">
              {whatToExpect}
            </p>

            {/* Duration and Frequency if available */}
            {(service.duration || service.frequency) && (
              <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-black/10">
                {service.duration && (
                  <div className="flex items-center gap-3 text-alba-text/70">
                    <Clock className="w-5 h-5 text-alba-primary" />
                    <span>{service.duration}</span>
                  </div>
                )}
                {service.frequency && (
                  <div className="flex items-center gap-3 text-alba-text/70">
                    <div className="w-2 h-2 rounded-full bg-alba-primary" />
                    <span>{service.frequency}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faqs.length > 0 && (
        <section className="bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto">
            <div ref={faqRef} className="opacity-0">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gray-900" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                    FAQ
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
                  {isEn ? 'Frequently asked questions' : 'Preguntas frecuentes'}
                </h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div key={index} className="bg-alba-dark border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full p-6 text-left flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {isEn ? faq.questionEn : faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                          {isEn ? faq.answerEn : faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="bg-alba-dark py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div ref={relatedRef} className="opacity-0">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gray-900" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                    {isEn ? 'Related services' : 'Servicios relacionados'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
                  {isEn ? 'You might also need' : 'También podrías necesitar'}
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedServices.map((related) => {
                  const RelatedIcon = iconMap[related.iconName];
                  return (
                    <Link
                      key={related.id}
                      href={`/servicios/${related.slug}`}
                      className="group p-6 border border-gray-100 hover:border-alba-primary/30 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-alba-primary/10 flex items-center justify-center mb-4 transition-colors duration-300">
                        <RelatedIcon className="w-6 h-6 text-gray-400 group-hover:text-alba-primary transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-alba-primary transition-colors duration-300">
                        {isEn ? related.titleEn : related.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {isEn ? related.shortDescriptionEn : related.shortDescription}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative bg-alba-dark py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full opacity-[0.22] blur-3xl"
            style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full opacity-[0.18] blur-3xl"
            style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
          />
        </div>

        <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto text-center opacity-0">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-gray-900" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
              {isEn ? 'Take the next step' : 'Da el siguiente paso'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight mb-6">
            {isEn ? 'Ready to get started?' : '¿Listo para comenzar?'}
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            {isEn
              ? 'Schedule a consultation with our specialists and learn how this service can help you.'
              : 'Agenda una consulta con nuestros especialistas y conoce cómo este servicio puede ayudarte.'}
          </p>
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-4"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
              {isEn ? 'Book appointment' : 'Agendar cita'}
            </span>
            <span className="w-12 h-12 rounded-full border border-gray-900/20 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default ServiceDetailPage;
