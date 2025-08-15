// src/pages/HomePage.tsx

import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PartnerLogos from "@/components/home/PartnerLogos";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

/**
 * The main home page component for the food donation platform.
 * It assembles all the distinct sections of the page in a sequential order.
 * @returns {JSX.Element} The rendered home page.
 */
const HomePage = () => {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PartnerLogos />
    </main>
  );
};

export default HomePage;