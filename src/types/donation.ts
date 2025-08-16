// src/types/donation.ts



import type { LucideIcon } from "lucide-react";

/**
 * @enum DonationStatus
 * @description Represents the possible statuses of a food donation.
 */
export const DonationStatus = {
  Pending: "Pending Pickup",
  InProgress: "In Transit",
  Completed: "Completed",
  Cancelled: "Cancelled",
} as const;

export type DonationStatus = typeof DonationStatus[keyof typeof DonationStatus];

/**
 * @interface Donation
 * @description Represents a single food donation record.
 */
export interface Donation {
  id: string;
  status: DonationStatus;
  submittedDate: string; // ISO 8601 date string
  pickupDate: string;   // ISO 8601 date string
  items: {
    name: string;
    quantity: string; // e.g., "10 lbs", "3 boxes"
  }[];
  recipient: {
    name: string;
    id: string;
  };
}

/**
 * @interface ImpactMetrics
 * @description Represents the key performance indicators for the user's donation activity.
 */
export interface ImpactMetrics {
  totalMealsDonated: number;
  co2SavedKg: number;
  activeDonations: number;
}

/**
 * @interface ScheduledPickup
 * @description Represents a scheduled pickup event for the calendar.
 */
export interface ScheduledPickup {
  id: string;
  date: Date;
  donationId: string;
  recipientName: string;
}



export interface FoodCategory {
  id: 'perishable' | 'non-perishable';
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface DietaryInfo {
  id: 'vegetarian' | 'vegan' | 'gluten-free';
  name: string;
  icon: LucideIcon;
}

export interface Allergen {
  id: keyof AllergenInfo;
  name: string;
  icon: LucideIcon;
}

export interface FoodItem {
  id: string; // For unique key prop in React
  name: string;
  category: string; // e.g., 'Dairy', 'Produce', 'Canned Goods'
  quantity: string;
  unit: string;
  expiryDate?: Date;
  description?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isPrimary?: boolean;
}

export interface TimeSlot {
  id: 'morning' | 'afternoon' | 'evening';
  label: string;
  range: string;
  available: boolean;
}

export interface AllergenInfo {
  nuts: boolean;
  dairy: boolean;
  gluten: boolean;
  shellfish: boolean;
  eggs: boolean;
  soy: boolean;
}

export interface CreateDonationFormData {
  foodType: 'perishable' | 'non-perishable';
  items: FoodItem[];
  dietaryInfo: ('vegetarian' | 'vegan' | 'gluten-free')[];
  allergenInfo: AllergenInfo;
  pickupAddress: Address;
  pickupDate: Date;
  pickupTimeSlot: TimeSlot['id'];
  specialInstructions: string;
  termsAccepted: boolean;
}