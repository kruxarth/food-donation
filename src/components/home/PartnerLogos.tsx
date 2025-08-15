// src/components/home/PartnerLogos.tsx

import { Sprout, Building, Utensils } from "lucide-react";
import React from "react";

/**
 * @interface Partner
 * @description Defines the structure for a partner logo item.
 */
interface Partner {
  name: string;
  icon: React.ElementType;
}

/**
 * @interface PartnerLogosProps
 * @description Props for the PartnerLogos component.
 */
interface PartnerLogosProps {}

const partnersData: Partner[] = [
    { name: "GreenLeaf Grocers", icon: Sprout },
    { name: "Urban Eats", icon: Building },
    { name: "Community Kitchen", icon: Utensils },
    { name: "FarmFresh Co.", icon: Sprout },
    { name: "City Harvest", icon: Building },
    { name: "Daily Bread Bank", icon: Utensils },
];

/**
 * @component PartnerLogos
 * @description A section to display logos of partner organizations, enhancing credibility.
 * @param {PartnerLogosProps} props - The props for the component.
 * @returns {JSX.Element} The rendered PartnerLogos component.
 */
const PartnerLogos: React.FC<PartnerLogosProps> = React.memo(() => {
  return (
    <section id="partners" className="w-full bg-emerald-50 dark:bg-gray-900/50 py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-base font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          Trusted by leading organizations
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
          {partnersData.map((partner) => (
            <div key={partner.name} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label={`Partner: ${partner.name}`}>
              <partner.icon className="h-7 w-7" />
              <span className="text-lg font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

PartnerLogos.displayName = "PartnerLogos";
export default PartnerLogos;