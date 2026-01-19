import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: Simple in-memory store (use Redis in production for multi-instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean up expired entries periodically
  if (Math.random() < 0.1) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) rateLimitStore.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
  }

  record.count++;
  return { allowed: true };
}

// Validation schema with security constraints
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20).regex(/^[\d\s\-\+\(\)]+$/, 'Formato de teléfono inválido'),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  // Honeypot field - accepts any value but triggers silent block if filled
  // This makes bots think submission succeeded (no validation error)
  website: z.string().max(500).optional(),
});

// Alba Brand Colors
const colors = {
  primary: '#E85A2C',
  primaryLight: '#F4A261',
  dark: '#2B3A42',
  darkLight: '#364954',
  cream: '#FAF9F6',
  sage: '#6B8E7D',
  text: '#374151',
  muted: '#6B7280',
  border: '#E5E7EB',
};

// Generate team notification email HTML
function generateTeamNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  const { name, email, phone, subject, message } = data;
  const currentDate = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

  <!-- Outer Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${colors.cream};">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #ffffff;">

          <!-- Header -->
          <tr>
            <td style="background-color: ${colors.dark}; padding: 48px 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.5);">Nuevo Mensaje</p>
                    <h1 style="margin: 0; font-size: 32px; font-weight: 300; color: #ffffff; line-height: 1.2;">
                      Un nuevo paciente<br>
                      <span style="color: ${colors.primary}; font-weight: 600;">te espera.</span>
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Date Bar -->
          <tr>
            <td style="background-color: ${colors.primary}; padding: 12px 40px;">
              <p style="margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.9);">
                ${escapeHtml(currentDate)}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">

              <!-- Contact Info Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 40px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 24px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.muted};">
                      <span style="display: inline-block; width: 24px; height: 1px; background-color: ${colors.primary}; vertical-align: middle; margin-right: 12px;"></span>
                      Información de Contacto
                    </p>
                  </td>
                </tr>

                <!-- Name -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${colors.muted};">Nombre</p>
                    <p style="margin: 0; font-size: 20px; font-weight: 500; color: ${colors.dark};">${escapeHtml(name)}</p>
                  </td>
                </tr>

                <!-- Email & Phone Row -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="50%" style="padding-bottom: 20px; padding-right: 16px;">
                          <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${colors.muted};">Email</p>
                          <a href="mailto:${escapeHtml(email)}" style="font-size: 15px; color: ${colors.primary}; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a>
                        </td>
                        <td width="50%" style="padding-bottom: 20px;">
                          <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${colors.muted};">Teléfono</p>
                          <a href="tel:${escapeHtml(phone)}" style="font-size: 15px; color: ${colors.dark}; text-decoration: none; font-weight: 500;">${escapeHtml(phone)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Subject -->
                <tr>
                  <td style="padding-bottom: 8px;">
                    <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${colors.muted};">Asunto</p>
                    <p style="margin: 0; font-size: 15px; color: ${colors.dark}; font-weight: 500;">${escapeHtml(subject)}</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 40px;">
                <tr>
                  <td style="border-top: 1px solid ${colors.border};"></td>
                </tr>
              </table>

              <!-- Message Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 24px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.muted};">
                      <span style="display: inline-block; width: 24px; height: 1px; background-color: ${colors.primary}; vertical-align: middle; margin-right: 12px;"></span>
                      Mensaje
                    </p>
                    <div style="background-color: ${colors.cream}; padding: 24px; border-left: 3px solid ${colors.primary};">
                      <p style="margin: 0; font-size: 15px; line-height: 1.7; color: ${colors.text}; white-space: pre-wrap;">${escapeHtml(message)}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- CTA Section -->
          <tr>
            <td style="padding: 0 40px 48px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(subject)}" style="display: inline-block; background-color: ${colors.primary}; color: #ffffff; padding: 16px 32px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; text-decoration: none;">
                      Responder Ahora →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${colors.dark}; padding: 32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: ${colors.primary}; letter-spacing: 2px;">ALBA</p>
                    <p style="margin: 0 0 16px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.5);">Diálisis y Trasplantes</p>
                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.4);">
                      Este mensaje fue enviado desde albadialisis.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// Generate user confirmation email HTML
