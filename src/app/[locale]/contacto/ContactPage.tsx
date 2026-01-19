'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { z } from 'zod';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  CheckCircle,
  Send,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { branches, whatsappNumber } from '@/lib/data';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Correo electronico invalido'),
  phone: z.string().min(10, 'Telefono invalido'),
  subject: z.string().min(3, 'El asunto es requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  // Honeypot field - should always be empty (bots fill all fields)
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Animated input component with expanding underline
function AnimatedInput({
  label,
  type = 'text',
  placeholder,
  error,
  ...props
}: {
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  [key: string]: unknown;
}) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className="w-full px-0 py-3 bg-transparent border-b border-gray-900/20 outline-none text-gray-900 placeholder:text-gray-400 peer"
          placeholder={placeholder}
          {...props}
        />
        {/* Animated underline that expands from center on focus */}
        <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gray-900 transition-all duration-300 ease-out peer-focus:w-full peer-focus:left-0" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Animated textarea component
function AnimatedTextarea({
  label,
  placeholder,
  error,
  rows = 5,
  ...props
}: {
  label: string;
  placeholder: string;
  error?: string;
  rows?: number;
  [key: string]: unknown;
}) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          rows={rows}
          className="w-full px-0 py-3 bg-transparent border-b border-gray-900/20 outline-none text-gray-900 placeholder:text-gray-400 resize-none peer"
          placeholder={placeholder}
          {...props}
        />
        {/* Animated underline that expands from center on focus */}
        <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gray-900 transition-all duration-300 ease-out peer-focus:w-full peer-focus:left-0" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export function ContactPage() {
  const t = useTranslations();
  const posthog = usePostHog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      website: '', // Honeypot - must stay empty
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el mensaje');
      }

      posthog.capture('contact_form_submitted', {
        subject: data.subject,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Contact form error:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.'
      );
      posthog.capture('contact_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    reset();
  };

  return (
    <>
      {/* Hero Section - Minimal Dark */}
      <section className="relative bg-alba-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider">
                {t('contact.title')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight" style={{ color: 'white' }}>
              {t('contact.subtitle')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-creme-alba py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Form */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Formulario
                </span>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-900/10 p-10 md:p-12"
                >
                  <div className="w-16 h-16 border border-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                    Mensaje enviado
                  </h3>
                  <p className="text-gray-500 mb-8">
                    {t('contact.form.success')}
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-300"
                  >
                    Enviar otro mensaje
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <AnimatedInput
                    label={t('contact.form.name')}
                    placeholder="Tu nombre completo"
                    error={errors.name?.message}
                    {...register('name')}
                  />

                  <AnimatedInput
                    label={t('contact.form.email')}
                    type="email"
                    placeholder="tu@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <AnimatedInput
                    label={t('contact.form.phone')}
                    type="tel"
                    placeholder="477-123-4567"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />

                  <AnimatedInput
                    label={t('contact.form.subject')}
                    placeholder="Asunto de tu mensaje"
                    error={errors.subject?.message}
                    {...register('subject')}
                  />

                  <AnimatedTextarea
                    label={t('contact.form.message')}
                    placeholder="Escribe tu mensaje aqui..."
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div
                    className="absolute opacity-0 pointer-events-none"
                    style={{ position: 'absolute', left: '-9999px' }}
                    aria-hidden="true"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      autoComplete="off"
                      tabIndex={-1}
                      {...register('website')}
                    />
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-red-200 bg-red-50"
                    >
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-alba-primary hover:bg-alba-primary-dark text-black px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column - Contact Info */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {t('contact.info.title')}
                </span>
              </div>

              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-gray-900/10 p-6 hover:border-gray-900/30 transition-colors"
                  onClick={() => posthog.capture('whatsapp_clicked', {
                    source: 'contact_page',
                  })}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                        {t('contact.info.whatsapp')}
                      </p>
                      <p className="text-xl md:text-2xl font-light text-gray-900">
                        477-329-39-39
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Respuesta inmediata
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:4773293939"
                  className="group block border border-gray-900/10 p-6 hover:border-gray-900/30 transition-colors"
                  onClick={() => posthog.capture('phone_clicked', {
                    phone_number: '477-329-39-39',
                    source: 'contact_page',
                  })}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                        {t('contact.info.mainPhone')}
                      </p>
                      <p className="text-xl md:text-2xl font-light text-gray-900">
                        477-329-39-39
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Emergencias 24/7
                      </p>
                    </div>
                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contacto@albadialisis.com"
                  className="group block border border-gray-900/10 p-6 hover:border-gray-900/30 transition-colors"
                  onClick={() => posthog.capture('email_clicked', {
                    email: 'contacto@albadialisis.com',
                    source: 'contact_page',
                  })}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                        {t('contact.info.email')}
                      </p>
                      <p className="text-xl md:text-2xl font-light text-gray-900">
                        contacto@albadialisis.com
                      </p>
                    </div>
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </a>

                {/* Hours */}
                <div className="border border-gray-900/10 p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                        {t('branches.hours')}
                      </p>
                      <p className="text-lg font-light text-gray-900">
                        {t('branches.hoursValue')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section with Gradient Blob Background */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        {/* Gradient blob background image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/gradient-blob.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-gray-900" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {t('branches.title')}
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-900/10 border border-gray-900/10">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 group"
              >
                <span className="text-xs font-medium text-gray-400 tracking-wider mb-4 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {branch.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {branch.address}
                </p>
                <p className="text-sm text-gray-900 mb-4">
                  {branch.phone}
                </p>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  {t('branches.getDirections')}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/sucursales"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-300"
            >
              {t('branches.viewAll')}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
