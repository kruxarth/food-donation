// src/types/donation.ts

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