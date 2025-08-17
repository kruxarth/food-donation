// / src/components/home/StatsSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Leaf, Users } from "lucide-react";
import React from "react";

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

interface StatsSectionProps {}

const statsData: Stat[] = [
  {
    icon: HandHeart,
    value: "1.2M+",
    label: "Curated Meals Delivered",
    description: "Premium dining experiences shared with those in need"
  },
  {
    icon: Leaf,
    value: "800k kg",
    label: "Carbon Footprint Reduced",
    description: "Environmental stewardship through conscious consumption"
  },
  {
    icon: Users,
    value: "500+",
    label: "Distinguished Partners",
    description: "Elite establishments committed to social responsibility"
  },
];

const StatsSection: React.FC<StatsSectionProps> = React.memo(() => {
  return (
    <section id="stats" className="w-full bg-white dark:bg-gray-950 py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent dark:via-emerald-900/10"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            Extraordinary Impact Through
            <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Collective Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Our community of visionary partners continues to redefine what's possible when innovation meets compassion
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {statsData.map((stat, index) => (
            <Card 
              key={index} 
              className="group text-center bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800 hover:border-emerald-200 dark:hover:border-emerald-700 shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 transform"
            >
              <CardHeader className="flex flex-col items-center gap-6 pt-8">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-5xl font-black text-gray-900 dark:text-gray-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {stat.description}
                </p>
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