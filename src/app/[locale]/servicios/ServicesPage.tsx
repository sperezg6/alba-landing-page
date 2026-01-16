'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StepRampDivider } from '@/components/ui/step-ramp-divider';

// Service data for the grid - 3 rows x 3 cols
const services = [
  {
    id: 1,
    title: 'Hemodiálisis',
    description: 'Sesiones otorgadas con la más avanzada tecnología y personal médico certificado. Tratamiento personalizado según tus necesidades clínicas individuales.',
    row: 0,
    col: 0,
  },
  {
    id: 2,
    title: 'Hemodiafiltración',
    description: 'Técnica avanzada que ofrece una eliminación de desechos más eficiente, mejorando tu calidad de vida a largo plazo.',
    row: 0,
    col: 1,
  },
  {
    id: 3,
    title: 'Trasplante Renal',
    description: 'Coordinamos protocolos de trasplante con hospitales de referencia, nefrólogos certificados y cirujanos de trasplante especializados.',
    row: 0,
    col: 2,
  },
  {
    id: 4,
    title: 'Nutrición Renal',
    description: 'Nutriólogos diseñan planes alimenticios personalizados con seguimiento continuo. Consultas individuales disponibles.',
    row: 1,
    col: 0,
  },
  {
    id: 5,
    title: 'Apoyo Psicológico',
    description: 'Profesionales en psicología ofrecen seguimiento e intervenciones personales o familiares dentro del programa de diálisis.',
    row: 1,
    col: 1,
  },
  {
    id: 6,
    title: 'Accesos Vasculares',
    description: 'Procedimientos especializados incluyendo catéteres temporales, catéteres tunelizados y fístulas arteriovenosas.',
    row: 1,
    col: 2,
  },
  {
    id: 7,
    title: 'Fisioterapia',
    description: 'Programa de rehabilitación integral durante las sesiones de diálisis en alianza con Therapy World Center.',
    row: 2,
    col: 0,
  },
  {
    id: 8,
    title: 'Consulta Nefrología',
    description: 'Consultas especializadas con nefrólogos certificados para diagnóstico, seguimiento y manejo integral de enfermedades renales.',
    row: 2,
    col: 1,
  },
  {
    id: 9,
    title: 'Cirugía de Trasplantes',
    description: 'Cirujanos especializados en trasplante renal para procedimientos quirúrgicos con los más altos estándares de calidad.',
    row: 2,
    col: 2,
  },
];

// Dynamic grid configuration
const ROWS = 3;
const COLS = 3;
const HOVER_SIZE = 7; // Size of hovered row/col in fr units (out of 12)
const GAP_SIZE = 1; // Gap in pixels

export function ServicesPage() {
  const t = useTranslations();
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

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
      {/* Hero Section - Inversa Style */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/alba-extracted/fotos-servicios-4.jpg"
          alt="Alba Diálisis Services"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content - Bottom left positioned */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 xl:px-24 pb-32 md:pb-40 lg:pb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                Nuestros Servicios
              </span>
            </div>
            <h1 className="inversa-headline !text-white max-w-4xl">
              Atención integral<br />
              para tu salud renal
            </h1>
          </motion.div>
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
              fill="#F4F3E8"
            />
          </svg>
        </div>
      </section>

      {/* Services Grid - Dynamic Expanding Animation */}
      <section className="bg-creme-inversa pt-12 md:pt-16 pb-20 md:pb-28 lg:pb-32 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Centered */}
          <div className="mb-12 md:mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                Explora nuestros servicios
              </span>
            </div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              Atención integral para tu salud renal
            </motion.h2>
          </div>

          {/* Dynamic Expanding Grid */}
          <div
            className="h-[60vh] min-h-[400px] max-h-[600px] border border-gray-900/10"
            style={{
              display: 'grid',
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

              return (
                <motion.div
                  key={service.id}
                  className={`relative overflow-hidden cursor-pointer bg-creme-inversa border-gray-900/10 ${
                    !isLastCol ? 'border-r' : ''
                  } ${!isLastRow ? 'border-b' : ''}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.77, 0, 0.175, 1] }}
                  onMouseEnter={() => setHovered({ row: service.row, col: service.col })}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Content container */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10">
                    {/* Number - top left */}
                    <span className="text-sm font-medium text-gray-400">
                      0{index + 1}
                    </span>

                    {/* Content - positioned at bottom */}
                    <div>
                      {/* Title - always visible */}
                      <h3
                        className={`text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                          isHovered ? 'mb-3' : 'mb-0'
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Description - only visible on hover */}
                      <p
                        className={`text-sm md:text-base leading-relaxed text-gray-500 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] overflow-hidden ${
                          isHovered
                            ? 'max-h-[200px] opacity-100 translate-y-0'
                            : 'max-h-0 opacity-0 translate-y-2'
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Service - Full width image */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                Servicio destacado
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light !text-white tracking-tight">
              Hemodiálisis de alta eficiencia
            </h2>
          </motion.div>

          {/* Image with SVG mask + Stats overlay */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <svg
              className="w-full"
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <clipPath id="service-mask">
                  {/* Inversa-style asymmetric: full top, step cut bottom-left */}
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
              className="absolute hidden md:grid grid-cols-4 gap-6 lg:gap-8 items-end px-6 lg:px-10"
              style={{
                left: '20.83%', // 250/1200 = where the step starts
                right: '0',
                top: '76%', // 380/500 = where the step starts vertically
                bottom: '0',
              }}
            >
              {[
                { number: '3', label: 'Clínicas en el Bajío' },
                { number: '50+', label: 'Profesionales' },
                { number: '5,000+', label: 'Pacientes atendidos' },
                { number: '25', label: 'Años de experiencia' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.77, 0, 0.175, 1] }}
                  className="text-left"
                >
                  <span className="text-2xl lg:text-3xl xl:text-4xl font-light text-alba-primary">
                    {stat.number}
                  </span>
                  <p className="text-xs lg:text-sm text-[#F4F3E8]/50 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile stats - below image */}
            <div className="grid grid-cols-2 gap-6 mt-8 md:hidden">
              {[
                { number: '3', label: 'Clínicas en el Bajío' },
                { number: '50+', label: 'Profesionales' },
                { number: '5,000+', label: 'Pacientes atendidos' },
                { number: '25', label: 'Años de experiencia' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.77, 0, 0.175, 1] }}
                  className="text-center"
                >
                  <span className="text-3xl font-light text-alba-primary">
                    {stat.number}
                  </span>
                  <p className="text-sm text-[#F4F3E8]/50 mt-2 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Step divider */}
        <StepRampDivider
          color="#F4F3E8"
          height={100}
          className="absolute bottom-0 left-0 right-0 translate-y-[99px]"
        />
      </section>

      {/* CTA Section - With Gradient Blob Background */}
      <section className="relative bg-creme-inversa py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
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
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  Da el primer paso
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[0.95] tracking-tight">
                ¿Listo para comenzar<br />
                tu tratamiento?
              </h2>
            </motion.div>

            {/* Right side - CTA content */}
            <motion.div
              className="lg:col-span-5 lg:border-l lg:border-gray-900/10 lg:pl-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8">
                Agenda una consulta con nuestros especialistas y conoce el tratamiento ideal para ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                    Agendar cita
                  </span>
                  <span className="w-12 h-12 rounded-full border border-gray-900/20 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;
