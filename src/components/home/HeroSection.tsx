
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * @interface HeroSectionProps
 * @description Props for the HeroSection component. Currently empty.
 */
interface HeroSectionProps {}


 
const HeroSection: React.FC<HeroSectionProps> = React.memo(() => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/login"); // navigates to LoginPage without full reload
  };


  return (
    <section className="w-full bg-emerald-50 dark:bg-gray-900/50">
      <div className="container mx-auto grid min-h-[70vh] grid-cols-1 items-center gap-8 px-4 py-16 text-center md:grid-cols-2 md:py-24 md:text-left">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl lg:text-7xl">
            Turn Surplus into Supper.
            <br />
            <span className="text-emerald-600">Fight Hunger, Not Waste.</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-gray-600 dark:text-gray-400 md:mx-0">
            Our platform connects businesses with surplus food to charities and food banks, making it easy to donate, reduce waste, and make a real impact in your community.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleDonateClick}
              aria-label="Donate Food Now"
            >
              Donate Food Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-label="Learn more about our mission"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
            <UtensilsCrossed
                className="h-64 w-64 text-emerald-200 dark:text-emerald-800/50"
                strokeWidth={1}
            />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;