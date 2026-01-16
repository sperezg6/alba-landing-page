import { MetadataRoute } from 'next';
import { doctors, branches } from '@/lib/data';

const BASE_URL = 'https://albadialisis.com';
const locales = ['es', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Main pages for both locales
  const mainPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/nosotros', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/directorio', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/sucursales', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/recursos', priority: 0.6, changeFrequency: 'weekly' as const },
  ];

  // Generate main page entries for each locale
  const mainPageEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    mainPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          es: `${BASE_URL}/es${page.path}`,
          en: `${BASE_URL}/en${page.path}`,
        },
      },
    }))
  );

  // Generate doctor profile page entries for each locale
  const doctorPageEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    doctors.map((doctor) => ({
      url: `${BASE_URL}/${locale}/directorio/${doctor.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/directorio/${doctor.slug}`,
          en: `${BASE_URL}/en/directorio/${doctor.slug}`,
        },
      },
    }))
  );

  // Generate branch page entries for each locale (if branch pages exist)
  const branchPageEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    branches.map((branch) => ({
      url: `${BASE_URL}/${locale}/sucursales/${branch.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/sucursales/${branch.slug}`,
          en: `${BASE_URL}/en/sucursales/${branch.slug}`,
        },
      },
    }))
  );

  return [...mainPageEntries, ...doctorPageEntries, ...branchPageEntries];
}
