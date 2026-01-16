interface WebsiteSchemaProps {
  locale: string;
}

export function WebsiteSchema({ locale }: WebsiteSchemaProps) {
  const isSpanish = locale === 'es';

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://albadialisis.com/#website',
    url: 'https://albadialisis.com',
    name: 'Alba Dialisis y Trasplantes',
    alternateName: 'Alba Dialysis and Transplants',
    description: isSpanish
      ? 'Sitio web oficial de Alba Dialisis y Trasplantes - Clinica de nefrologia en Leon, Guanajuato'
      : 'Official website of Alba Dialysis and Transplants - Nephrology clinic in Leon, Guanajuato',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://albadialisis.com/#organization',
    },
    inLanguage: [
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://albadialisis.com/${locale}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData),
      }}
    />
  );
}

export default WebsiteSchema;
