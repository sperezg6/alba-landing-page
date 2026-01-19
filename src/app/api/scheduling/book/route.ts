import { NextRequest, NextResponse } from 'next/server';
import { bookAppointment, BookingRequest, DOCTOR_SCHEDULES } from '@/lib/scheduling';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting: 5 requests per minute per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(`booking:${clientIp}`, {
      maxRequests: 5,
      windowMs: 60000, // 1 minute
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimitResult.resetTime),
          },
        }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['doctorId', 'date', 'startTime', 'endTime', 'patientName', 'patientEmail', 'patientPhone'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.patientEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(body.patientPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate doctor exists
    const schedule = DOCTOR_SCHEDULES[body.doctorId];
    if (!schedule) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    const bookingRequest: BookingRequest = {
      doctorId: body.doctorId,
      doctorName: schedule.doctorName,
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      patientName: body.patientName,
      patientEmail: body.patientEmail,
      patientPhone: body.patientPhone,
      reason: body.reason || '',
    };

    const result = await bookAppointment(bookingRequest);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Appointment booked successfully',
        eventId: result.eventId,
        appointment: {
          doctor: schedule.doctorName,
          date: body.date,
          time: `${body.startTime} - ${body.endTime}`,
          patient: body.patientName,
        },
      });
    }

    return NextResponse.json(
      { error: result.error || 'Failed to book appointment' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}
