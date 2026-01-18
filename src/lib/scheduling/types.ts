// Scheduling system types

export interface DoctorSchedule {
  doctorId: string;
  doctorName: string;
  calendarId?: string; // Google Calendar ID (email)
  workingHours: WeeklySchedule;
  appointmentDuration: number; // in minutes
  bufferTime: number; // buffer between appointments in minutes
}

export interface WeeklySchedule {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

export interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;   // HH:mm format
}

export interface AvailableSlot {
  start: Date;
  end: Date;
  formatted: string;
}

export interface Appointment {
  id?: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: Date;
  startTime: string;
  endTime: string;
  reason?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  googleEventId?: string;
  createdAt: Date;
}

export interface BookingRequest {
  doctorId: string;
  doctorName: string;
  date: string; // ISO date string
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: Date;
  end: Date;
  status: string;
}

// Doctor schedule configurations (can be moved to database later)
// These match the slugs from the doctors data in /lib/data.ts
export const DOCTOR_SCHEDULES: Record<string, DoctorSchedule> = {
  'maria-gutierrez-navarro': {
    doctorId: 'maria-gutierrez-navarro',
    doctorName: 'Dra. Maria de Jesus Gutierrez Navarro',
    appointmentDuration: 45,
    bufferTime: 15,
    workingHours: {
      monday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '16:00', end: '19:00' }] },
      tuesday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '16:00', end: '19:00' }] },
      wednesday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }] },
      thursday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '16:00', end: '19:00' }] },
      friday: { enabled: true, slots: [{ start: '09:00', end: '14:00' }] },
      saturday: { enabled: false, slots: [] },
      sunday: { enabled: false, slots: [] },
    },
  },
  'josue-tapia-lopez': {
    doctorId: 'josue-tapia-lopez',
    doctorName: 'Dr. Josue W. Tapia Lopez',
    appointmentDuration: 30,
    bufferTime: 10,
    workingHours: {
      monday: { enabled: true, slots: [{ start: '08:00', end: '12:00' }, { start: '15:00', end: '18:00' }] },
      tuesday: { enabled: true, slots: [{ start: '08:00', end: '12:00' }, { start: '15:00', end: '18:00' }] },
      wednesday: { enabled: true, slots: [{ start: '08:00', end: '12:00' }] },
      thursday: { enabled: true, slots: [{ start: '08:00', end: '12:00' }, { start: '15:00', end: '18:00' }] },
      friday: { enabled: true, slots: [{ start: '08:00', end: '13:00' }] },
      saturday: { enabled: false, slots: [] },
      sunday: { enabled: false, slots: [] },
    },
  },
  'pamela-vazquez': {
    doctorId: 'pamela-vazquez',
    doctorName: 'Dra. Pamela Vazquez Gtz.',
    appointmentDuration: 30,
    bufferTime: 10,
    workingHours: {
      monday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '18:00' }] },
      tuesday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '18:00' }] },
      wednesday: { enabled: true, slots: [{ start: '09:00', end: '14:00' }] },
      thursday: { enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '18:00' }] },
      friday: { enabled: true, slots: [{ start: '09:00', end: '14:00' }] },
      saturday: { enabled: false, slots: [] },
      sunday: { enabled: false, slots: [] },
    },
  },
};

// Cal.com configuration for each doctor
// Configuration is loaded from environment variables for security
export interface CalComConfig {
  username: string;       // Cal.com username
  eventSlug?: string;     // Specific event type (optional)
}

// Map of doctor slug to environment variable name
// This mapping is safe to expose - the actual values come from env vars
const DOCTOR_ENV_MAPPING: Record<string, string> = {
  'maria-gutierrez-navarro': 'CALCOM_MARIA_USERNAME',
  'josue-tapia-lopez': 'CALCOM_JOSUE_USERNAME',
  'pamela-vazquez': 'CALCOM_PAMELA_USERNAME',
  'abel-orozco-mosqueda': 'CALCOM_ABEL_USERNAME',
  'carmen-alfaro-cruz': 'CALCOM_CARMEN_USERNAME',
  'xochitl-perez': 'CALCOM_XOCHITL_USERNAME',
  'german-landeros-garcia': 'CALCOM_GERMAN_USERNAME',
  'jessica-cervantes-rios': 'CALCOM_JESSICA_USERNAME',
};

// Server-side only function to get Cal.com config
// This should only be called from API routes or server components
export function getCalComConfig(doctorSlug: string): CalComConfig | null {
  // Ensure this is only called server-side
  if (typeof window !== 'undefined') {
    console.error('getCalComConfig should only be called server-side');
    return null;
  }

  const envVarName = DOCTOR_ENV_MAPPING[doctorSlug];
  if (!envVarName) {
    console.error(`No Cal.com configuration mapping for doctor: ${doctorSlug}`);
    return null;
  }

  const username = process.env[envVarName];
  if (!username) {
    console.error(`Environment variable ${envVarName} not set`);
    return null;
  }

  // Event slug can be configured per-doctor or use default
  const eventSlugEnvVar = `${envVarName.replace('_USERNAME', '_EVENT_SLUG')}`;
  const eventSlug = process.env[eventSlugEnvVar] || '30min';

  return {
    username,
    eventSlug,
  };
}

// For backwards compatibility - returns all configs (server-side only)
export function getAllCalComConfigs(): Record<string, CalComConfig> {
  if (typeof window !== 'undefined') {
    console.error('getAllCalComConfigs should only be called server-side');
    return {};
  }

  const configs: Record<string, CalComConfig> = {};

  for (const [doctorSlug] of Object.entries(DOCTOR_ENV_MAPPING)) {
    const config = getCalComConfig(doctorSlug);
    if (config) {
      configs[doctorSlug] = config;
    }
  }

  return configs;
}
