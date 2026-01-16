import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, getAvailableSlotsForRange } from '@/lib/scheduling';
import { startOfDay, addDays } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const doctorId = searchParams.get('doctorId');
    const date = searchParams.get('date');
    const range = searchParams.get('range'); // number of days

    if (!doctorId) {
      return NextResponse.json(
        { error: 'doctorId is required' },
        { status: 400 }
      );
    }

    // If range is specified, get slots for multiple days
    if (range) {
      const startDate = date ? new Date(date) : startOfDay(new Date());
      const days = Math.min(parseInt(range, 10) || 14, 30); // Max 30 days

      const slots = await getAvailableSlotsForRange(doctorId, startDate, days);

      return NextResponse.json({
        doctorId,
        startDate: startDate.toISOString(),
        days,
        availability: slots,
      });
    }

    // Get slots for a single day
    if (!date) {
      return NextResponse.json(
        { error: 'date is required (format: YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);
    const slots = await getAvailableSlots(doctorId, targetDate);

    return NextResponse.json({
      doctorId,
      date,
      slots,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
