
// src/components/home/TestimonialsSection.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  fallback: string;
  quote: string;
  rating: number;
}

interface TestimonialsSectionProps {}

const testimonialsData: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Executive Chef & Owner",
    company: "The Artisan Table",
    avatar: "https://i.pravatar.cc/150?img=1",
    fallback: "PS",
    quote: "This exceptional platform has revolutionized our approach to sustainability. The seamless integration and premium service quality have transformed our surplus into meaningful community impact—an absolute game-changer for conscious hospitality.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Operations Director",
    company: "Metropolitan Relief Foundation",
    avatar: "https://i.pravatar.cc/150?img=12",
    fallback: "RK",
    quote: "The sophistication and reliability of their logistics network is unparalleled. Every delivery arrives with pristine quality and perfect timing, allowing us to focus entirely on our mission of serving those who need it most.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Sustainability Manager",
    company: "GreenVision Enterprises",
    avatar: "https://i.pravatar.cc/150?img=5",
    fallback: "SC",
    quote: "The impact analytics and reporting are extraordinary. Being able to visualize our environmental contribution while supporting local communities has elevated our corporate social responsibility to new heights.",
    rating: 5
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="w-full bg-white dark:bg-gray-950 py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-50/20 to-transparent dark:via-emerald-900/10"></div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
            Testimonials from
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Visionary Leaders
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 font-light">
            Discover why industry pioneers choose our platform to amplify their positive impact
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className={`group relative bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/20 border-2 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  index === currentIndex ? 'ring-2 ring-emerald-500 scale-105' : ''
                }`}
              >
                <CardContent className="p-8 text-left relative">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-emerald-200 dark:text-emerald-800" />
                  
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-light">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="ring-2 ring-emerald-200 dark:ring-emerald-800">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold">
                        {testimonial.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-50">{testimonial.name}</p>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{testimonial.role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;