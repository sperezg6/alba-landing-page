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
    <main className="relative bg-alba-dark">
      {/* Section 1: Hero + Scroll Section (Continuous background with multiple bullet points) */}
      <HeroWrapper />

      {/* Section 2: Services Showcase — pulled up under hero rounded corners */}
      <div className="-mt-[100px] relative z-10">
        <ServicesShowcase />
      </div>

      {/* Section 3: Doctor Showcase — cream background with blobs */}
      <DoctorShowcase />

      {/* Sections 4–6: Shared diagonal gradient background — flows continuously */}
      <div className="pb-[48px] md:pb-[64px]" style={{ background: 'linear-gradient(135deg, rgba(77,189,201,0.20) 0%, #FAFAF7 48%, rgba(245,159,32,0.48) 100%)' }}>
        <TestimonialsEditorial />
        <NutritionChatbotBanner />
        <CTAFinal />
      </div>
    </main>
  );
}
