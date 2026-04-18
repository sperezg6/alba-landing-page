'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Mail, ArrowUpRight, Award, Calendar } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { doctors, branches } from '@/lib/data';
import { usePostHog } from 'posthog-js/react';

export function DirectoryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const posthog = usePostHog();

  return (
    <>
      {/* Hero Section - Minimal Dark */}
      <section className="relative bg-alba-dark pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px] opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-sm font-medium text-black/50 uppercase tracking-wider">
                {t('doctors.title')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-alba-text">
              {locale === 'en' ? (
                <>Specialists committed to your <span style={{ color: '#F59F20' }}>health</span></>
              ) : (
                <>Especialistas comprometidos con tu <span style={{ color: '#F59F20' }}>salud</span></>
              )}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="bg-alba-dark py-20 md:py-28 relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-25 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-2 h-2 rounded-full bg-gray-900" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Especialistas
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-gray-900/10 border border-gray-900/10 rounded-2xl overflow-hidden">
            {doctors.map((doctor, index) => {
              const doctorBranches = doctor.branches
                .map((branchId) => branches.find((b) => b.id === branchId)?.name)
                .filter(Boolean);

              return (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-alba-dark group"
                >
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full lg:w-2/5 aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-auto lg:min-h-[320px]">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover object-[center_20%] transition-all duration-500"
                      />
                      {/* Founder badge */}
                      {doctor.isFounder && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alba-primary text-black text-xs font-semibold uppercase tracking-wider rounded-md">
                            <Award className="w-3.5 h-3.5" />
                            {t('doctors.founder')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 lg:p-10 flex flex-col">
                      {/* Number */}
                      <span className="text-xs font-medium text-gray-400 tracking-wider mb-4">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Name & Role */}
                      <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 mb-4">
                        {t(doctor.roleKey)}
                      </p>

                      {/* Branches */}
                      <div className="flex items-start gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500">
                          {doctorBranches.join(' · ')}
                        </span>
                      </div>

                      {/* Specialties */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {(locale === 'en' ? doctor.specialtiesEn : doctor.specialties).map(
                            (specialty, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 border border-gray-900/10 text-gray-600 text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Bio Preview */}
                      <p className="text-sm text-gray-500 line-clamp-3 flex-grow leading-relaxed">
                        {locale === 'en' ? doctor.bioEn : doctor.bio}
                      </p>

                      {/* Actions */}
                      <div className="mt-6 pt-6 border-t border-gray-900/10 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/directorio/${doctor.slug}#agendar`}
                          className="inline-flex items-center gap-2 bg-alba-primary hover:bg-alba-primary-dark text-black px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors rounded-lg"
                          onClick={() => posthog.capture('agende_cita_clicked', {
                            doctor_name: doctor.name,
                            doctor_slug: doctor.slug,
                            source: 'directory_page',
                          })}
                        >
                          <Calendar className="w-4 h-4" />
                          Agende Cita
                        </Link>
                        <Link
                          href={`/directorio/${doctor.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:gap-3 transition-all duration-300"
                          onClick={() => posthog.capture('view_profile_clicked', {
                            doctor_name: doctor.name,
                            doctor_slug: doctor.slug,
                          })}
                        >
                          {t('doctors.viewProfile')}
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <a
                          href={`mailto:${doctor.email}`}
                          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-alba-dark py-20 md:py-28 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-32 w-[500px] h-[500px] opacity-30 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-alba-text">
              Encuentra al especialista ideal para ti
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-black/60">
              Nuestro equipo está listo para brindarte la mejor atención médica personalizada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-alba-primary hover:bg-alba-primary-dark text-black px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors rounded-xl"
                onClick={() => posthog.capture('agende_cita_clicked', {
                  source: 'directory_cta_section',
                })}
              >
                Agenda tu consulta
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:4773293939"
                className="inline-flex items-center gap-2 border border-black/20 text-gray-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-black/10 transition-colors rounded-xl"
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

export default DirectoryPage;
