export type BranchId = 'leon' | 'brisas' | 'dolores' | 'renalmedic';

export interface Branch {
  id: BranchId;
  slug: string;
  name: string;
  nameKey: string;
  addressKey: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const branches: Branch[] = [
  {
    id: 'leon',
    slug: 'alba-leon-centro',
    name: 'Alba León Centro',
    nameKey: 'branches.leon.name',
    addressKey: 'branches.leon.address',
    address: 'Melchor Ocampo 122, Col. Centro, León, Gto.',
    phone: '477-329-39-39',
    email: 'centro@albadialisis.com',
    mapUrl: 'https://maps.google.com/?q=Melchor+Ocampo+122+León+Guanajuato',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    coordinates: { lat: 21.1236, lng: -101.6822 },
  },
  {
    id: 'brisas',
    slug: 'unidad-medica-brisas',
    name: 'Unidad Médica Brisas',
    nameKey: 'branches.brisas.name',
    addressKey: 'branches.brisas.address',
    address: 'Blvd. La Luz 5235, Col. San Nicolás, León, Gto.',
    phone: '477-248-83-16',
    email: 'brisas@albadialisis.com',
    mapUrl: 'https://maps.google.com/?q=Blvd+La+Luz+5235+León+Guanajuato',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
    coordinates: { lat: 21.1456, lng: -101.7234 },
  },
  {
    id: 'dolores',
    slug: 'unidad-dolores-hidalgo',
    name: 'Unidad Dolores Hidalgo',
    nameKey: 'branches.dolores.name',
    addressKey: 'branches.dolores.address',
    address: 'Blvd. Miguel Hidalgo 822, Fracc. Cristóbal, Dolores Hidalgo, Gto.',
    phone: '418-690-51-58',
    email: 'dhidalgo@albadialisis.com',
    mapUrl: 'https://maps.google.com/?q=Blvd+Miguel+Hidalgo+822+Dolores+Hidalgo+Guanajuato',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    coordinates: { lat: 21.1594, lng: -100.9367 },
  },
  {
    id: 'renalmedic',
    slug: 'renalmedic',
    name: 'Renalmedic',
    nameKey: 'branches.renalmedic.name',
    addressKey: 'branches.renalmedic.address',
    address: 'León Norte, León, Gto.',
    phone: '477-329-39-39',
    email: 'renalmedic@albadialisis.com',
    mapUrl: 'https://maps.google.com/?q=León+Norte+Guanajuato',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    coordinates: { lat: 21.1589, lng: -101.6869 },
  },
];

export interface ExternalPractice {
  name: string;
  nameEn?: string;
  address: string;
  phone?: string;
  type: 'hospital' | 'clinic' | 'consultorio';
}

export interface SocialMedia {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  doctoralia?: string;
}

export interface CareerHighlight {
  year?: string;
  title: string;
  titleEn: string;
  description?: string;
  descriptionEn?: string;
}

export interface PressMention {
  title: string;
  titleEn?: string;
  source: string;
  url: string;
  year?: string;
  logo?: string;
}

export interface Doctor {
  id: number;
  slug: string;
  name: string;
  role: string;
  roleKey: string;
  isFounder: boolean;
  email: string;
  phone?: string;
  branches: BranchId[];
  image: string;
  heroImage?: string; // Optional larger image for profile hero section
  profileImage?: string; // Secondary image for content sections
  bio: string;
  bioEn: string;
  // Extended bio for immersive profile pages
  extendedBio?: string;
  extendedBioEn?: string;
  // Philosophy/approach section for immersive profile pages
  philosophy?: string;
  philosophyEn?: string;
  // Personal quote
  quote?: string;
  quoteEn?: string;
  education: string[];
  educationEn: string[];
  specialties: string[];
  specialtiesEn: string[];
  certifications?: string[];
  certificationsEn?: string[];
  memberships?: string[];
  membershipsEn?: string[];
  cedula?: string; // Cédula profesional (professional license number)
  cedulaEspecialidad?: string; // Cédula de especialidad
  // New comprehensive fields
  website?: string;
  socialMedia?: SocialMedia;
  externalPractices?: ExternalPractice[];
  careerHighlights?: CareerHighlight[];
  pressMentions?: PressMention[];
  languages?: string[];
  languagesEn?: string[];
  consultationHours?: string;
  consultationHoursEn?: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    slug: 'maria-gutierrez-navarro',
    name: 'Dra. María de Jesús Gutiérrez Navarro',
    role: 'Nefróloga - Fundadora y Directora Médica',
    roleKey: 'doctors.founderDirector',
    isFounder: true,
    email: 'fundadora@albadialisis.com',
    phone: '477 329 3939',
    branches: ['leon', 'brisas'],
    image: '/images/doctors/dra-maria-gutierrez.jpg',
    heroImage: '/images/doctors/dra-maria-gutierrez-hero.webp',
    bio: 'Con más de 25 años de experiencia en nefrología, la Dra. María de Jesús Gutiérrez Navarro es la fundadora y directora médica de Alba Diálisis. Pionera en el tratamiento de enfermedades renales en la región del Bajío, ha dedicado su carrera a brindar atención de excelencia y a construir un equipo médico comprometido con el bienestar integral de cada paciente.',
    bioEn: 'With over 25 years of experience in nephrology, Dr. María de Jesús Gutiérrez Navarro is the founder and medical director of Alba Dialysis. A pioneer in kidney disease treatment in the Bajío region, she has dedicated her career to providing excellent care and building a medical team committed to the comprehensive wellbeing of each patient.',
    education: [
      'Medicina General - Universidad de Guanajuato',
      'Especialidad en Nefrología - UNAM',
      'Fellowship en Trasplante Renal - Hospital General de México'
    ],
    educationEn: [
      'General Medicine - University of Guanajuato',
      'Nephrology Specialty - UNAM',
      'Kidney Transplant Fellowship - Hospital General de México'
    ],
    specialties: ['Hemodiálisis', 'Hemodiafiltración', 'Trasplante Renal', 'Enfermedad Renal Crónica'],
    specialtiesEn: ['Hemodialysis', 'Hemodiafiltration', 'Kidney Transplant', 'Chronic Kidney Disease'],
    certifications: ['Consejo Mexicano de Nefrología'],
    certificationsEn: ['Mexican Nephrology Board Certified'],
    memberships: ['Sociedad Mexicana de Nefrología', 'Colegio Médico de León'],
    membershipsEn: ['Mexican Society of Nephrology', 'León Medical Association'],
    languages: ['Español', 'Inglés'],
    languagesEn: ['Spanish', 'English'],
    careerHighlights: [
      {
        year: '2014',
        title: 'Fundación de Alba Diálisis',
        titleEn: 'Foundation of Alba Dialysis',
        description: 'Creación de la primera clínica Alba en León, Guanajuato.',
        descriptionEn: 'Creation of the first Alba clinic in León, Guanajuato.',
      },
      {
        year: '2017',
        title: 'Expansión a Unidad Médica Brisas',
        titleEn: 'Expansion to Brisas Medical Unit',
        description: 'Apertura de la segunda unidad para ampliar la cobertura de atención.',
        descriptionEn: 'Opening of the second unit to expand care coverage.',
      },
      {
        year: '2019',
        title: 'Pionera en Hemodiafiltración en la Región',
        titleEn: 'Pioneer in Hemodiafiltration in the Region',
        description: 'Introducción de tecnología de hemodiafiltración de última generación.',
        descriptionEn: 'Introduction of state-of-the-art hemodiafiltration technology.',
      },
      {
        year: '2024',
        title: '+5,000 Pacientes Atendidos',
        titleEn: '+5,000 Patients Served',
        description: 'Consolidación de Alba como referente en nefrología en el Bajío.',
        descriptionEn: 'Consolidation of Alba as a nephrology reference in the Bajío region.',
      },
    ],
  },
  {
    id: 2,
    slug: 'josue-tapia-lopez',
    name: 'Dr. Josué W. Tapia López',
    role: 'Nefrólogo',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'josue.tapia@albadialisis.com',
    branches: ['leon', 'renalmedic'],
    image: '/images/doctors/dr-josue-tapia.jpg',
    heroImage: '/images/doctors/dr-josue-tapia-hero.webp',
    bio: 'El Dr. Tapia es especialista en nefrología con enfoque en hemodiafiltración y manejo de pacientes críticos. Atiende en las unidades Centro y Renalmedic.',
    bioEn: 'Dr. Tapia is a nephrology specialist focused on hemodiafiltration and critical patient management. He practices at Centro and Renalmedic units.',
    education: [
      'Medicina General - Universidad de Guadalajara',
      'Especialidad en Nefrología - Instituto Nacional de Cardiología'
    ],
    educationEn: [
      'General Medicine - University of Guadalajara',
      'Nephrology Specialty - National Institute of Cardiology'
    ],
    specialties: ['Hemodiafiltración', 'Nefrología Crítica', 'Accesos Vasculares'],
    specialtiesEn: ['Hemodiafiltration', 'Critical Nephrology', 'Vascular Access'],
    cedula: '9940966',
  },
  {
    id: 3,
    slug: 'pamela-vazquez',
    name: 'Dra. Pamela Vázquez Gutiérrez',
    role: 'Médica Nefróloga',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'vazquezg.pamela@gmail.com',
    phone: '55 1948 0097',
    branches: ['dolores'],
    image: '/images/doctors/dra-pamela-vazquez.jpg',
    heroImage: '/images/doctors/dra-pamela-vazquez-hero.webp',
    profileImage: '/images/doctors/dra-pamela-vazquez-about.jpeg',
    bio: 'La Dra. Pamela Vázquez Gutiérrez es médica nefróloga, dedicada al cuidado integral de las personas con enfermedad renal crónica, con especial énfasis en la hemodiálisis, la calidad de vida del paciente y la atención ética y humana.',
    bioEn: 'Dr. Pamela Vázquez Gutiérrez is a nephrologist dedicated to the comprehensive care of people with chronic kidney disease, with special emphasis on hemodialysis, patient quality of life, and ethical and humane care.',
    extendedBio: 'La Dra. Pamela Vázquez Gutiérrez es médica nefróloga, dedicada al cuidado integral de las personas con enfermedad renal crónica, con especial énfasis en la hemodiálisis, la calidad de vida del paciente y la atención ética y humana.\n\nSu práctica médica se caracteriza por una visión centrada en la persona, entendiendo que detrás de cada diagnóstico hay una historia, una familia y un proyecto de vida. Cree firmemente que la medicina de alta especialidad debe ir siempre acompañada de empatía, escucha activa y acompañamiento cercano, especialmente en enfermedades crónicas.',
    extendedBioEn: 'Dr. Pamela Vázquez Gutiérrez is a nephrologist dedicated to the comprehensive care of people with chronic kidney disease, with special emphasis on hemodialysis, patient quality of life, and ethical and humane care.\n\nHer medical practice is characterized by a person-centered vision, understanding that behind every diagnosis there is a story, a family, and a life project. She firmly believes that highly specialized medicine must always be accompanied by empathy, active listening, and close support, especially in chronic diseases.',
    philosophy: 'Apasionada por el envejecimiento saludable, la gerontología y la medicina paliativa, la Dra. Vázquez integra estos enfoques en la atención nefrológica, buscando no solo prolongar la vida, sino dignificarla. Le interesa especialmente el bienestar emocional del paciente, la toma de decisiones informada y el respeto a la autonomía.\n\nAdemás de su labor clínica, está comprometida con la mejora continua, la educación médica y el desarrollo de proyectos que eleven los estándares de calidad en las unidades de diálisis, siempre con una visión ética, responsable y humana.',
    philosophyEn: 'Passionate about healthy aging, gerontology, and palliative medicine, Dr. Vázquez integrates these approaches into nephrological care, seeking not only to prolong life but to dignify it. She is especially interested in the emotional well-being of patients, informed decision-making, and respect for autonomy.\n\nIn addition to her clinical work, she is committed to continuous improvement, medical education, and the development of projects that raise quality standards in dialysis units, always with an ethical, responsible, and humane vision.',
    quote: 'Cuidar el riñón es importante, pero cuidar a la persona es indispensable.',
    quoteEn: 'Caring for the kidney is important, but caring for the person is essential.',
    education: [
      'Medicina General - Universidad La Salle',
      'Residente de Medicina Interna en el Hospital Ángeles Pedregal',
      'Especialidad en Nefrología de adultos en el Instituto Nacional de Cardiología "Ignacio Chávez"'
    ],
    educationEn: [
      'General Medicine - Universidad La Salle',
      'Internal Medicine Resident at Hospital Ángeles Pedregal',
      'Adult Nephrology Specialty at National Institute of Cardiology "Ignacio Chávez"'
    ],
    specialties: ['Hemodiálisis', 'Calidad de vida del paciente', 'Medicina paliativa', 'Gerontología', 'Ética médica'],
    specialtiesEn: ['Hemodialysis', 'Patient quality of life', 'Palliative medicine', 'Gerontology', 'Medical ethics'],
    certifications: ['Consejo Mexicano de Nefrología', 'Los Mejores Médicos de México 2025'],
    certificationsEn: ['Mexican Nephrology Board Certified', 'Best Doctors in Mexico 2025'],
    memberships: ['Sociedad Mexicana de Nefrología', 'Sociedad Latinoamericana de Nefrología e Hipertensión'],
    membershipsEn: ['Mexican Society of Nephrology', 'Latin American Society of Nephrology and Hypertension'],
    cedula: '10138846',
    cedulaEspecialidad: '6000609',
    languages: ['Español', 'Inglés'],
    languagesEn: ['Spanish', 'English'],
    website: 'https://drapamelavazquez.com',
    socialMedia: {
      facebook: 'https://www.facebook.com/Dra.PamelaVazquezNefrologoSanMigueldeAllende',
      linkedin: 'https://www.linkedin.com/in/pamela-vazquez-gutierrez',
      doctoralia: 'https://www.doctoralia.com.mx/pamela-vazquez-gutierrez',
    },
    externalPractices: [
      {
        name: 'Hospital Ángeles León',
        address: 'Av. Cerro Gordo 311, Lomas del Campestre, León, Gto.',
        phone: '477 788 5900',
        type: 'hospital',
      },
      {
        name: 'Hospital MAC San Miguel de Allende',
        address: 'Camino a Alcocer No. 12, Col. Saltito de Guadalupe, C.P. 37745, San Miguel de Allende, Guanajuato',
        phone: '55 1948 0097',
        type: 'hospital',
      },
    ],
    careerHighlights: [
      {
        year: '2025',
        title: 'Reconocida como una de Los Mejores Médicos de México',
        titleEn: 'Recognized as one of The Best Doctors in Mexico',
        description: 'Distinción otorgada por excelencia en práctica médica y atención al paciente.',
        descriptionEn: 'Award given for excellence in medical practice and patient care.',
      },
      {
        year: '2020',
        title: 'Certificación por el Consejo Mexicano de Nefrología',
        titleEn: 'Certification by the Mexican Nephrology Board',
        description: 'Certificación nacional que avala la especialización en nefrología.',
        descriptionEn: 'National certification validating nephrology specialization.',
      },
      {
        year: '2018',
        title: 'Fellowship en Instituto Nacional de Cardiología',
        titleEn: 'Fellowship at National Institute of Cardiology',
        description: 'Formación especializada en uno de los centros de referencia más importantes de México.',
        descriptionEn: 'Specialized training at one of Mexico\'s most important reference centers.',
      },
      {
        title: 'Titular del curso de Nefrología en la Universidad La Salle',
        titleEn: 'Head of Nephrology course at Universidad La Salle',
      },
      {
        title: 'Titular del primer diplomado de Nefrología y Hemodiálisis en la Universidad Autónoma de Querétaro (UAQ)',
        titleEn: 'Head of the first Nephrology and Hemodialysis diploma at Universidad Autónoma de Querétaro (UAQ)',
      },
      {
        title: 'Titular de diplomado de Nefrología y Hemodiálisis en la Universidad de Dolores Hidalgo (UDH)',
        titleEn: 'Head of Nephrology and Hemodialysis diploma at Universidad de Dolores Hidalgo (UDH)',
      },
      {
        title: 'Responsable del programa de trasplante renal en San Miguel de Allende',
        titleEn: 'Head of kidney transplant program in San Miguel de Allende',
      },
      {
        title: 'Responsable de Hemodiálisis en MAC San Miguel de Allende y Diálisis y trasplantes Alba en Dolores Hidalgo',
        titleEn: 'Head of Hemodialysis at MAC San Miguel de Allende and Alba Dialysis and Transplants in Dolores Hidalgo',
      },
    ],
    pressMentions: [
      {
        title: 'Médicos 2025: Pamela Vázquez Gutiérrez',
        titleEn: 'Doctors 2025: Pamela Vázquez Gutiérrez',
        source: 'Líderes Mexicanos',
        url: 'https://lideresmexicanos.com/persona/medicos-2025-pamela-vazquez-gutierrez',
        year: '2025',
      },
    ],
  },
  {
    id: 4,
    slug: 'abel-orozco-mosqueda',
    name: 'Dr. Abel Orozco Mosqueda',
    role: 'Cirujano de Trasplantes',
    roleKey: 'doctors.transplantSurgeon',
    isFounder: false,
    email: 'abel.orozco@albadialisis.com',
    branches: ['leon', 'brisas'],
    image: '/images/doctors/dr-abel-orozco.jpg',
    heroImage: '/images/doctors/dr-abel-orozco-hero.webp',
    bio: 'El Dr. Orozco es cirujano especialista en trasplante renal con amplia experiencia en procedimientos quirúrgicos complejos relacionados con la enfermedad renal.',
    bioEn: 'Dr. Orozco is a kidney transplant specialist surgeon with extensive experience in complex surgical procedures related to kidney disease.',
    education: [
      'Medicina General - UNAM',
      'Cirugía General - Hospital General de México',
      'Subespecialidad en Trasplante - Instituto Nacional de Ciencias Médicas y Nutrición'
    ],
    educationEn: [
      'General Medicine - UNAM',
      'General Surgery - Hospital General de México',
      'Transplant Subspecialty - National Institute of Medical Sciences and Nutrition'
    ],
    specialties: ['Trasplante Renal', 'Cirugía de Accesos Vasculares', 'Cirugía Laparoscópica'],
    specialtiesEn: ['Kidney Transplant', 'Vascular Access Surgery', 'Laparoscopic Surgery'],
  },
  {
    id: 5,
    slug: 'carmen-alfaro-cruz',
    name: 'Dra. Carmen Alfaro Cruz',
    role: 'Nefróloga',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'carmen.alfaro@albadialisis.com',
    branches: ['leon'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'La Dra. Alfaro es especialista en nefrología con experiencia en el manejo de pacientes con enfermedad renal. Atiende en la unidad Centro.',
    bioEn: 'Dr. Alfaro is a nephrology specialist with experience in managing patients with kidney disease. She practices at the Centro unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrología'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodiálisis', 'Nefrología General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '5088266',
  },
  {
    id: 6,
    slug: 'xochitl-perez',
    name: 'Dra. Xóchitl Stephany Verónica Pérez',
    role: 'Nefróloga',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'xochitl.perez@albadialisis.com',
    branches: ['leon'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'La Dra. Pérez es especialista en nefrología con enfoque en el tratamiento integral del paciente renal. Atiende en la unidad Centro.',
    bioEn: 'Dr. Pérez is a nephrology specialist focused on comprehensive kidney patient treatment. She practices at the Centro unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrología'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodiálisis', 'Nefrología General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '9486265',
  },
  {
    id: 7,
    slug: 'german-landeros-garcia',
    name: 'Dr. Germán Alfonso Landeros García',
    role: 'Nefrólogo',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'german.landeros@albadialisis.com',
    branches: ['leon'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'El Dr. Landeros es especialista en nefrología con experiencia en el manejo de pacientes renales. Atiende en la unidad Centro.',
    bioEn: 'Dr. Landeros is a nephrology specialist with experience in managing kidney patients. He practices at the Centro unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrología'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodiálisis', 'Nefrología General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '15170551',
  },
  {
    id: 8,
    slug: 'jessica-cervantes-rios',
    name: 'Dra. Jessica Gabriela Cervantes Ríos',
    role: 'Nefróloga',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'jessica.cervantes@albadialisis.com',
    branches: ['renalmedic'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'La Dra. Cervantes es especialista en nefrología con experiencia en el tratamiento de pacientes renales. Atiende en la unidad Renalmedic.',
    bioEn: 'Dr. Cervantes is a nephrology specialist with experience in treating kidney patients. She practices at the Renalmedic unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrología'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodiálisis', 'Nefrología General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '10694318',
  },
];

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'hemodialysis',
    titleKey: 'services.hemodialysis.title',
    descriptionKey: 'services.hemodialysis.description',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  },
  {
    id: 'hemodiafiltration',
    titleKey: 'services.hemodiafiltration.title',
    descriptionKey: 'services.hemodiafiltration.description',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80',
  },
  {
    id: 'transplant',
    titleKey: 'services.transplant.title',
    descriptionKey: 'services.transplant.description',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
  },
  {
    id: 'nutrition',
    titleKey: 'services.nutrition.title',
    descriptionKey: 'services.nutrition.description',
    icon: 'Apple',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  },
  {
    id: 'psychology',
    titleKey: 'services.psychology.title',
    descriptionKey: 'services.psychology.description',
    icon: 'Brain',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  },
  {
    id: 'physiotherapy',
    titleKey: 'services.physiotherapy.title',
    descriptionKey: 'services.physiotherapy.description',
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  },
  {
    id: 'surgery',
    titleKey: 'services.surgery.title',
    descriptionKey: 'services.surgery.description',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
  },
  {
    id: 'nephrology',
    titleKey: 'services.nephrology.title',
    descriptionKey: 'services.nephrology.description',
    icon: 'UserCog',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  },
];

export interface Stat {
  value: string;
  labelKey: string;
}

export const stats: Stat[] = [
  { value: '25+', labelKey: 'hero.stats.experience' },
  { value: '1000+', labelKey: 'hero.stats.sessions' },
  { value: '4', labelKey: 'hero.stats.branches' },
  { value: '5000+', labelKey: 'hero.stats.patients' },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  roleEn: string;
  content: string;
  contentEn: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Roberto Martínez',
    role: 'Paciente de hemodiálisis',
    roleEn: 'Hemodialysis patient',
    content: 'El equipo de Alba me ha tratado como familia desde el primer día. La calidad de atención y el trato humano hacen toda la diferencia en mi tratamiento.',
    contentEn: 'The Alba team has treated me like family since day one. The quality of care and human treatment make all the difference in my treatment.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carmen Hernández',
    role: 'Familiar de paciente',
    roleEn: 'Patient family member',
    content: 'Gracias a Alba, mi esposo recibió su trasplante exitosamente. El seguimiento y apoyo que nos brindaron fue excepcional.',
    contentEn: 'Thanks to Alba, my husband received his transplant successfully. The follow-up and support they gave us was exceptional.',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Luis Sánchez',
    role: 'Paciente de hemodiafiltración',
    roleEn: 'Hemodiafiltration patient',
    content: 'Las instalaciones son de primer nivel y el personal médico es altamente capacitado. Me siento seguro en cada sesión.',
    contentEn: 'The facilities are top-notch and the medical staff is highly trained. I feel safe in every session.',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
  },
];

export interface TimelineItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
}

export const timeline: TimelineItem[] = [
  { year: '2014', titleKey: 'about.timeline.2014.title', descriptionKey: 'about.timeline.2014.description' },
  { year: '2017', titleKey: 'about.timeline.2017.title', descriptionKey: 'about.timeline.2017.description' },
  { year: '2019', titleKey: 'about.timeline.2019.title', descriptionKey: 'about.timeline.2019.description' },
  { year: '2021', titleKey: 'about.timeline.2021.title', descriptionKey: 'about.timeline.2021.description' },
];

export const whatsappNumber = '524773293939';
