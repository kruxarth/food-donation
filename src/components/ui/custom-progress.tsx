// src/components/ui/custom-progress.tsx - Safe Progress component
import React from "react";
import { cn } from "@/lib/utils";

interface CustomProgressProps {
  value: number;
  className?: string;
  "aria-label"?: string;
}

export const CustomProgress = ({ value, className, ...props }: CustomProgressProps) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <div 
      className={cn("w-full bg-secondary rounded-full h-2", className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300" 
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};