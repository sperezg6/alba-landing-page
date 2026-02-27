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
  Droplets,
  Clock,
  Heart,
  Shield,
  Users,
  Activity,
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

// Educational content about hemodialysis
const hemodialysisProcess = [
  {
    step: '01',
    title: 'Acceso vascular',
    description: 'Se conecta tu brazo al equipo de diálisis a través de tu acceso vascular (fístula, injerto o catéter).',
    icon: Activity,
  },
  {
    step: '02',
    title: 'Filtrado de sangre',
    description: 'Tu sangre pasa por el dializador, un filtro que elimina toxinas y exceso de líquidos.',
    icon: Droplets,
  },
  {
    step: '03',
    title: 'Monitoreo continuo',
    description: 'El equipo médico supervisa constantemente tu presión, pulso y el funcionamiento del equipo.',
    icon: Shield,
  },
  {
    step: '04',
    title: 'Retorno seguro',
    description: 'La sangre limpia regresa a tu cuerpo. Al terminar, descansas brevemente antes de irte.',
    icon: Heart,
  },
];

const kidneyFacts = [
  {
    title: '¿Qué hacen los riñones?',
    description: 'Filtran aproximadamente 180 litros de sangre al día, eliminando toxinas y regulando líquidos, electrolitos y presión arterial.',
  },
  {
    title: '¿Cuándo se necesita diálisis?',
    description: 'Cuando los riñones funcionan a menos del 10-15% de su capacidad normal (enfermedad renal etapa 5 o terminal).',
  },
  {
    title: '¿Es permanente?',
    description: 'Puede ser temporal o permanente. Muchos pacientes están en lista de espera para trasplante, que puede eliminar la necesidad de diálisis.',
  },
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
        {/* Decorative gradient blob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -right-32 w-[450px] h-[450px] opacity-25 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-6" style={{ color: '#374151' }}>
                Asistente de{' '}
                <span className="text-alba-primary">Nutrición Renal</span>
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
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
              <div className="bg-black/5 border border-gray-900/10 p-8 md:p-10 rounded-lg">
                <div className="w-16 h-16 bg-alba-primary flex items-center justify-center mb-6 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-light mb-6" style={{ color: '#374151' }}>
                  Preguntas que puedes hacer
                </h3>
                <ul className="space-y-4">
                  {[
                    '¿Qué alimentos debo evitar?',
                    '¿Cómo controlar el potasio?',
                    '¿Qué puedo desayunar?',
                    '¿Cuánta agua puedo tomar?',
                  ].map((question, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-600 group cursor-default">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-alba-primary/10 text-xs text-alba-primary font-medium">
                        {idx + 1}
                      </span>
                      <span className="group-hover:text-gray-900 transition-colors">{question}</span>
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

      {/* Understanding Hemodialysis - Educational Section */}
      <section className="bg-alba-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-sm font-medium text-alba-primary uppercase tracking-wider">
                Entendiendo el Tratamiento
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 max-w-3xl mb-6">
              ¿Cómo funciona la hemodiálisis?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
              La hemodiálisis es un tratamiento que realiza la función de filtrado que tus riñones
              ya no pueden hacer. Conocer el proceso te ayudará a sentirte más seguro y tranquilo.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 mb-16 lg:mb-20">
            {hemodialysisProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-alba-dark p-6 lg:p-8"
              >
                <div className="w-12 h-12 rounded-full bg-alba-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-alba-primary" />
                </div>
                <span className="text-xs font-medium text-gray-400 tracking-wider block mb-3">
                  Paso {item.step}
                </span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick Facts */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Lo que debes saber
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Información esencial para pacientes y familias que comienzan este camino.
              </p>
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
              {kidneyFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-alba-primary pl-6"
                >
                  <h4 className="font-medium text-gray-900 mb-2">{fact.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{fact.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Session Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid sm:grid-cols-3 gap-6"
          >
            <div className="bg-gray-50 p-6 text-center">
              <Clock className="w-8 h-8 text-alba-primary mx-auto mb-4" />
              <span className="text-3xl font-light text-gray-900 block">3-4 hrs</span>
              <span className="text-sm text-gray-500">por sesión</span>
            </div>
            <div className="bg-gray-50 p-6 text-center">
              <Activity className="w-8 h-8 text-alba-primary mx-auto mb-4" />
              <span className="text-3xl font-light text-gray-900 block">3 veces</span>
              <span className="text-sm text-gray-500">por semana</span>
            </div>
            <div className="bg-gray-50 p-6 text-center">
              <Users className="w-8 h-8 text-alba-primary mx-auto mb-4" />
              <span className="text-3xl font-light text-gray-900 block">24/7</span>
              <span className="text-sm text-gray-500">equipo de apoyo</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="bg-alba-dark py-20 md:py-28">
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
      <section className="bg-alba-dark py-20 md:py-28">
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
      <section className="bg-alba-dark py-20 md:py-28">
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
                className="bg-alba-dark p-8 md:p-10 group"
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
      <section className="relative bg-alba-dark py-20 md:py-28 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-30 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: '#374151' }}>
              ¿Necesitas más información?
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(55,65,81,0.6)' }}>
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
                className="inline-flex items-center gap-2 border border-black/20 text-gray-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-black/10 transition-colors"
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
