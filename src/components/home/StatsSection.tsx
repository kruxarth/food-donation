// src/components/home/StatsSection.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Leaf, Users } from "lucide-react";
import React from "react";

/**
 * @interface Stat
 * @description Defines the structure for a single statistic item.
 */
interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

/**
 * @interface StatsSectionProps
 * @description Props for the StatsSection component. Currently empty.
 */
interface StatsSectionProps {}

const statsData: Stat[] = [
  {
    icon: HandHeart,
    value: "1.2M+",
    label: "Meals Delivered",
  },
  {
    icon: Leaf,
    value: "800k kg",
    label: "CO2 Emissions Saved",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active Donors",
  },
];

/**
 * @component StatsSection
 * @description A section to display key impact statistics of the platform using card components.
 * @param {StatsSectionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered StatsSection component.
 */
const StatsSection: React.FC<StatsSectionProps> = React.memo(() => {
  return (
    <section id="stats" className="w-full bg-white dark:bg-gray-950 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statsData.map((stat, index) => (
            <Card key={index} className="text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center gap-4">
                <stat.icon className="h-10 w-10 text-emerald-600" />
                <CardTitle className="text-4xl font-bold text-gray-900 dark:text-gray-50">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 dark:text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";
export default StatsSection;