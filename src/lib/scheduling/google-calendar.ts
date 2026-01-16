import { google, calendar_v3 } from 'googleapis';
import {
  DoctorSchedule,
  AvailableSlot,
  BookingRequest,
  CalendarEvent,
  DOCTOR_SCHEDULES
} from './types';
import {
  addMinutes,
  format,
  parse,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  addDays,
  getDay,
  setHours,
  setMinutes
} from 'date-fns';

// Day name mapping
const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

/**
 * Initialize Google Calendar API client
 * Uses Service Account for server-side operations
 */
function getCalendarClient(): calendar_v3.Calendar {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable not set');
  }

  const serviceAccount = JSON.parse(credentials);

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

/**
 * Get events from a calendar within a date range
 */
export async function getCalendarEvents(
  calendarId: string,
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> {
  try {
    const calendar = getCalendarClient();

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return (response.data.items || []).map(event => ({
      id: event.id || '',
      summary: event.summary || '',
      start: new Date(event.start?.dateTime || event.start?.date || ''),
      end: new Date(event.end?.dateTime || event.end?.date || ''),
      status: event.status || 'confirmed',
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

/**
 * Create a calendar event for an appointment
 */
export async function createCalendarEvent(
  calendarId: string,
  booking: BookingRequest
): Promise<string | null> {
  try {
    const calendar = getCalendarClient();

    const startDateTime = new Date(`${booking.date}T${booking.startTime}:00`);
    const endDateTime = new Date(`${booking.date}T${booking.endTime}:00`);

    const event = {
      summary: `Cita: ${booking.patientName}`,
      description: `
Paciente: ${booking.patientName}
Email: ${booking.patientEmail}
Teléfono: ${booking.patientPhone}
${booking.reason ? `Motivo: ${booking.reason}` : ''}

Reservado a través de Alba Diálisis
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Mexico_City',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Mexico_City',
      },
      attendees: [
        { email: booking.patientEmail },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 },      // 1 hour before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'all',
    });

    return response.data.id || null;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}

/**
 * Generate time slots for a given day based on doctor's schedule
 */
function generateTimeSlots(
  date: Date,
  schedule: DoctorSchedule
): { start: Date; end: Date }[] {
  const dayName = DAY_NAMES[getDay(date)];
  const daySchedule = schedule.workingHours[dayName];

  if (!daySchedule?.enabled || !daySchedule.slots.length) {
    return [];
  }

  const slots: { start: Date; end: Date }[] = [];
  const duration = schedule.appointmentDuration;
  const buffer = schedule.bufferTime;

  for (const timeSlot of daySchedule.slots) {
    const [startHour, startMin] = timeSlot.start.split(':').map(Number);
    const [endHour, endMin] = timeSlot.end.split(':').map(Number);

    let slotStart = setMinutes(setHours(new Date(date), startHour), startMin);
    const slotEnd = setMinutes(setHours(new Date(date), endHour), endMin);

    while (addMinutes(slotStart, duration) <= slotEnd) {
      slots.push({
        start: new Date(slotStart),
        end: addMinutes(slotStart, duration),
      });
      slotStart = addMinutes(slotStart, duration + buffer);
    }
  }

  return slots;
}

/**
 * Check if a slot conflicts with existing events
 */
function hasConflict(
  slot: { start: Date; end: Date },
  events: CalendarEvent[]
): boolean {
  return events.some(event => {
    // Check if the slot overlaps with any event
    return (
      (slot.start >= event.start && slot.start < event.end) ||
      (slot.end > event.start && slot.end <= event.end) ||
      (slot.start <= event.start && slot.end >= event.end)
    );
  });
}

/**
 * Get available time slots for a doctor on a specific date
 */
export async function getAvailableSlots(
  doctorId: string,
  date: Date
): Promise<AvailableSlot[]> {
  const schedule = DOCTOR_SCHEDULES[doctorId];

  if (!schedule) {
    console.warn(`No schedule found for doctor: ${doctorId}`);
    return [];
  }

  // Generate all possible slots based on schedule
  const allSlots = generateTimeSlots(date, schedule);

  if (allSlots.length === 0) {
    return [];
  }

  // If calendar ID is set, fetch existing events
  let existingEvents: CalendarEvent[] = [];
  if (schedule.calendarId) {
    existingEvents = await getCalendarEvents(
      schedule.calendarId,
      startOfDay(date),
      endOfDay(date)
    );
  }

  // Filter out past slots and conflicting slots
  const now = new Date();
  const availableSlots: AvailableSlot[] = [];

  for (const slot of allSlots) {
    // Skip past slots
    if (isBefore(slot.start, now)) {
      continue;
    }

    // Skip slots that conflict with existing events
    if (hasConflict(slot, existingEvents)) {
      continue;
    }

    availableSlots.push({
      start: slot.start,
      end: slot.end,
      formatted: format(slot.start, 'HH:mm'),
    });
  }

  return availableSlots;
}

/**
 * Get available slots for multiple days
 */
export async function getAvailableSlotsForRange(
  doctorId: string,
  startDate: Date,
  days: number = 14
): Promise<Record<string, AvailableSlot[]>> {
  const result: Record<string, AvailableSlot[]> = {};

  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i);
    const dateKey = format(date, 'yyyy-MM-dd');
    result[dateKey] = await getAvailableSlots(doctorId, date);
  }

  return result;
}

/**
 * Book an appointment (without Google Calendar - stores locally)
 * This version works without Google Calendar integration
 */
export async function bookAppointment(
  booking: BookingRequest
): Promise<{ success: boolean; eventId?: string; error?: string }> {
  try {
    const schedule = DOCTOR_SCHEDULES[booking.doctorId];

    if (!schedule) {
      return { success: false, error: 'Doctor not found' };
    }

    // Verify the slot is still available
    const date = new Date(booking.date);
    const availableSlots = await getAvailableSlots(booking.doctorId, date);
    const isAvailable = availableSlots.some(
      slot => slot.formatted === booking.startTime
    );

    if (!isAvailable) {
      return { success: false, error: 'This time slot is no longer available' };
    }

    // If doctor has a calendar ID, create the event
    if (schedule.calendarId) {
      const eventId = await createCalendarEvent(schedule.calendarId, booking);
      if (eventId) {
        return { success: true, eventId };
      }
      return { success: false, error: 'Failed to create calendar event' };
    }

    // Without calendar integration, just return success
    // In production, you'd store this in a database
    return { success: true };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
