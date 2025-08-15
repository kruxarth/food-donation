// src/components/home/HowItWorksSection.tsx

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Truck, Handshake } from "lucide-react";
import React from "react";

/**
 * @interface HowItWorksStep
 * @description Defines the structure for a single step in the "How It Works" process.
 */
interface HowItWorksStep {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

/**
 * @interface HowItWorksSectionProps
 * @description Props for the HowItWorksSection component.
 */
interface HowItWorksSectionProps {}

const stepsData: HowItWorksStep[] = [
  {
    step: 1,
    icon: ClipboardList,
    title: "List Your Surplus Food",
    description: "Use our simple form to list excess food items from your restaurant, cafe, or store in just a few minutes.",
  },
  {
    step: 2,
    icon: Truck,
    title: "We Handle Pickup & Delivery",
    description: "Our logistics partners are notified instantly. We coordinate a seamless pickup and deliver it safely to a local charity.",
  },
  {
    step: 3,
    icon: Handshake,
    title: "Make a Real Impact",
    description: "You'll receive a report detailing your donation's impact, including meals provided and environmental benefits.",
  },
];

/**
 * @component HowItWorksSection
 * @description Explains the food donation process in three simple steps, building user confidence.
 * @param {HowItWorksSectionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered HowItWorksSection component.
 */
const HowItWorksSection: React.FC<HowItWorksSectionProps> = React.memo(() => {
  return (
    <section id="how-it-works" className="w-full bg-emerald-50 dark:bg-gray-900/50 py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Donating is as Easy as 1-2-3
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          We've streamlined the process to make food donation effortless and efficient.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step) => (
            <Card key={step.step} className="flex flex-col items-center p-6 text-center shadow-sm">
              <CardHeader className="items-center">
                <Badge variant="secondary" className="mb-4 text-sm">Step {step.step}</Badge>
                <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900">
                  <step.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
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