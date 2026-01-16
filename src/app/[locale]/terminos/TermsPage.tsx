'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
  const t = useTranslations('terms');
  const locale = useLocale();

  const lastUpdated = locale === 'es' ? '15 de enero de 2025' : 'January 15, 2025';

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-alba-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Link>
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-white">
              {t('title')}
            </h1>
            <p className="mt-4 text-white/60">
              {locale === 'es' ? 'Ultima actualizacion' : 'Last updated'}: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-creme-inversa py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {locale === 'es' ? (
              <SpanishTermsContent />
            ) : (
              <EnglishTermsContent />
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function SpanishTermsContent() {
  return (
    <div className="space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceptacion de los Terminos</h2>
        <p>
          Al acceder y utilizar el sitio web de Alba Dialisis y Trasplantes (albadialisis.com), usted acepta estos Terminos y Condiciones de Uso. Si no esta de acuerdo con alguno de estos terminos, le pedimos que no utilice nuestro sitio web. El uso continuado del sitio constituye la aceptacion de cualquier modificacion a estos terminos.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descripcion de los Servicios</h2>
        <p className="mb-4">
          Alba Dialisis y Trasplantes es una clinica especializada en servicios de nefrologia que incluyen:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hemodialisis y hemodiafiltracion</li>
          <li>Dialisis peritoneal</li>
          <li>Consulta nefrologica</li>
          <li>Evaluacion y preparacion para trasplante renal</li>
          <li>Seguimiento post-trasplante</li>
          <li>Atencion de urgencias nefrologicas</li>
        </ul>
        <p className="mt-4">
          Este sitio web proporciona informacion sobre nuestros servicios y permite solicitar citas. No sustituye la consulta medica profesional.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso Apropiado del Sitio</h2>
        <p className="mb-4">Usted se compromete a:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Proporcionar informacion veraz y actualizada.</li>
          <li>No utilizar el sitio para fines ilegales o no autorizados.</li>
          <li>No intentar acceder a areas restringidas del sitio.</li>
          <li>No interferir con el funcionamiento del sitio.</li>
          <li>No enviar contenido malicioso o danino.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Citas y Servicios Medicos</h2>
        <p className="mb-4">
          Al solicitar una cita a traves de nuestro sitio web:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>La confirmacion de la cita esta sujeta a disponibilidad.</li>
          <li>Debe proporcionar informacion de contacto valida.</li>
          <li>Las cancelaciones deben realizarse con al menos 24 horas de anticipacion.</li>
          <li>Nos reservamos el derecho de reprogramar citas por causas de fuerza mayor.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Informacion Medica</h2>
        <p className="mb-4">
          La informacion proporcionada en este sitio web tiene fines informativos unicamente y no debe considerarse como:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Diagnostico medico.</li>
          <li>Tratamiento o prescripcion medica.</li>
          <li>Sustituto de la consulta con un profesional de la salud.</li>
        </ul>
        <p className="mt-4">
          Siempre consulte a un medico calificado para obtener asesoramiento sobre su condicion de salud especifica.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Propiedad Intelectual</h2>
        <p>
          Todo el contenido de este sitio web, incluyendo textos, imagenes, logos, graficos y software, es propiedad de Alba Dialisis y Trasplantes o sus licenciantes, y esta protegido por las leyes de propiedad intelectual de Mexico y tratados internacionales. Queda prohibida su reproduccion, distribucion o modificacion sin autorizacion previa por escrito.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitacion de Responsabilidad</h2>
        <p className="mb-4">
          Alba Dialisis y Trasplantes no sera responsable por:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Danos directos, indirectos, incidentales o consecuentes derivados del uso del sitio.</li>
          <li>Errores u omisiones en el contenido del sitio.</li>
          <li>Interrupciones en el servicio del sitio web.</li>
          <li>Virus u otros componentes daninos que puedan afectar su equipo.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Enlaces a Terceros</h2>
        <p>
          Este sitio puede contener enlaces a sitios web de terceros. No somos responsables del contenido, politicas de privacidad o practicas de estos sitios externos. Le recomendamos revisar los terminos y politicas de cualquier sitio que visite.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos Terminos y Condiciones en cualquier momento. Las modificaciones entraran en vigor inmediatamente despues de su publicacion en el sitio web. Su uso continuado del sitio despues de dichos cambios constituye su aceptacion de los nuevos terminos.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Ley Aplicable y Jurisdiccion</h2>
        <p>
          Estos Terminos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia derivada de estos terminos sera resuelta por los tribunales competentes de la ciudad de Leon, Guanajuato, Mexico, renunciando expresamente a cualquier otro fuero que pudiera corresponderle.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contacto</h2>
        <p className="mb-4">
          Para cualquier pregunta sobre estos Terminos y Condiciones, contactenos:
        </p>
        <address className="not-italic">
          <strong>Alba Dialisis y Trasplantes</strong><br />
          Blvd. Campestre 503, Jardines del Moral<br />
          Leon, Guanajuato, Mexico<br />
          Telefono: <a href="tel:4773293939" className="text-alba-primary hover:underline">477-329-39-39</a><br />
          Email: <a href="mailto:contacto@albadialisis.com" className="text-alba-primary hover:underline">contacto@albadialisis.com</a>
        </address>
      </section>
    </div>
  );
}

function EnglishTermsContent() {
  return (
    <div className="space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Alba Dialysis and Transplants website (albadialisis.com), you accept these Terms and Conditions of Use. If you do not agree with any of these terms, please do not use our website. Continued use of the site constitutes acceptance of any modifications to these terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
        <p className="mb-4">
          Alba Dialysis and Transplants is a clinic specialized in nephrology services including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hemodialysis and hemodiafiltration</li>
          <li>Peritoneal dialysis</li>
          <li>Nephrology consultation</li>
          <li>Kidney transplant evaluation and preparation</li>
          <li>Post-transplant follow-up</li>
          <li>Nephrology emergency care</li>
        </ul>
        <p className="mt-4">
          This website provides information about our services and allows appointment requests. It does not substitute professional medical consultation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Appropriate Use of the Site</h2>
        <p className="mb-4">You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide truthful and up-to-date information.</li>
          <li>Not use the site for illegal or unauthorized purposes.</li>
          <li>Not attempt to access restricted areas of the site.</li>
          <li>Not interfere with the operation of the site.</li>
          <li>Not send malicious or harmful content.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Appointments and Medical Services</h2>
        <p className="mb-4">
          When requesting an appointment through our website:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Appointment confirmation is subject to availability.</li>
          <li>You must provide valid contact information.</li>
          <li>Cancellations must be made at least 24 hours in advance.</li>
          <li>We reserve the right to reschedule appointments due to force majeure.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Medical Information</h2>
        <p className="mb-4">
          The information provided on this website is for informational purposes only and should not be considered as:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Medical diagnosis.</li>
          <li>Medical treatment or prescription.</li>
          <li>A substitute for consultation with a healthcare professional.</li>
        </ul>
        <p className="mt-4">
          Always consult a qualified physician for advice about your specific health condition.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
        <p>
          All content on this website, including texts, images, logos, graphics, and software, is the property of Alba Dialysis and Transplants or its licensors, and is protected by Mexican intellectual property laws and international treaties. Reproduction, distribution, or modification without prior written authorization is prohibited.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">
          Alba Dialysis and Transplants shall not be liable for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Direct, indirect, incidental, or consequential damages arising from the use of the site.</li>
          <li>Errors or omissions in the site content.</li>
          <li>Interruptions in website service.</li>
          <li>Viruses or other harmful components that may affect your equipment.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
        <p>
          This site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. We recommend reviewing the terms and policies of any site you visit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time. Modifications will take effect immediately upon posting on the website. Your continued use of the site after such changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Applicable Law and Jurisdiction</h2>
        <p>
          These Terms and Conditions are governed by the laws of the United Mexican States. Any controversy arising from these terms shall be resolved by the competent courts of the city of Leon, Guanajuato, Mexico, expressly waiving any other jurisdiction that may apply.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact</h2>
        <p className="mb-4">
          For any questions about these Terms and Conditions, please contact us:
        </p>
        <address className="not-italic">
          <strong>Alba Dialysis and Transplants</strong><br />
          Blvd. Campestre 503, Jardines del Moral<br />
          Leon, Guanajuato, Mexico<br />
          Phone: <a href="tel:4773293939" className="text-alba-primary hover:underline">477-329-39-39</a><br />
          Email: <a href="mailto:contacto@albadialisis.com" className="text-alba-primary hover:underline">contacto@albadialisis.com</a>
        </address>
      </section>
    </div>
  );
}

export default TermsPage;
