// src/components/home/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = React.memo(() => {
  const navigate = useNavigate();
  
  const handleDonateClick = () => {
    navigate("/login");
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-emerald-50 via-emerald-25 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative container mx-auto grid min-h-[85vh] grid-cols-1 items-center gap-12 px-4 py-20 text-center md:grid-cols-2 md:py-32 md:text-left">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
            ✨ Transforming Communities, One Meal at a Time
          </div>
          
          <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl md:text-7xl lg:text-8xl leading-none">
            Elevate Surplus into
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
              Meaningful Impact
            </span>
          </h1>
          
          <p className="mx-auto max-w-[650px] text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mx-0 font-light">
            Our sophisticated platform seamlessly connects forward-thinking businesses with charitable organizations, creating an elegant solution to food waste while nourishing communities nationwide.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group"
              onClick={handleDonateClick}
              aria-label="Begin Your Impact Journey"
            >
              Begin Your Impact Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-200 hover:border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20 font-semibold px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-md"
              aria-label="Discover Our Mission"
            >
              Discover Our Mission
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-800 dark:to-green-800 rounded-full opacity-20 animate-pulse"></div>
          <UtensilsCrossed
            className="relative h-80 w-80 text-emerald-300 dark:text-emerald-700 animate-float"
            strokeWidth={0.8}
          />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;