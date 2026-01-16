import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ServicesPage } from './ServicesPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPage />;
}
