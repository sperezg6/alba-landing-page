import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { doctors } from '@/lib/data';
import { getCalComConfig } from '@/lib/scheduling/types';
import { DoctorProfilePage } from './DoctorProfilePage';

export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return {
      title: 'Doctor no encontrado',
    };
  }

  return {
    title: doctor.name,
    description: doctor.bio,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  // Get Cal.com config server-side (secure - not exposed to client bundle)
  const calConfig = getCalComConfig(doctor.slug) || {
    username: 'alba-clinica',
    eventSlug: '30min'
  };

  return <DoctorProfilePage doctor={doctor} calConfig={calConfig} />;
}
