import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Nunito_Sans, Cardo } from 'next/font/google';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Navigation, Footer, WhatsAppButton } from '@/components/layout';
import { FloatingChatWidget } from '@/components/chat/FloatingChatWidget';
import { SmoothScrollProvider, GSAPProvider, PostHogProvider } from '@/providers';
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebsiteSchema,
  HrefLangLinks,
} from '@/components/seo';
import '../globals.css';

const BASE_URL = 'https://albadialisis.com';

// Body font - clean, readable Gotham alternative
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Heading font - elegant serif for titles
const cardo = Cardo({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '700'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    es: 'Alba Dialisis y Trasplantes | Clinica de Nefrologia en León, Guanajuato',
    en: 'Alba Dialysis and Transplants | Nephrology Clinic in León, Guanajuato',
  };

  const descriptions = {
    es: 'Expertos en hemodialisis, hemodiafiltracion y trasplante renal. Mas de 25 anos de experiencia cuidando la salud renal de nuestros pacientes en León, Guanajuato.',
    en: 'Experts in hemodialysis, hemodiafiltration and kidney transplant. Over 25 years of experience caring for our patients kidney health in León, Guanajuato.',
  };

  const title = titles[locale as keyof typeof titles] || titles.es;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.es;

  return {
    title: {
      default: title,
      template: '%s | Alba Dialisis y Trasplantes',
    },
    description,
    keywords: [
      'dialisis',
      'hemodialisis',
      'hemodiafiltracion',
      'nefrologia',
      'trasplante renal',
      'enfermedad renal cronica',
      'clinica de dialisis',
      'nefrologo',
      'León',
      'Guanajuato',
      'Mexico',
      'Alba Dialisis',
    ],
    authors: [{ name: 'Alba Dialisis y Trasplantes', url: BASE_URL }],
    creator: 'Alba Dialisis y Trasplantes',
    publisher: 'Alba Dialisis y Trasplantes',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
        'x-default': '/es',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.png', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
    // Robots metadata
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Complete Open Graph tags
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: 'Alba Dialisis y Trasplantes',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_MX',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/equipo-alba.jpg`,
          width: 1200,
          height: 630,
          alt: locale === 'es'
            ? 'Equipo medico de Alba Dialisis y Trasplantes'
            : 'Medical team of Alba Dialysis and Transplants',
        },
        {
          url: `${BASE_URL}/logo-alba.png`,
          width: 512,
          height: 512,
          alt: 'Logo Alba Dialisis y Trasplantes',
        },
      ],
    },
    // Twitter Card tags
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/images/equipo-alba.jpg`],
      creator: '@albadialisis',
      site: '@albadialisis',
    },
    // Verification - configure via environment variables
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
      // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || undefined,
    },
    // Category
    category: 'healthcare',
    // Other metadata
    other: {
      'geo.region': 'MX-GUA',
      'geo.placename': 'León, Guanajuato',
      'geo.position': '21.1236;-101.6822',
      'ICBM': '21.1236, -101.6822',
      'theme-color': '#4DBDC9',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${nunitoSans.variable} ${cardo.variable}`}>
      <head>
        {/* HrefLang Links for multilingual SEO */}
        <HrefLangLinks locale={locale} pathname={`/${locale}`} />

        {/* JSON-LD Structured Data */}
        <OrganizationSchema locale={locale} />
        <LocalBusinessSchema locale={locale} />
        <WebsiteSchema locale={locale} />
      </head>
      <body className="antialiased">
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            <SmoothScrollProvider>
              <GSAPProvider>
              {/* Skip Links for Accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
              >
                {locale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
              </a>
              <a
                href="#contact"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
              >
                {locale === 'es' ? 'Ir a contacto' : 'Go to contact'}
              </a>
              <Navigation />
              <main id="main-content" className="min-h-screen">{children}</main>
              <Footer />
              <WhatsAppButton />
              <FloatingChatWidget />
            </GSAPProvider>
            </SmoothScrollProvider>
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
