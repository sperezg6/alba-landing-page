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
// Update these with the actual Cal.com usernames once accounts are created
export interface CalComConfig {
  username: string;       // Cal.com username
  eventSlug?: string;     // Specific event type (optional)
}

export const DOCTOR_CALCOM_CONFIG: Record<string, CalComConfig> = {
  'maria-gutierrez-navarro': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'josue-tapia-lopez': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'pamela-vazquez': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'abel-orozco-mosqueda': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'carmen-alfaro-cruz': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'xochitl-perez': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'german-landeros-garcia': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
  'jessica-cervantes-rios': {
    username: 'santiago-perez-vqzifs',
    eventSlug: '30min',
  },
};