function generateUserConfirmationEmail(data: {
  name: string;
  subject: string;
}): string {
  const { name, subject } = data;
  const firstName = name.split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Hemos recibido tu mensaje</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

  <!-- Outer Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${colors.cream};">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #ffffff;">

          <!-- Hero Section -->
          <tr>
            <td style="background-color: ${colors.dark}; padding: 56px 40px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <!-- Logo -->
                    <p style="margin: 0 0 32px; font-size: 20px; font-weight: 600; color: ${colors.primary}; letter-spacing: 3px;">ALBA</p>

                    <!-- Headline -->
                    <h1 style="margin: 0 0 16px; font-size: 36px; font-weight: 300; color: #ffffff; line-height: 1.2;">
                      Gracias,<br>
                      <span style="font-weight: 600;">${escapeHtml(firstName)}.</span>
                    </h1>

                    <p style="margin: 0; font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                      Tu mensaje ha sido recibido.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent Bar -->
          <tr>
            <td style="background-color: ${colors.primary}; height: 4px;"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">

              <!-- Message -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; color: ${colors.text};">
                      Hemos recibido tu mensaje sobre <strong>"${escapeHtml(subject)}"</strong> y nuestro equipo lo revisará pronto.
                    </p>

                    <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.7; color: ${colors.text};">
                      Nos pondremos en contacto contigo lo antes posible. Mientras tanto, si tienes alguna urgencia, no dudes en llamarnos.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What to Expect -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 40px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 20px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.muted};">
                      <span style="display: inline-block; width: 24px; height: 1px; background-color: ${colors.primary}; vertical-align: middle; margin-right: 12px;"></span>
                      Qué esperar
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid ${colors.border};">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                                <span style="display: inline-block; width: 28px; height: 28px; background-color: ${colors.cream}; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: 600; color: ${colors.dark};">01</span>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: ${colors.dark};">Revisión</p>
                                <p style="margin: 0; font-size: 14px; color: ${colors.muted};">Tu mensaje será revisado por nuestro equipo</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid ${colors.border};">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                                <span style="display: inline-block; width: 28px; height: 28px; background-color: ${colors.cream}; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: 600; color: ${colors.dark};">02</span>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: ${colors.dark};">Respuesta</p>
                                <p style="margin: 0; font-size: 14px; color: ${colors.muted};">Te contactaremos en un plazo de 24-48 horas</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                                <span style="display: inline-block; width: 28px; height: 28px; background-color: ${colors.cream}; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: 600; color: ${colors.dark};">03</span>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: ${colors.dark};">Solución</p>
                                <p style="margin: 0; font-size: 14px; color: ${colors.muted};">Trabajaremos juntos para ayudarte</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="border-top: 1px solid ${colors.border};"></td>
                </tr>
              </table>

              <!-- Emergency Contact -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${colors.cream}; padding: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td>
                          <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.muted};">¿Necesitas atención urgente?</p>
                          <p style="margin: 0 0 16px; font-size: 15px; color: ${colors.text};">Llámanos directamente, estamos para ti.</p>
                          <a href="tel:4773293939" style="display: inline-block; font-size: 24px; font-weight: 600; color: ${colors.primary}; text-decoration: none;">
                            477 329 3939
                          </a>
                          <p style="margin: 8px 0 0; font-size: 12px; color: ${colors.muted};">Emergencias 24/7</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${colors.dark}; padding: 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: ${colors.primary}; letter-spacing: 2px;">ALBA</p>
                    <p style="margin: 0 0 24px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.5);">Diálisis y Trasplantes</p>

                    <p style="margin: 0 0 8px; font-size: 13px; color: rgba(255,255,255,0.7);">León, Guanajuato</p>
                    <p style="margin: 0 0 24px; font-size: 13px; color: rgba(255,255,255,0.5);">
                      <a href="https://albadialisis.com" style="color: ${colors.primary}; text-decoration: none;">albadialisis.com</a>
                    </p>

                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3); font-style: italic;">
                      "Aquí comienza tu nuevo amanecer."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ||
               headersList.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor espera un momento.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfter) }
        }
      );
    }

    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, website } = result.data;

    // Honeypot check - if filled, silently accept but don't send
    if (website && website.length > 0) {
      // Bot detected - pretend success but do nothing
      return NextResponse.json({ success: true, messageId: 'blocked' });
    }

    // Sanitize subject for email header injection (remove newlines)
    const sanitizedSubject = subject.replace(/[\r\n]/g, ' ').trim();

    // Send email to Alba team
    // Note: Using Resend test sender until albadialisis.com domain is verified
    const fromEmail = process.env.NODE_ENV === 'production'
      ? 'Alba Diálisis <contacto@albadialisis.com>'
      : 'Alba Diálisis <onboarding@resend.dev>';

    // In development, send to test email; in production, send to Alba team
    const toEmail = process.env.NODE_ENV === 'production'
      ? 'info@albadialisis.com'
      : 'spg1824@gmail.com';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${sanitizedSubject}`,
      html: generateTeamNotificationEmail({ name, email, phone, subject: sanitizedSubject, message }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor intenta de nuevo.' },
        { status: 500 }
      );
    }

    // Optionally send confirmation email to the user
    // In dev mode, only send to test email due to Resend restrictions
    const confirmationTo = process.env.NODE_ENV === 'production'
      ? email
      : 'spg1824@gmail.com';

    await resend.emails.send({
      from: fromEmail,
      to: [confirmationTo],
      subject: 'Hemos recibido tu mensaje - Alba Diálisis',
      html: generateUserConfirmationEmail({ name, subject: sanitizedSubject }),
    });

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
