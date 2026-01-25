import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { servicesData, getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data';
import { ServiceDetailPage } from './ServiceDetailPage';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: locale === 'en' ? 'Service not found' : 'Servicio no encontrado',
    };
  }

  return {
    title: locale === 'en' ? service.titleEn : service.title,
    description: locale === 'en' ? service.shortDescriptionEn : service.shortDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
