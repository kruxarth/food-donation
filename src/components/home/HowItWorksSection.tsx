
// src/components/home/HowItWorksSection.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Truck, Handshake, Sparkles } from "lucide-react";
import React from "react";

interface HowItWorksStep {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
  highlight: string;
}

interface HowItWorksSectionProps {}

const stepsData: HowItWorksStep[] = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Effortless Inventory Curation",
    description: "Our intuitive platform transforms surplus management into a streamlined experience, allowing you to catalog excess inventory with sophisticated ease and precision.",
    highlight: "AI-Powered Matching"
  },
  {
    step: 2,
    icon: Truck,
    title: "White-Glove Logistics Excellence",
    description: "Our premium logistics network orchestrates seamless collection and delivery, ensuring your contributions reach their destination with the utmost care and efficiency.",
    highlight: "Real-Time Tracking"
  },
  {
    step: 3,
    icon: Handshake,
    title: "Meaningful Impact Visualization",
    description: "Receive comprehensive analytics showcasing your social and environmental impact, transforming your generosity into measurable community transformation.",
    highlight: "Impact Certificates"
  },
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = React.memo(() => {
  return (
    <section id="how-it-works" className="w-full bg-gradient-to-br from-emerald-50 via-green-25 to-teal-25 dark:from-gray-900 dark:via-emerald-950/30 dark:to-gray-900 py-20 md:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 px-6 py-3 rounded-full shadow-lg mb-8 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Premium Experience Guaranteed</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-gray-50 mb-6">
            Sophisticated Simplicity
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Redefined
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
            Experience philanthropy elevated through cutting-edge technology and uncompromising attention to detail
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
          {stepsData.map((step, index) => (
            <Card 
              key={step.step} 
              className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative items-center pt-8 pb-4">
                <Badge 
                  variant="secondary" 
                  className="mb-6 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 font-semibold px-4 py-2"
                >
                  {step.highlight}
                </Badge>
                
                <div className="relative p-6 bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900 dark:via-green-900 dark:to-teal-900 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-4 px-6 pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {step.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
