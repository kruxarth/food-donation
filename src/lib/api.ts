// src/lib/api.ts

import { MOCK_DONATIONS, MOCK_IMPACT_METRICS, MOCK_SCHEDULED_PICKUPS, MOCK_USER, generateMockTrackingData } from "@/lib/ mock-data";
import type { Donation, ImpactMetrics, ScheduledPickup, CreateDonationFormData, DonationStatus } from "@/types/donation";
import type {User} from "@/types/user"
import type { TrackingData } from "@/types/tracking";


/**
 * Simulates a network request with a given delay.
 * @param data The data to be returned by the promise.
 * @param delay The delay in milliseconds.
 * @returns A promise that resolves with the data after the delay.
 */
const fetchWithDelay = <T>(data: T, delay: number = 800): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), delay));

/**
 * @description Fetches the current authenticated user.
 */
export const fetchUser = (): Promise<User> => fetchWithDelay(MOCK_USER);

/**
 * @description Fetches a list of all donations for the current user.
 */
export const fetchDonations = (): Promise<Donation[]> => fetchWithDelay(MOCK_DONATIONS);

/**
 * @description Fetches a single donation by its ID.
 * @param id The ID of the donation to fetch.
 */
export const fetchDonationById = (id: string): Promise<Donation | undefined> => {
  const donation = MOCK_DONATIONS.find(d => d.id === id);
  return fetchWithDelay(donation);
};

/**
 * @description Fetches the user's impact metrics.
 */
export const fetchImpactMetrics = (): Promise<ImpactMetrics> => fetchWithDelay(MOCK_IMPACT_METRICS);

/**
 * @description Fetches all scheduled pickups for the user.
 */
export const fetchScheduledPickups = (): Promise<ScheduledPickup[]> => fetchWithDelay(MOCK_SCHEDULED_PICKUPS);


/**
 * @description Fetches the real-time tracking data for a specific donation.
 * Simulates a 404 error if the donation ID is not found in the mock data.
 * @param {string} donationId The ID of the donation to track.
 */
export const fetchTrackingData = (donationId: string): Promise<TrackingData> => {
  console.log(`[API] Fetching tracking data for: ${donationId}`);
  const data = generateMockTrackingData(donationId);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error("Donation not found."));
      }
    }, 600); // Simulate network delay
  });
};

/**
 * @description Creates a new donation.
 * @param data The donation form data to be submitted.
 */
export const createDonation = (data: CreateDonationFormData): Promise<Donation> => {
  // Generate a new donation object
  const newDonation: Donation = {
    id: `donation-${Date.now()}`,
    status: 'submitted' as DonationStatus,
    submittedDate: new Date().toISOString(),
    pickupDate: data.pickupDate.toISOString(),
    items: data.items || [],
    recipient: {
      name: '', // You'll need to determine how to get recipient info
      id: ''    // from your data or set default values
    }
  };

  // Simulate API call delay
  return fetchWithDelay(newDonation, 1000);
};



import type { 

  UserProfileDisplay
} from "@/types/profile";
import { 

  MOCK_USER_PROFILE_DISPLAY
} from "./ mock-data";





/**
 * @description Fetches the complete, aggregated data for the user profile display page.
 * @param {string} userId The ID of the user.
 */
export const fetchUserProfileDisplay = (userId: string): Promise<UserProfileDisplay> => {
  console.log(`[API] Fetching display profile for user: ${userId}`);
  // In a real app, this would make multiple API calls and aggregate the data.
  // Here, we just return the complete mock object.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER_PROFILE_DISPLAY);
    }, 800); // Simulate network delay
  });
};













