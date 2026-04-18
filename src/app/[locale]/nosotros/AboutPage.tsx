'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { StepRampDivider } from '@/components/ui/step-ramp-divider';
import { timeline, doctors } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const heroRef = useRef<HTMLElement>(null);
  const founder = doctors.find((d) => d.isFounder);

  return (
    <>
      {/* Hero Section - Alba Style with Image */}
      <section
        ref={heroRef}
        className="relative z-20 h-[100svh] min-h-[500px] md:min-h-[600px] w-full overflow-hidden rounded-b-[48px] md:rounded-b-[64px]"
      >
        {/* Background Image */}
        <Image
          src="/images/alba-extracted/fotos-servicios-6.jpg"
          alt="Alba Diálisis - Nosotros"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 xl:px-24 pb-40 md:pb-44 lg:pb-48">
          <h1
            className="font-light leading-[0.95] tracking-tight max-w-[90%] md:max-w-none"
            style={{ color: '#FFFFFF', fontSize: 'clamp(2.25rem, 7vw, 6rem)' }}
          >
            {locale === 'en' ? (
              <>Caring for kidney health<br />in the Bajio region for over <span style={{ color: '#F59F20' }}>25 years</span></>
            ) : (
              <>Cuidando la salud renal<br />en el Bajío desde hace más de <span style={{ color: '#F59F20' }}>25 años</span></>
            )}
          </h1>
        </div>

      </section>

      {/* Mission & Vision Section */}
      <section className="relative z-10 bg-alba-dark pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-12 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.30] blur-3xl"
            style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.22] blur-3xl"
            style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top decorative line with ticks */}
          <motion.div
            className="relative w-full h-px mb-10 md:mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute inset-0 bg-gray-900/20 origin-left" />
            <div className="absolute left-0 top-0 w-px h-3 bg-gray-900/30 -translate-y-1/2" />
            <div className="absolute left-1/4 top-0 w-px h-2 bg-gray-900/15 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-px h-3 bg-gray-900/30 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-3/4 top-0 w-px h-2 bg-gray-900/15 -translate-y-1/2" />
            <div className="absolute right-0 top-0 w-px h-3 bg-gray-900/30 -translate-y-1/2" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  {t('about.mission.title')}
                </span>
              </div>
              <TypingAnimation
                text={t('about.mission.content')}
                duration={20}
                as="p"
                className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed"
              />
            </div>

            {/* Vision */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  {t('about.vision.title')}
                </span>
              </div>
              <TypingAnimation
                text={t('about.vision.content')}
                duration={20}
                delay={5000}
                as="p"
                className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed"
              />
            </div>
          </div>

          {/* Bottom decorative line with ticks */}
          <motion.div
            className="relative w-full h-px mt-8 md:mt-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute inset-0 bg-gray-900/20 origin-right" />
            <div className="absolute left-0 top-0 w-px h-3 bg-gray-900/30 translate-y-1/2" />
            <div className="absolute left-1/4 top-0 w-px h-2 bg-gray-900/15 translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-px h-3 bg-gray-900/30 -translate-x-1/2 translate-y-1/2" />
            <div className="absolute left-3/4 top-0 w-px h-2 bg-gray-900/15 translate-y-1/2" />
            <div className="absolute right-0 top-0 w-px h-3 bg-gray-900/30 translate-y-1/2" />
          </motion.div>
        </div>
      </section>

      {/* Full-width Team Photo Section */}
      <section className="relative bg-alba-dark pt-6 md:pt-8 pb-16 md:pb-20 lg:pb-24 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                Nuestro Equipo
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 max-w-2xl tracking-tight">
              Más de 50 profesionales dedicados a tu bienestar
            </h2>
          </motion.div>

          {/* Team photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="relative w-full aspect-[12/5] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/equipo-alba.jpg"
              alt="Equipo Alba Diálisis"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Step divider - cream to dark */}
        <StepRampDivider
          color="#2B3A42"
          height={100}
          className="absolute bottom-0 left-0 right-0 translate-y-[99px]"
        />
      </section>

      {/* Founder Section - Full Background Hero Image */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={founder?.heroImage || founder?.image || '/doctors/founder.jpg'}
            alt={founder?.name || 'Founder'}
            fill
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full min-h-[80vh] md:min-h-[90vh] flex items-center px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-2xl py-20 md:py-28">
            {/* Section label */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                {t('about.founder.title')}
              </span>
            </motion.div>

            {/* Name - Large and confident */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1] mb-4 tracking-tight"
              style={{ color: '#FFFFFF' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
            >
              {t('about.founder.name')}
            </motion.h2>

            {/* Role */}
            <motion.p
              className="text-white/70 text-lg md:text-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              {t('about.founder.role')}
            </motion.p>

            {/* Bio - The main content */}
            <motion.p
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            >
              {t('about.founder.bio')}
            </motion.p>

            {/* Simple CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
            >
              <Link
                href={`/directorio/${founder?.slug || 'maria-gutierrez-navarro'}`}
                className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-white hover:text-alba-primary transition-colors group"
              >
                Ver perfil completo
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Typography focused with grid */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.25] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                Lo que nos define
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
              {t('about.values.title')}
            </h2>
          </motion.div>

          {/* Values Grid - Typography only */}
          <div className="border border-gray-900/10">
            <div className="grid grid-cols-2 lg:grid-cols-5">
              {['compassion', 'excellence', 'integrity', 'innovation', 'balance'].map((key, index) => (
                <motion.div
                  key={key}
                  className={`flex flex-col justify-between p-6 md:p-8 lg:p-10 min-h-[200px] md:min-h-[240px] ${
                    index < 4 ? 'lg:border-r border-gray-900/10' : ''
                  } ${index % 2 === 0 ? 'border-r border-gray-900/10 lg:border-r' : 'lg:border-r'} ${
                    index < 3 ? 'border-b border-gray-900/10 lg:border-b-0' : ''
                  } ${index === 3 ? 'border-b border-gray-900/10 lg:border-b-0' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.77, 0, 0.175, 1] }}
                >
                  {/* Number */}
                  <span className="text-xs text-gray-400 font-medium">
                    0{index + 1}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 mb-2">
                      {t(`about.values.${key}`)}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t(`about.values.${key}Description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Clean minimal design with horizontal lines */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Gradient blobs */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.22] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.22] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F59F20 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4DBDC9 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                Nuestra trayectoria
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light !text-gray-900 tracking-tight">
              {t('about.timeline.title')}
            </h2>
          </motion.div>

          {/* Top horizontal line with ticks */}
          <motion.div
            className="relative w-full h-px mb-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute inset-0 bg-black/20 origin-left" />
            <div className="absolute left-0 top-0 w-px h-3 bg-black/30 origin-center -translate-y-1/2" />
            <div className="absolute left-1/4 top-0 w-px h-2 bg-black/15 origin-center -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-px h-3 bg-black/30 origin-center -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-3/4 top-0 w-px h-2 bg-black/15 origin-center -translate-y-1/2" />
            <div className="absolute right-0 top-0 w-px h-3 bg-black/30 origin-center -translate-y-1/2" />
          </motion.div>

          {/* Timeline - Simple and elegant */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2" />

            {timeline.map((item, index) => (
              <div key={item.year}>
                <motion.div
                  className={`relative flex items-start mb-12 md:mb-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.77, 0, 0.175, 1] }}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    {/* Year */}
                    <span className="inline-block text-6xl md:text-7xl lg:text-8xl font-bold text-alba-primary mb-4 leading-none">
                      {item.year}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-medium !text-gray-900 mb-3">
                      {t(item.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className={`text-gray-900/50 leading-relaxed max-w-md ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {t(item.descriptionKey)}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4">
                    <div className="w-3 h-3 bg-alba-primary rounded-full" />
                  </div>

                  {/* Empty space */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>

                {/* Horizontal divider line between timeline items */}
                {index < timeline.length - 1 && (
                  <motion.div
                    className="relative w-full h-px mb-12 md:mb-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  >
                    <div className={`absolute inset-0 bg-black/10 ${index % 2 === 0 ? 'origin-left' : 'origin-right'}`} />
                    <div className="absolute left-0 top-0 w-px h-2 bg-black/20 origin-center -translate-y-1/2" />
                    <div className="absolute left-1/2 top-0 w-px h-2 bg-black/20 origin-center -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute right-0 top-0 w-px h-2 bg-black/20 origin-center -translate-y-1/2" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom horizontal line with ticks */}
          <motion.div
            className="relative w-full h-px mt-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute inset-0 bg-black/20 origin-right" />
            <div className="absolute left-0 top-0 w-px h-3 bg-black/30 origin-center translate-y-1/2" />
            <div className="absolute left-1/4 top-0 w-px h-2 bg-black/15 origin-center translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-px h-3 bg-black/30 origin-center -translate-x-1/2 translate-y-1/2" />
            <div className="absolute left-3/4 top-0 w-px h-2 bg-black/15 origin-center translate-y-1/2" />
            <div className="absolute right-0 top-0 w-px h-3 bg-black/30 origin-center translate-y-1/2" />
          </motion.div>
        </div>
      </section>

      {/* Team Preview Section - Asymmetrical Editorial Grid */}
      <section className="bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header - Asymmetric with CTA on right */}
          <div className="grid lg:grid-cols-12 gap-8 mb-12 md:mb-16">
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  Equipo médico
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
                Profesionales comprometidos
              </h2>
            </motion.div>
            <motion.div
              className="lg:col-span-4 lg:flex lg:items-end lg:justify-end"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
            >
              <AnimatedButton href="/directorio" variant="outline">
                Ver directorio completo
              </AnimatedButton>
            </motion.div>
          </div>

          {/* Asymmetrical Grid - Editorial Magazine Style */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large featured doctor - spans 6 cols, full height */}
            <motion.div
              className="col-span-12 md:col-span-6 row-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            >
              <Link href={`/directorio/${doctors[0]?.slug}`} className="group block h-full">
                <div className="relative h-full min-h-[400px] md:min-h-[500px] overflow-hidden">
                  <Image
                    src={doctors[0]?.image || ''}
                    alt={doctors[0]?.name || ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-medium mb-1" style={{ color: '#ffffff' }}>
                      {doctors[0]?.name}
                    </h3>
                    <p className="text-sm text-white/70">
                      {t(doctors[0]?.roleKey || '')}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Top right - medium */}
            <motion.div
              className="col-span-6 md:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
            >
              <Link href={`/directorio/${doctors[1]?.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={doctors[1]?.image || ''}
                    alt={doctors[1]?.name || ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {doctors[1]?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {t(doctors[1]?.roleKey || '')}
                </p>
              </Link>
            </motion.div>

            {/* Top far right - medium */}
            <motion.div
              className="col-span-6 md:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <Link href={`/directorio/${doctors[2]?.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={doctors[2]?.image || ''}
                    alt={doctors[2]?.name || ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {doctors[2]?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {t(doctors[2]?.roleKey || '')}
                </p>
              </Link>
            </motion.div>

            {/* Bottom right - horizontal card with text */}
            <motion.div
              className="col-span-12 md:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            >
              <Link href={`/directorio/${doctors[3]?.slug}`} className="group block">
                <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 border border-gray-900/10 hover:border-gray-900/20 transition-colors">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden">
                    <Image
                      src={doctors[3]?.image || ''}
                      alt={doctors[3]?.name || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                      {doctors[3]?.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {t(doctors[3]?.roleKey || '')}
                    </p>
                    <span className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
                      Ver perfil →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Asymmetrical Dark */}
      <section className="relative bg-alba-dark py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-30 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top decorative line */}
          <motion.div
            className="relative w-full h-px mb-16 md:mb-20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute inset-0 bg-black/20 origin-left" />
            <div className="absolute left-0 top-0 w-px h-3 bg-black/30 -translate-y-1/2" />
            <div className="absolute left-1/3 top-0 w-px h-2 bg-black/15 -translate-y-1/2" />
            <div className="absolute right-0 top-0 w-px h-3 bg-black/30 -translate-y-1/2" />
          </motion.div>

          {/* Asymmetrical grid layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left side - Large headline (takes 7 cols) */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-alba-primary" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-alba-primary">
                  Próximo paso
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light !text-gray-900 leading-[0.95] tracking-tight">
                Sé parte de<br />
                <span className="text-alba-primary">nuestra historia</span>
              </h2>
            </motion.div>

            {/* Right side - CTA content (takes 5 cols) */}
            <motion.div
              className="lg:col-span-5 lg:border-l lg:border-black/10 lg:pl-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <p className="text-gray-900/60 text-lg md:text-xl leading-relaxed mb-8">
                Conoce nuestras instalaciones y al equipo que cuidará de tu salud renal.
              </p>
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-gray-900 group-hover:text-alba-primary transition-colors duration-300">
                  Agenda una visita
                </span>
                <span className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:border-alba-primary group-hover:bg-alba-primary transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-gray-900 group-hover:text-black transition-colors duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom decorative element - asymmetric */}
          <motion.div
            className="mt-16 md:mt-24 flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" />
            <span className="text-gray-900/30 text-xs uppercase tracking-[0.3em]">
              Alba Diálisis
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
