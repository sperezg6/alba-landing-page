import { branches, doctors } from '@/lib/data';

interface OrganizationSchemaProps {
  locale: string;
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const isSpanish = locale === 'es';

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://albadialisis.com/#organization',
    name: 'Alba Dialisis y Trasplantes',
    alternateName: 'Alba Dialysis and Transplants',
    description: isSpanish
      ? 'Clinica especializada en nefrologia, hemodialisis, hemodiafiltracion y trasplante renal en León, Guanajuato, Mexico. Mas de 25 anos de experiencia.'
      : 'Clinic specializing in nephrology, hemodialysis, hemodiafiltration and kidney transplant in León, Guanajuato, Mexico. Over 25 years of experience.',
    url: 'https://albadialisis.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://albadialisis.com/logo-alba.png',
      width: 512,
      height: 512,
    },
    image: 'https://albadialisis.com/images/equipo-alba.jpg',
    telephone: '+52 477 329 3939',
    email: 'contacto@albadialisis.com',
    foundingDate: '2014',
    founder: {
      '@type': 'Person',
      name: 'Dra. Maria de Jesus Gutierrez Navarro',
      jobTitle: isSpanish ? 'Nefrologa Fundadora' : 'Founding Nephrologist',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Melchor Ocampo 122, Col. Centro',
      addressLocality: 'León',
      addressRegion: 'Guanajuato',
      postalCode: '37000',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.1236,
      longitude: -101.6822,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'León',
        containedInPlace: {
          '@type': 'State',
          name: 'Guanajuato',
        },
      },
      {
        '@type': 'City',
        name: 'Dolores Hidalgo',
        containedInPlace: {
          '@type': 'State',
          name: 'Guanajuato',
        },
      },
    ],
    medicalSpecialty: [
      'Nephrology',
      'Dialysis',
      'Kidney Transplant',
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
      {
        '@type': 'MedicalProcedure',
        name: isSpanish ? 'Trasplante Renal' : 'Kidney Transplant',
        procedureType: 'SurgicalProcedure',
      },
      {
        '@type': 'MedicalTherapy',
        name: isSpanish ? 'Nutricion Renal' : 'Renal Nutrition',
      },
    ],
    employee: doctors.map((doctor) => ({
      '@type': 'Physician',
      name: doctor.name,
      jobTitle: isSpanish ? doctor.role : doctor.roleKey,
      url: `https://albadialisis.com/${locale}/directorio/${doctor.slug}`,
      image: doctor.image,
      medicalSpecialty: isSpanish ? doctor.specialties : doctor.specialtiesEn,
    })),
    numberOfLocations: branches.length,
    sameAs: [
      'https://www.facebook.com/albadialisis',
      'https://www.instagram.com/albadialisis',
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
    priceRange: '$$',
    currenciesAccepted: 'MXN',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  );
}

export default OrganizationSchema;
