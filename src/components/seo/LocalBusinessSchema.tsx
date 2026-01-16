import { branches, type Branch } from '@/lib/data';

interface LocalBusinessSchemaProps {
  locale: string;
}

function generateBranchSchema(branch: Branch, locale: string) {
  const isSpanish = locale === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `https://albadialisis.com/${locale}/sucursales/${branch.slug}#localbusiness`,
    name: branch.name,
    description: isSpanish
      ? `Unidad de dialisis y nefrologia ${branch.name}. Servicios de hemodialisis, hemodiafiltracion y atencion nefrologica especializada.`
      : `Dialysis and nephrology unit ${branch.name}. Hemodialysis, hemodiafiltration and specialized nephrology care services.`,
    url: `https://albadialisis.com/${locale}/sucursales/${branch.slug}`,
    image: branch.image,
    telephone: branch.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address.split(',')[0],
      addressLocality: branch.address.includes('Dolores Hidalgo')
        ? 'Dolores Hidalgo'
        : 'Leon',
      addressRegion: 'Guanajuato',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: branch.coordinates.lat,
      longitude: branch.coordinates.lng,
    },
    parentOrganization: {
      '@type': 'MedicalBusiness',
      '@id': 'https://albadialisis.com/#organization',
      name: 'Alba Dialisis y Trasplantes',
    },
    medicalSpecialty: [
      'Nephrology',
      'Dialysis',
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: isSpanish ? 'Hemodialisis' : 'Hemodialysis',
        procedureType: 'TherapeuticProcedure',
      },
      {
        '@type': 'MedicalProcedure',
        name: isSpanish ? 'Hemodiafiltracion' : 'Hemodiafiltration',
        procedureType: 'TherapeuticProcedure',
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '06:00',
      closes: '22:00',
    },
    isAcceptingNewPatients: true,
    priceRange: '$$',
    currenciesAccepted: 'MXN',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
  };
}

export function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const branchesSchema = branches.map((branch) =>
    generateBranchSchema(branch, locale)
  );

  return (
    <>
      {branchesSchema.map((schema, index) => (
        <script
          key={`branch-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

export default LocalBusinessSchema;
