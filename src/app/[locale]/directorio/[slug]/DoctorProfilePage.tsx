'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { branches, type Doctor } from '@/lib/data';
import { CalComBooking } from '@/components/scheduling';
import { DOCTOR_CALCOM_CONFIG } from '@/lib/scheduling/types';

interface DoctorProfilePageProps {
  doctor: Doctor;
}

// Get Cal.com config for a doctor
function getCalComConfig(slug: string) {
  return DOCTOR_CALCOM_CONFIG[slug] || { username: 'alba-clinica' };
}

export function DoctorProfilePage({ doctor }: DoctorProfilePageProps) {
  const t = useTranslations();
  const locale = useLocale();

  const doctorBranches = doctor.branches
    .map((branchId) => branches.find((b) => b.id === branchId))
    .filter(Boolean);

  // Get Cal.com config for this doctor
  const calConfig = getCalComConfig(doctor.slug);

  // Check if doctor has a hero image for full-width background
  const hasHeroImage = !!doctor.heroImage;

  return (
    <div className="min-h-screen bg-alba-cream">
      {/* Hero Section - Full background when heroImage exists */}
      <section className="relative bg-alba-dark overflow-hidden pt-24 md:pt-28">
        {/* Background Hero Image */}
        {hasHeroImage && (
          <div className="absolute inset-0">
            <Image
              src={doctor.heroImage!}
              alt={doctor.name}
              fill
              className="object-cover"
              style={{ objectPosition: 'center 20%' }}
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-alba-dark/95 via-alba-dark/80 to-alba-dark/40" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <Link
              href="/directorio"
              className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.6)] hover:text-[#FFFFFF] transition-colors text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al directorio</span>
            </Link>
          </motion.div>

          <div className={`grid ${hasHeroImage ? 'lg:grid-cols-1 max-w-2xl' : 'lg:grid-cols-2'} gap-12 lg:gap-20 items-end`}>
            {/* Doctor Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={hasHeroImage ? 'min-h-[400px] flex flex-col justify-end pb-8' : ''}
            >
              {doctor.isFounder && (
                <span className="inline-block text-xs uppercase tracking-widest text-alba-primary mb-4">
                  {t('doctors.founder')}
                </span>
              )}

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                {doctor.name}
              </h1>

              <p
                className="mt-4 text-lg"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                {t(doctor.roleKey)}
              </p>

              {/* Locations */}
              <div className="mt-8 flex flex-wrap gap-2">
                {doctorBranches.map((branch) => (
                  <span
                    key={branch!.id}
                    className="inline-flex items-center gap-1.5 text-sm"
                    style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {branch!.name}
                  </span>
                ))}
              </div>

              {/* Contact & Cedula */}
              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${doctor.email}`}
                  className="inline-flex items-center gap-2 text-sm text-alba-primary hover:text-alba-primary-light transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {doctor.email}
                </a>
                {doctor.cedula && (
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    Cédula Profesional: {doctor.cedula}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Doctor Image - Only show when no hero image */}
            {!hasHeroImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] max-w-md ml-auto">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="space-y-16">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-widest text-alba-primary mb-6">
                Acerca de
              </h2>
              <p className="text-lg md:text-xl text-alba-text leading-relaxed">
                {locale === 'en' ? doctor.bioEn : doctor.bio}
              </p>
            </motion.div>

            {/* Divider */}
            <div className="w-16 h-px bg-alba-dark/10" />

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-widest text-alba-primary mb-6">
                {t('doctors.specialties')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {(locale === 'en' ? doctor.specialtiesEn : doctor.specialties).map(
                  (specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-alba-dark text-[#FFFFFF] text-sm"
                    >
                      {specialty}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="w-16 h-px bg-alba-dark/10" />

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-widest text-alba-primary mb-6">
                {t('doctors.education')}
              </h2>
              <ul className="space-y-4">
                {(locale === 'en' ? doctor.educationEn : doctor.education).map(
                  (edu, index) => (
                    <li
                      key={index}
                      className="text-alba-text pl-4 border-l-2 border-alba-primary/30"
                    >
                      {edu}
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          </div>
      </section>

      {/* Booking Calendar Section - Full Width */}
      <section id="agendar" className="bg-alba-dark">
        <div className="w-full">
          <CalComBooking
            calUsername={calConfig.username}
            doctorName={doctor.name}
            eventSlug={calConfig.eventSlug}
          />
        </div>
      </section>
    </div>
  );
}

export default DoctorProfilePage;
