export type BranchId = 'leon' | 'brisas' | 'dolores' | 'renalmedic';

export interface Branch {
  id: BranchId;
  slug: string;
  name: string;
  nameKey: string;
  addressKey: string;
  address: string;
  phone: string;
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
    name: 'Alba Leon Centro',
    nameKey: 'branches.leon.name',
    addressKey: 'branches.leon.address',
    address: 'Melchor Ocampo 122, Col. Centro, Leon, Gto.',
    phone: '477-329-39-39',
    mapUrl: 'https://maps.google.com/?q=Melchor+Ocampo+122+Leon+Guanajuato',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    coordinates: { lat: 21.1236, lng: -101.6822 },
  },
  {
    id: 'brisas',
    slug: 'unidad-medica-brisas',
    name: 'Unidad Medica Brisas',
    nameKey: 'branches.brisas.name',
    addressKey: 'branches.brisas.address',
    address: 'Blvd. La Luz 5235, Col. San Nicolas, Leon, Gto.',
    phone: '477-248-83-16',
    mapUrl: 'https://maps.google.com/?q=Blvd+La+Luz+5235+Leon+Guanajuato',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
    coordinates: { lat: 21.1456, lng: -101.7234 },
  },
  {
    id: 'dolores',
    slug: 'unidad-dolores-hidalgo',
    name: 'Unidad Dolores Hidalgo',
    nameKey: 'branches.dolores.name',
    addressKey: 'branches.dolores.address',
    address: 'Blvd. Miguel Hidalgo 822, Fracc. Cristobal, Dolores Hidalgo, Gto.',
    phone: '418-690-51-58',
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
    address: 'Leon Norte, Leon, Gto.',
    phone: '477-329-39-39',
    mapUrl: 'https://maps.google.com/?q=Leon+Norte+Guanajuato',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    coordinates: { lat: 21.1589, lng: -101.6869 },
  },
];

export interface Doctor {
  id: number;
  slug: string;
  name: string;
  role: string;
  roleKey: string;
  isFounder: boolean;
  email: string;
  branches: BranchId[];
  image: string;
  heroImage?: string; // Optional larger image for profile hero section
  bio: string;
  bioEn: string;
  education: string[];
  educationEn: string[];
  specialties: string[];
  specialtiesEn: string[];
  cedula?: string; // Cédula profesional (professional license number)
}

