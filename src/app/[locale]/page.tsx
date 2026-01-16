import { setRequestLocale } from 'next-intl/server';
import {
  HeroWrapper,
  ServicesShowcase,
  NutritionChatbotBanner,
  DoctorShowcase,
  TestimonialsEditorial,
  CTAFinal,
} from '@/components/home';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      {/* Section 1: Hero + Scroll Section (Continuous background with multiple bullet points) */}
      <HeroWrapper />

      {/* Section 2: Services Showcase */}
      <ServicesShowcase />

      {/* Section 3: Doctor Showcase - Split Screen */}
      <DoctorShowcase />

      {/* Section 4: Editorial Testimonials */}
      <TestimonialsEditorial />

      {/* Section 5: Nutrition Chatbot Banner */}
      <NutritionChatbotBanner />

      {/* Section 6: Final CTA - Cinematic */}
      <CTAFinal />
    </main>
  );
}
