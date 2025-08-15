// src/components/home/TestimonialsSection.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

/**
 * @interface Testimonial
 * @description Defines the structure for a single testimonial item.
 */
interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  fallback: string;
  quote: string;
}

/**
 * @interface TestimonialsSectionProps
 * @description Props for the TestimonialsSection component.
 */
interface TestimonialsSectionProps {}

const testimonialsData: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Owner, The Curry Leaf Bistro",
    avatar: "https://i.pravatar.cc/150?img=1", // Placeholder image
    fallback: "PS",
    quote: "This platform transformed our food waste problem into a community benefit. The process is incredibly simple, and knowing our surplus food is helping people is the best feeling. A must-have for any restaurant.",
  },
  {
    name: "Rajesh Kumar",
    role: "Coordinator, Helping Hands Foundation",
    avatar: "https://i.pravatar.cc/150?img=2", // Placeholder image
    fallback: "RK",
    quote: "Receiving timely, high-quality food donations has been a game-changer for our shelter. The logistics are handled perfectly, allowing us to focus on what we do best: serving our community.",
  },
];

/**
 * @component TestimonialsSection
 * @description Displays user testimonials to build social proof and trust for the platform.
 * @param {TestimonialsSectionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered TestimonialsSection component.
 */
const TestimonialsSection: React.FC<TestimonialsSectionProps> = React.memo(() => {
  return (
    <section id="testimonials" className="w-full bg-white dark:bg-gray-950 py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Loved by Donors and Charities
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Hear what our partners have to say about their experience.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.name} className="border-l-4 border-emerald-500 text-left">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-50">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;