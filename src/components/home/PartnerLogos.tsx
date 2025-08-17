
// src/components/home/PartnerLogos.tsx
import { Sprout, Building, Utensils, Crown, Award, Shield } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Partner {
  name: string;
  icon: React.ElementType;
  category: string;
}

interface PartnerLogosProps {}

const partnersData: Partner[] = [
  { name: "Verdant Provisions", icon: Sprout, category: "Premium Grocers" },
  { name: "Metropolitan Culinary", icon: Building, category: "Fine Dining" },
  { name: "Artisan Kitchens Collective", icon: Utensils, category: "Boutique Eateries" },
  { name: "Heritage Harvest Co.", icon: Crown, category: "Luxury Markets" },
  { name: "Pinnacle Food Group", icon: Award, category: "Corporate Catering" },
  { name: "Elite Provisions Network", icon: Shield, category: "Premium Suppliers" },
  { name: "Conscious Cuisine Hub", icon: Sprout, category: "Sustainable Dining" },
  { name: "Gourmet Gallery", icon: Building, category: "Specialty Stores" }
];

const PartnerLogos: React.FC<PartnerLogosProps> = React.memo(() => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (partnersData.length * 200));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="partners" className="w-full bg-gradient-to-br from-emerald-50 via-green-25 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-950 py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-300 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-300 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="text-base font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4">
            Distinguished Partnership Network
          </h2>
          <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-50">
            Trusted by Industry
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Pioneers
            </span>
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex items-center gap-16 animate-scroll"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              width: `${partnersData.length * 300}px`
            }}
          >
            {[...partnersData, ...partnersData].map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 group flex flex-col items-center gap-3 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-all duration-300 hover:scale-110 transform cursor-pointer"
                aria-label={`Partner: ${partner.name}`}
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-emerald-100 dark:border-emerald-800 group-hover:border-emerald-300 dark:group-hover:border-emerald-600">
                  <partner.icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold block">{partner.name}</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
            Join an exclusive network of forward-thinking organizations committed to sustainable excellence and social responsibility
          </p>
        </div>
      </div>
    </section>
  );
});

PartnerLogos.displayName = "PartnerLogos";
export default PartnerLogos;