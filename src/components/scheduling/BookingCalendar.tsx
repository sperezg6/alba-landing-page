'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  addDays,
  startOfDay,
  isSameDay,
  isToday,
  isBefore,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, Check, Loader2 } from 'lucide-react';

interface AvailableSlot {
  start: string;
  end: string;
  formatted: string;
}

interface BookingCalendarProps {
  doctorId: string;
  doctorName: string;
  onBookingComplete?: (booking: BookingData) => void;
}

interface BookingData {
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason?: string;
}

type BookingStep = 'date' | 'time' | 'details' | 'confirm' | 'success';

export function BookingCalendar({
  doctorId,
  doctorName,
  onBookingComplete,
}: BookingCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfDay(new Date())
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [availability, setAvailability] = useState<Record<string, AvailableSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState<BookingStep>('date');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    reason: '',
  });

  // Fetch availability for the current week range
  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/scheduling/availability?doctorId=${doctorId}&date=${format(
            currentWeekStart,
            'yyyy-MM-dd'
          )}&range=14`
        );
        const data = await response.json();
        setAvailability(data.availability || {});
      } catch (err) {
        console.error('Failed to fetch availability:', err);
        setError('No se pudo cargar la disponibilidad');
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
  }, [doctorId, currentWeekStart]);

  const goToPreviousWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    if (!isBefore(newStart, startOfDay(new Date()))) {
      setCurrentWeekStart(newStart);
    }
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setBookingStep('time');
  };

  const handleSlotSelect = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
    setBookingStep('details');
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot) return;

    setSubmitting(true);
    setError(null);

    try {
      // Calculate end time (30 min after start)
      const [hours, minutes] = selectedSlot.formatted.split(':').map(Number);
      const endHours = hours + Math.floor((minutes + 30) / 60);
      const endMinutes = (minutes + 30) % 60;
      const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

      const response = await fetch('/api/scheduling/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId,
          date: format(selectedDate, 'yyyy-MM-dd'),
          startTime: selectedSlot.formatted,
          endTime,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingStep('success');
        onBookingComplete?.({
          doctorId,
          doctorName,
          date: format(selectedDate, 'yyyy-MM-dd'),
          startTime: selectedSlot.formatted,
          endTime,
          ...formData,
        });
      } else {
        setError(data.error || 'Error al reservar la cita');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormData({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      reason: '',
    });
    setBookingStep('date');
    setError(null);
  };

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const getDateSlots = (date: Date): AvailableSlot[] => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return availability[dateKey] || [];
  };

  const canGoPrevious = !isBefore(
    addDays(currentWeekStart, -7),
    startOfDay(new Date())
  );

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

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Date */}
          {bookingStep === 'date' && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goToPreviousWeek}
                  disabled={!canGoPrevious}
                  className={`p-2 rounded-lg transition-colors ${
                    canGoPrevious
                      ? 'hover:bg-[rgba(0,0,0,0.06)] text-[#374151]'
                      : 'text-[rgba(0,0,0,0.3)] cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span
                  className="text-lg font-medium text-alba-text"
                >
                  {format(currentWeekStart, 'MMMM yyyy', { locale: es })}
                </span>
                <button
                  onClick={goToNextWeek}
                  className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.06)] transition-colors text-alba-text"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Week Days Grid */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-alba-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-2">
                  {/* Day Headers */}
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium py-2 text-[rgba(0,0,0,0.5)]"
                      >
                        {day}
                      </div>
                    )
                  )}

                  {/* Date Buttons */}
                  {weekDays.map((date) => {
                    const slots = getDateSlots(date);
                    const hasSlots = slots.length > 0;
                    const isPast = isBefore(date, startOfDay(new Date()));
                    const isSelected = selectedDate && isSameDay(date, selectedDate);

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => hasSlots && !isPast && handleDateSelect(date)}
                        disabled={!hasSlots || isPast}
                        className={`
                          relative p-3 rounded-xl text-center transition-all
                          ${
                            isSelected
                              ? 'bg-alba-primary text-white'
                              : hasSlots && !isPast
                              ? 'hover:bg-[rgba(0,0,0,0.06)] text-[#374151]'
                              : 'text-[rgba(0,0,0,0.3)] cursor-not-allowed'
                          }
                        `}
                      >
                        <span className="block text-lg font-medium">
                          {format(date, 'd')}
                        </span>
                        {hasSlots && !isPast && (
                          <span className="block text-[10px] mt-1 text-alba-primary">
                            {slots.length} disp.
                          </span>
                        )}
                        {isToday(date) && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-alba-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Select Time */}
          {bookingStep === 'time' && selectedDate && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setBookingStep('date')}
                className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] hover:text-[#374151] mb-4 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Cambiar fecha
              </button>

              <div className="mb-6">
                <p className="text-[rgba(0,0,0,0.6)] mb-1">Fecha seleccionada</p>
                <p className="text-xl font-medium text-alba-text">
                  {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </p>
              </div>

              <p className="text-[rgba(0,0,0,0.6)] mb-4">
                <Clock className="w-4 h-4 inline mr-2" />
                Horarios disponibles
              </p>

              <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                {getDateSlots(selectedDate).map((slot) => (
                  <button
                    key={slot.formatted}
                    onClick={() => handleSlotSelect(slot)}
                    className={`
                      py-3 px-4 rounded-lg text-center transition-all
                      ${
                        selectedSlot?.formatted === slot.formatted
                          ? 'bg-alba-primary text-white'
                          : 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] text-[#374151]'
                      }
                    `}
                  >
                    {slot.formatted}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Patient Details */}
          {bookingStep === 'details' && selectedDate && selectedSlot && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setBookingStep('time')}
                className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] hover:text-[#374151] mb-4 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Cambiar horario
              </button>

              <div className="mb-6 p-4 bg-[rgba(0,0,0,0.05)] rounded-lg">
                <p className="text-[rgba(0,0,0,0.6)] text-sm">Tu cita</p>
                <p className="font-medium text-alba-text">
                  {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las{' '}
                  {selectedSlot.formatted}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[rgba(0,0,0,0.6)] mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleFormChange}
                    className="w-full bg-transparent border-b border-[rgba(0,0,0,0.2)] text-[#374151] placeholder:text-[rgba(0,0,0,0.3)] py-3 focus:outline-none focus:border-alba-primary transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[rgba(0,0,0,0.6)] mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleFormChange}
                    className="w-full bg-transparent border-b border-[rgba(0,0,0,0.2)] text-[#374151] placeholder:text-[rgba(0,0,0,0.3)] py-3 focus:outline-none focus:border-alba-primary transition-colors"
                    placeholder="email@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[rgba(0,0,0,0.6)] mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="patientPhone"
                    value={formData.patientPhone}
                    onChange={handleFormChange}
                    className="w-full bg-transparent border-b border-[rgba(0,0,0,0.2)] text-[#374151] placeholder:text-[rgba(0,0,0,0.3)] py-3 focus:outline-none focus:border-alba-primary transition-colors"
                    placeholder="+52 123 456 7890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[rgba(0,0,0,0.6)] mb-2">
                    Motivo de la consulta (opcional)
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleFormChange}
                    className="w-full bg-transparent border-b border-[rgba(0,0,0,0.2)] text-[#374151] placeholder:text-[rgba(0,0,0,0.3)] py-3 focus:outline-none focus:border-alba-primary transition-colors resize-none"
                    placeholder="Describe brevemente el motivo de tu consulta"
                    rows={3}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  onClick={() => setBookingStep('confirm')}
                  disabled={
                    !formData.patientName ||
                    !formData.patientEmail ||
                    !formData.patientPhone
                  }
                  className="w-full py-4 bg-alba-primary text-white rounded-lg font-medium hover:bg-alba-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirm */}
          {bookingStep === 'confirm' && selectedDate && selectedSlot && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setBookingStep('details')}
                className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] hover:text-[#374151] mb-4 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Editar datos
              </button>

              <h4
                className="text-xl font-medium mb-6 text-alba-text"
              >
                Confirma tu cita
              </h4>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-[rgba(0,0,0,0.05)] rounded-lg">
                  <p className="text-[rgba(0,0,0,0.6)] text-sm mb-1">Doctor</p>
                  <p className="font-medium text-alba-text">
                    {doctorName}
                  </p>
                </div>

                <div className="p-4 bg-[rgba(0,0,0,0.05)] rounded-lg">
                  <p className="text-[rgba(0,0,0,0.6)] text-sm mb-1">
                    Fecha y hora
                  </p>
                  <p className="font-medium text-alba-text">
                    {format(selectedDate, "EEEE d 'de' MMMM, yyyy", {
                      locale: es,
                    })}{' '}
                    a las {selectedSlot.formatted}
                  </p>
                </div>

                <div className="p-4 bg-[rgba(0,0,0,0.05)] rounded-lg">
                  <p className="text-[rgba(0,0,0,0.6)] text-sm mb-1">Paciente</p>
                  <p className="font-medium text-alba-text">
                    {formData.patientName}
                  </p>
                  <p className="text-[rgba(0,0,0,0.6)] text-sm">
                    {formData.patientEmail}
                  </p>
                  <p className="text-[rgba(0,0,0,0.6)] text-sm">
                    {formData.patientPhone}
                  </p>
                </div>

                {formData.reason && (
                  <div className="p-4 bg-[rgba(0,0,0,0.05)] rounded-lg">
                    <p className="text-[rgba(0,0,0,0.6)] text-sm mb-1">Motivo</p>
                    <p className="text-alba-text">{formData.reason}</p>
                  </div>
                )}
              </div>

              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-4 bg-alba-primary text-white rounded-lg font-medium hover:bg-alba-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reservando...
                  </>
                ) : (
                  'Confirmar Cita'
                )}
              </button>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {bookingStep === 'success' && selectedDate && selectedSlot && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>

              <h4
                className="text-2xl font-medium mb-2 text-alba-text"
              >
                ¡Cita Reservada!
              </h4>

              <p className="text-[rgba(0,0,0,0.6)] mb-6">
                Tu cita con {doctorName} ha sido confirmada para el{' '}
                {format(selectedDate, "d 'de' MMMM", { locale: es })} a las{' '}
                {selectedSlot.formatted}
              </p>

              <p className="text-[rgba(0,0,0,0.5)] text-sm mb-8">
                Recibirás un correo de confirmación en {formData.patientEmail}
              </p>

              <button
                onClick={resetBooking}
                className="px-6 py-3 border border-[rgba(0,0,0,0.2)] text-[#374151] rounded-lg hover:bg-[rgba(0,0,0,0.06)] transition-colors"
              >
                Reservar otra cita
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BookingCalendar;
