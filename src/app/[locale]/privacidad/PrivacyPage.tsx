'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  const t = useTranslations('privacy');
  const locale = useLocale();

  const lastUpdated = locale === 'es' ? '15 de Enero de 2025' : 'January 15, 2025';

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-alba-dark pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px] opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-black/60 hover:text-gray-900 transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Link>
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-900">
              {t('title')}
            </h1>
            <p className="mt-4 text-black/60">
              {locale === 'es' ? 'Última actualización' : 'Last updated'}: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-alba-dark py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {locale === 'es' ? (
              <SpanishPrivacyContent />
            ) : (
              <EnglishPrivacyContent />
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function SpanishPrivacyContent() {
  return (
    <div className="space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h2>
        <p className="mb-4">
          En Alba Diálisis y Trasplantes, recopilamos información personal para brindarle la mejor atención médica posible. La información que podemos recopilar incluye:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Información de identificación:</strong> Nombre completo, fecha de nacimiento, género, CURP, INE.</li>
          <li><strong>Información de contacto:</strong> Dirección, número de teléfono, correo electrónico.</li>
          <li><strong>Información médica:</strong> Historial médico, diagnósticos, tratamientos, resultados de laboratorio, medicamentos.</li>
          <li><strong>Información de seguro:</strong> Datos de su póliza de seguro médico, si aplica.</li>
          <li><strong>Información de facturación:</strong> Datos necesarios para procesar pagos.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso de la Información</h2>
        <p className="mb-4">Utilizamos su información personal para:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Proporcionar servicios médicos de diálisis y trasplante renal.</li>
          <li>Coordinar su atención con otros proveedores de salud.</li>
          <li>Comunicarnos con usted sobre citas, resultados y tratamientos.</li>
          <li>Procesar pagos y facturación.</li>
          <li>Cumplir con obligaciones legales y regulatorias.</li>
          <li>Mejorar nuestros servicios y la calidad de atención.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Protección de Datos Personales</h2>
        <p className="mb-4">
          De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), implementamos medidas de seguridad administrativas, técnicas y físicas para proteger su información personal contra daño, pérdida, alteración, destrucción o uso no autorizado.
        </p>
        <p>
          Su información médica es tratada como confidencial y solo es accesible al personal autorizado que necesita conocerla para brindarle atención médica.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Derechos ARCO</h2>
        <p className="mb-4">
          Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de sus datos personales. Para ejercer estos derechos, puede:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Enviar un correo electrónico a: <a href="mailto:privacidad@albadialisis.com" className="text-alba-primary hover:underline">privacidad@albadialisis.com</a></li>
          <li>Presentar una solicitud por escrito en cualquiera de nuestras sucursales.</li>
          <li>Llamar a nuestra línea de atención: <a href="tel:4773293939" className="text-alba-primary hover:underline">477-329-39-39</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Compartir Información</h2>
        <p className="mb-4">
          No vendemos ni alquilamos su información personal. Solo compartimos su información con:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Otros profesionales de la salud involucrados en su atención.</li>
          <li>Laboratorios y centros de diagnóstico.</li>
          <li>Su compañía de seguros, si aplica.</li>
          <li>Autoridades gubernamentales cuando sea requerido por ley.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies y Tecnologías de Rastreo</h2>
        <p className="mb-4">
          Nuestro sitio web utiliza cookies y tecnologías similares para:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mejorar su experiencia de navegación.</li>
          <li>Analizar el uso del sitio web.</li>
          <li>Recordar sus preferencias.</li>
        </ul>
        <p className="mt-4">
          Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cambios a esta Política</h2>
        <p>
          Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios serán publicados en esta página con la fecha de actualización correspondiente. Le recomendamos revisar periódicamente esta política.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contacto</h2>
        <p className="mb-4">
          Si tiene preguntas sobre esta política de privacidad o sobre cómo manejamos sus datos personales, contáctenos:
        </p>
        <address className="not-italic">
          <strong>Alba Diálisis y Trasplantes</strong><br />
          Blvd. Campestre 503, Jardines del Moral<br />
          León, Guanajuato, México<br />
          Teléfono: <a href="tel:4773293939" className="text-alba-primary hover:underline">477-329-39-39</a><br />
          Email: <a href="mailto:contacto@albadialisis.com" className="text-alba-primary hover:underline">contacto@albadialisis.com</a>
        </address>
      </section>
    </div>
  );
}

function EnglishPrivacyContent() {
  return (
    <div className="space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          At Alba Dialysis and Transplants, we collect personal information to provide you with the best possible medical care. The information we may collect includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identification information:</strong> Full name, date of birth, gender, government ID.</li>
          <li><strong>Contact information:</strong> Address, phone number, email address.</li>
          <li><strong>Medical information:</strong> Medical history, diagnoses, treatments, laboratory results, medications.</li>
          <li><strong>Insurance information:</strong> Your health insurance policy details, if applicable.</li>
          <li><strong>Billing information:</strong> Data necessary to process payments.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Information</h2>
        <p className="mb-4">We use your personal information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide dialysis and kidney transplant medical services.</li>
          <li>Coordinate your care with other healthcare providers.</li>
          <li>Communicate with you about appointments, results, and treatments.</li>
          <li>Process payments and billing.</li>
          <li>Comply with legal and regulatory obligations.</li>
          <li>Improve our services and quality of care.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Protection</h2>
        <p className="mb-4">
          In accordance with Mexican Federal Law for the Protection of Personal Data Held by Private Parties (LFPDPPP), we implement administrative, technical, and physical security measures to protect your personal information against damage, loss, alteration, destruction, or unauthorized use.
        </p>
        <p>
          Your medical information is treated as confidential and is only accessible to authorized personnel who need to know it to provide you with medical care.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights (ARCO Rights)</h2>
        <p className="mb-4">
          You have the right to Access, Rectify, Cancel, or Object (ARCO Rights) to the processing of your personal data. To exercise these rights, you may:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Send an email to: <a href="mailto:privacidad@albadialisis.com" className="text-alba-primary hover:underline">privacidad@albadialisis.com</a></li>
          <li>Submit a written request at any of our branch locations.</li>
          <li>Call our support line: <a href="tel:4773293939" className="text-alba-primary hover:underline">477-329-39-39</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing</h2>
        <p className="mb-4">
          We do not sell or rent your personal information. We only share your information with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Other healthcare professionals involved in your care.</li>
          <li>Laboratories and diagnostic centers.</li>
          <li>Your insurance company, if applicable.</li>
          <li>Government authorities when required by law.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          Our website uses cookies and similar technologies to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Improve your browsing experience.</li>
          <li>Analyze website usage.</li>
          <li>Remember your preferences.</li>
        </ul>
        <p className="mt-4">
          You can configure your browser to reject cookies, although this may affect the functionality of the site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Policy</h2>
        <p>
          We reserve the right to modify this privacy policy at any time. Changes will be posted on this page with the corresponding update date. We recommend that you periodically review this policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact</h2>
        <p className="mb-4">
          If you have questions about this privacy policy or how we handle your personal data, please contact us:
        </p>
        <address className="not-italic">
          <strong>Alba Dialysis and Transplants</strong><br />
          Blvd. Campestre 503, Jardines del Moral<br />
          León, Guanajuato, Mexico<br />
          Phone: <a href="tel:4773293939" className="text-alba-primary hover:underline">477-329-39-39</a><br />
          Email: <a href="mailto:contacto@albadialisis.com" className="text-alba-primary hover:underline">contacto@albadialisis.com</a>
        </address>
      </section>
    </div>
  );
}

export default PrivacyPage;
