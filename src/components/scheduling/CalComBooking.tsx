'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

interface CalComBookingProps {
  /** Cal.com username (e.g., "dr-maria-gutierrez") */
  calUsername: string;
  /** Doctor's name for display */
  doctorName: string;
  /** Optional: specific event type slug */
  eventSlug?: string;
}

export function CalComBooking({
  calUsername,
  doctorName,
  eventSlug = '30min',
}: CalComBookingProps) {
  const calLink = `${calUsername}/${eventSlug}`;
  const posthog = usePostHog();

  // Track when booking calendar is viewed
  useEffect(() => {
    posthog?.capture('booking_calendar_viewed', {
      doctor_name: doctorName,
      cal_username: calUsername,
      event_slug: eventSlug,
    });
  }, [posthog, doctorName, calUsername, eventSlug]);

  return (
    <div className="cal-booking-wrapper">
      {/* Header - Left aligned to match Cal.com calendar position */}
      <div className="py-10 md:py-12 px-6 md:px-10" style={{ backgroundColor: '#292929' }}>
        <h3
          className="text-3xl md:text-4xl font-light mb-2 text-white"
        >
          Agenda tu Cita
        </h3>
        <p className="text-base text-[rgba(255,255,255,0.6)]">
          con {doctorName}
        </p>
      </div>

      {/* Cal.com iframe - clean and reliable */}
      <div className="cal-embed-container">
        <iframe
          src={`https://cal.com/${calLink}?embed=true&theme=dark&layout=month_view&hideEventTypeDetails=true&locale=es`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="camera; microphone"
          title={`Agendar cita con ${doctorName}`}
        />
      </div>

      <style jsx global>{`
        .cal-booking-wrapper {
          width: 100%;
          background: #292929;
          padding-bottom: 4rem;
        }
        .cal-embed-container {
          height: 700px;
          background: #292929;
        }
        .cal-embed-container iframe {
          border: none;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

/**
 * Simple iframe fallback if the embed doesn't work
 */
export function CalComBookingIframe({
  calUsername,
  doctorName,
  eventSlug,
}: CalComBookingProps) {
  const calLink = eventSlug
    ? `${calUsername}/${eventSlug}`
    : calUsername;

  return (
    <div className="bg-alba-dark rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[rgba(0,0,0,0.1)]">
        <h3
          className="text-2xl font-light mb-2 text-alba-text"
        >
          Agenda tu Cita
        </h3>
        <p className="text-[rgba(0,0,0,0.6)]">
          con {doctorName}
        </p>
      </div>

      {/* Cal.com iframe */}
      <iframe
        src={`https://cal.com/${calLink}?embed=true&theme=dark&locale=es`}
        width="100%"
        height="600"
        frameBorder="0"
        className="bg-[#1a2530]"
        allow="camera; microphone"
      />
    </div>
  );
}

export default CalComBooking;