export const doctors: Doctor[] = [
  {
    id: 1,
    slug: 'maria-gutierrez-navarro',
    name: 'Dra. Maria de Jesus Gutierrez Navarro',
    role: 'Nefrologa',
    roleKey: 'doctors.nephrologist',
    isFounder: true,
    email: 'fundadora@albadialisis.com',
    branches: ['leon', 'brisas'],
    image: '/images/doctors/dra-maria-gutierrez.jpg',
    heroImage: '/images/doctors/dra-maria-gutierrez-hero.jpeg',
    bio: 'Con mas de 25 años de experiencia en nefrologia, la Dra. Gutierrez es la fundadora y directora medica de Alba Dialisis. Se especializa en el tratamiento integral de enfermedades renales cronicas y agudas.',
    bioEn: 'With over 25 years of experience in nephrology, Dr. Gutierrez is the founder and medical director of Alba Dialysis. She specializes in comprehensive treatment of chronic and acute kidney diseases.',
    education: [
      'Medicina General - Universidad de Guanajuato',
      'Especialidad en Nefrologia - UNAM',
      'Fellowship en Trasplante Renal - Hospital General de Mexico'
    ],
    educationEn: [
      'General Medicine - University of Guanajuato',
      'Nephrology Specialty - UNAM',
      'Kidney Transplant Fellowship - Hospital General de Mexico'
    ],
    specialties: ['Hemodialisis', 'Trasplante Renal', 'Enfermedad Renal Cronica'],
    specialtiesEn: ['Hemodialysis', 'Kidney Transplant', 'Chronic Kidney Disease'],
  },
  {
    id: 2,
    slug: 'josue-tapia-lopez',
    name: 'Dr. Josue W. Tapia Lopez',
    role: 'Nefrologo',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'josue.tapia@albadialisis.com',
    branches: ['leon', 'renalmedic'],
    image: '/images/doctors/dr-josue-tapia.jpg',
    heroImage: '/images/doctors/dr-josue-tapia-hero.jpeg',
    bio: 'El Dr. Tapia es especialista en nefrologia con enfoque en hemodiafiltracion y manejo de pacientes criticos. Atiende en las unidades Centro y Renalmedic.',
    bioEn: 'Dr. Tapia is a nephrology specialist focused on hemodiafiltration and critical patient management. He practices at Centro and Renalmedic units.',
    education: [
      'Medicina General - Universidad de Guadalajara',
      'Especialidad en Nefrologia - Instituto Nacional de Cardiologia'
    ],
    educationEn: [
      'General Medicine - University of Guadalajara',
      'Nephrology Specialty - National Institute of Cardiology'
    ],
    specialties: ['Hemodiafiltracion', 'Nefrologia Critica', 'Accesos Vasculares'],
    specialtiesEn: ['Hemodiafiltration', 'Critical Nephrology', 'Vascular Access'],
    cedula: '9940966',
  },
  {
    id: 3,
    slug: 'pamela-vazquez',
    name: 'Dra. Pamela Vazquez Gtz.',
    role: 'Nefrologa',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'pamela.vazquez@albadialisis.com',
    branches: ['dolores'],
    image: '/images/doctors/dra-pamela-vazquez.jpg',
    heroImage: '/images/doctors/dra-pamela-vazquez-hero.jpeg',
    bio: 'La Dra. Vazquez lidera la unidad de Dolores Hidalgo, brindando atencion especializada en nefrologia a la comunidad. Su enfoque es el manejo integral del paciente renal.',
    bioEn: 'Dr. Vazquez leads the Dolores Hidalgo unit, providing specialized nephrology care to the community. Her focus is comprehensive kidney patient management.',
    education: [
      'Medicina General - Universidad Autonoma de Queretaro',
      'Especialidad en Nefrologia - Hospital Civil de Guadalajara'
    ],
    educationEn: [
      'General Medicine - Autonomous University of Queretaro',
      'Nephrology Specialty - Hospital Civil de Guadalajara'
    ],
    specialties: ['Hemodialisis', 'Nefrologia General', 'Educacion al Paciente'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology', 'Patient Education'],
    cedula: '10138846',
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
    heroImage: '/images/doctors/dr-abel-orozco-hero.jpeg',
    bio: 'El Dr. Orozco es cirujano especialista en trasplante renal con amplia experiencia en procedimientos quirurgicos complejos relacionados con la enfermedad renal.',
    bioEn: 'Dr. Orozco is a kidney transplant specialist surgeon with extensive experience in complex surgical procedures related to kidney disease.',
    education: [
      'Medicina General - UNAM',
      'Cirugia General - Hospital General de Mexico',
      'Subespecialidad en Trasplante - Instituto Nacional de Ciencias Medicas y Nutricion'
    ],
    educationEn: [
      'General Medicine - UNAM',
      'General Surgery - Hospital General de Mexico',
      'Transplant Subspecialty - National Institute of Medical Sciences and Nutrition'
    ],
    specialties: ['Trasplante Renal', 'Cirugia de Accesos Vasculares', 'Cirugia Laparoscopica'],
    specialtiesEn: ['Kidney Transplant', 'Vascular Access Surgery', 'Laparoscopic Surgery'],
  },
  {
    id: 5,
    slug: 'carmen-alfaro-cruz',
    name: 'Dra. Carmen Alfaro Cruz',
    role: 'Nefrologa',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'carmen.alfaro@albadialisis.com',
    branches: ['leon'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'La Dra. Alfaro es especialista en nefrologia con experiencia en el manejo de pacientes con enfermedad renal. Atiende en la unidad Centro.',
    bioEn: 'Dr. Alfaro is a nephrology specialist with experience in managing patients with kidney disease. She practices at the Centro unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrologia'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodialisis', 'Nefrologia General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '5088266',
  },
  {
    id: 6,
    slug: 'xochitl-perez',
    name: 'Dra. Xochitl Stephany Veronica Perez',
    role: 'Nefrologa',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'xochitl.perez@albadialisis.com',
    branches: ['leon'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'La Dra. Perez es especialista en nefrologia con enfoque en el tratamiento integral del paciente renal. Atiende en la unidad Centro.',
    bioEn: 'Dr. Perez is a nephrology specialist focused on comprehensive kidney patient treatment. She practices at the Centro unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrologia'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodialisis', 'Nefrologia General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '9486265',
  },
  {
    id: 7,
    slug: 'german-landeros-garcia',
    name: 'Dr. German Alfonso Landeros Garcia',
    role: 'Nefrologo',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'german.landeros@albadialisis.com',
    branches: ['leon'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'El Dr. Landeros es especialista en nefrologia con experiencia en el manejo de pacientes renales. Atiende en la unidad Centro.',
    bioEn: 'Dr. Landeros is a nephrology specialist with experience in managing kidney patients. He practices at the Centro unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrologia'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodialisis', 'Nefrologia General'],
    specialtiesEn: ['Hemodialysis', 'General Nephrology'],
    cedula: '15170551',
  },
  {
    id: 8,
    slug: 'jessica-cervantes-rios',
    name: 'Dra. Jessica Gabriela Cervantes Rios',
    role: 'Nefrologa',
    roleKey: 'doctors.nephrologist',
    isFounder: false,
    email: 'jessica.cervantes@albadialisis.com',
    branches: ['renalmedic'],
    image: '/images/doctors/placeholder-doctor.jpg',
    bio: 'La Dra. Cervantes es especialista en nefrologia con experiencia en el tratamiento de pacientes renales. Atiende en la unidad Renalmedic.',
    bioEn: 'Dr. Cervantes is a nephrology specialist with experience in treating kidney patients. She practices at the Renalmedic unit.',
    education: [
      'Medicina General',
      'Especialidad en Nefrologia'
    ],
    educationEn: [
      'General Medicine',
      'Nephrology Specialty'
    ],
    specialties: ['Hemodialisis', 'Nefrologia General'],
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
    name: 'Roberto Martinez',
    role: 'Paciente de hemodialisis',
    roleEn: 'Hemodialysis patient',
    content: 'El equipo de Alba me ha tratado como familia desde el primer dia. La calidad de atencion y el trato humano hacen toda la diferencia en mi tratamiento.',
    contentEn: 'The Alba team has treated me like family since day one. The quality of care and human treatment make all the difference in my treatment.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carmen Hernandez',
    role: 'Familiar de paciente',
    roleEn: 'Patient family member',
    content: 'Gracias a Alba, mi esposo recibio su trasplante exitosamente. El seguimiento y apoyo que nos brindaron fue excepcional.',
    contentEn: 'Thanks to Alba, my husband received his transplant successfully. The follow-up and support they gave us was exceptional.',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Luis Sanchez',
    role: 'Paciente de hemodiafiltracion',
    roleEn: 'Hemodiafiltration patient',
    content: 'Las instalaciones son de primer nivel y el personal medico es altamente capacitado. Me siento seguro en cada sesion.',
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
