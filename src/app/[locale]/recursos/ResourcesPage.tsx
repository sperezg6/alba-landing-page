'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  FileText,
  Video,
  Download,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ResourcesHeroSection from '@/components/ui/resources-hero-section';

const tips = [
  {
    id: 'diet',
    number: '01',
    titleKey: 'resources.tips.diet.title',
    descriptionKey: 'resources.tips.diet.description',
  },
  {
    id: 'exercise',
    number: '02',
    titleKey: 'resources.tips.exercise.title',
    descriptionKey: 'resources.tips.exercise.description',
  },
  {
    id: 'medications',
    number: '03',
    titleKey: 'resources.tips.medications.title',
    descriptionKey: 'resources.tips.medications.description',
  },
  {
    id: 'emotional',
    number: '04',
    titleKey: 'resources.tips.emotional.title',
    descriptionKey: 'resources.tips.emotional.description',
  },
];

const faqs = [
  { qKey: 'resources.faq.q1', aKey: 'resources.faq.a1' },
  { qKey: 'resources.faq.q2', aKey: 'resources.faq.a2' },
  { qKey: 'resources.faq.q3', aKey: 'resources.faq.a3' },
  { qKey: 'resources.faq.q4', aKey: 'resources.faq.a4' },
  { qKey: 'resources.faq.q5', aKey: 'resources.faq.a5' },
];

const resources = [
  {
    type: 'guide',
    icon: FileText,
    title: 'Guía del Paciente',
    description: 'Todo lo que necesitas saber sobre tu tratamiento de diálisis.',
    status: 'available',
  },
  {
    type: 'video',
    icon: Video,
    title: 'Videos Educativos',
    description: 'Aprende sobre el cuidado renal con nuestros videos.',
    status: 'coming',
  },
  {
    type: 'download',
    icon: Download,
    title: 'Documentos',
    description: 'Formatos y guías descargables para imprimir.',
    status: 'coming',
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-900/10 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg md:text-xl font-light text-gray-900 pr-8 group-hover:text-gray-600 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pb-6">
              <p className="text-gray-500 leading-relaxed max-w-3xl">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ResourcesPage() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section - Animated */}
      <ResourcesHeroSection />

      {/* Nutritional Chatbot Feature Section */}
      <section className="relative bg-alba-dark py-20 md:py-32 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-alba-primary/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-alba-primary animate-pulse" />
                <span className="text-sm font-medium text-alba-primary uppercase tracking-wider">
                  Nueva Herramienta
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-6" style={{ color: 'white' }}>
                Asistente de{' '}
                <span className="text-alba-primary">Nutrición Renal</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
                Obtén respuestas personalizadas sobre tu dieta renal. Nuestro asistente inteligente
                te ayuda a entender qué alimentos puedes consumir, cómo controlar el potasio,
                fósforo y sodio, y resolver tus dudas nutricionales al instante.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://nutritional-chatbot-ui.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-alba-primary hover:bg-alba-primary-dark text-black px-10 py-5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-alba-primary/30"
                >
                  Probar Asistente
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Right - Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#1A1A1A] border border-alba-primary/20 p-8 md:p-10 rounded-lg">
                <div className="w-16 h-16 bg-alba-primary flex items-center justify-center mb-6 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-light mb-6" style={{ color: 'white' }}>
                  Preguntas que puedes hacer
                </h3>
                <ul className="space-y-4">
                  {[
                    '¿Qué alimentos debo evitar?',
                    '¿Cómo controlar el potasio?',
                    '¿Qué puedo desayunar?',
                    '¿Cuánta agua puedo tomar?',
                  ].map((question, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-300 group cursor-default">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-alba-primary/10 text-xs text-alba-primary font-medium">
                        {idx + 1}
                      </span>
                      <span className="group-hover:text-white transition-colors">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-alba-primary/50 to-transparent" />
      </section>

      {/* Health Tips Section */}
      <section className="bg-creme-inversa py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Consejos de Salud
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 max-w-2xl">
              Información práctica para el día a día
            </h2>
          </div>

          {/* Tips Grid */}
          <div className="border border-gray-900/10">
            <div className="grid md:grid-cols-2">
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative p-8 md:p-10 ${
                    index % 2 === 0 ? 'md:border-r border-gray-900/10' : ''
                  } ${index < 2 ? 'border-b border-gray-900/10' : ''}`}
                >
                  {/* Number */}
                  <span className="text-xs font-medium text-gray-400 tracking-wider mb-6 block">
                    {tip.number}
                  </span>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3">
                    {t(tip.titleKey)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(tip.descriptionKey)}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Header */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Preguntas Frecuentes
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6">
                {t('resources.faq.title')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Resolvemos las dudas más comunes sobre el tratamiento de diálisis y el cuidado renal.
              </p>

              {/* Contact CTA */}
              <div className="p-6 bg-gray-50 border border-gray-100">
                <p className="text-gray-600 mb-4">
                  ¿No encuentras tu pregunta?
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-300"
                >
                  Contáctanos directamente
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column - FAQs */}
            <div className="border-t border-gray-900/10">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={t(faq.qKey)}
                  answer={t(faq.aKey)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="bg-creme-inversa py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Materiales
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 max-w-2xl">
              Recursos adicionales
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Material educativo para pacientes y familiares
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-3 gap-px bg-gray-900/10 border border-gray-900/10">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-creme-inversa p-8 md:p-10 group"
              >
                <div className="w-14 h-14 border border-gray-900/10 flex items-center justify-center mb-6">
                  <resource.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {resource.description}
                </p>
                {resource.status === 'available' ? (
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:gap-3 transition-all duration-300"
                  >
                    Solicitar
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                    Próximamente
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-alba-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: 'white' }}>
              ¿Necesitas más información?
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Nuestro equipo está disponible para resolver todas tus dudas sobre el cuidado renal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-alba-primary hover:bg-alba-primary-dark text-black px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Contáctanos
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:4773293939"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Llamar ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ResourcesPage;
