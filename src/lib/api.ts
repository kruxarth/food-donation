// src/lib/api.ts
import { 
  MOCK_DONATIONS, 
  MOCK_IMPACT_METRICS, 
  MOCK_SCHEDULED_PICKUPS, 
  MOCK_USER,
  MOCK_USER_PROFILE_DISPLAY,
  generateMockTrackingData 
} from "@/lib/ mock-data";

import type { 
  Donation, 
  ImpactMetrics, 
  ScheduledPickup, 
  CreateDonationFormData, 
  DonationStatus 
} from "@/types/donation";
import type { User } from "@/types/user";
import type { TrackingData } from "@/types/tracking";
import type { UserProfileDisplay } from "@/types/profile";

/**
 * Simulates a network request with a given delay.
 * @param data The data to be returned by the promise.
 * @param delay The delay in milliseconds (default: 800ms).
 * @returns A promise that resolves with the data after the delay.
 */
const fetchWithDelay = <T>(data: T, delay: number = 800): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), delay));

/**
 * Simulates a network request that can fail.
 * @param data The data to be returned on success.
 * @param shouldFail Whether the request should fail.
 * @param delay The delay in milliseconds (default: 800ms).
 * @returns A promise that resolves with data or rejects with an error.
 */
const fetchWithDelayAndError = <T>(
  data: T | null, 
  shouldFail: boolean = false, 
  delay: number = 800
): Promise<T> =>
  new Promise((resolve, reject) => 
    setTimeout(() => {
      if (shouldFail || !data) {
        reject(new Error("Resource not found"));
      } else {
        resolve(data);
      }
    }, delay)
  );

// ============================================================================
// USER API
// ============================================================================

/**
 * @description Fetches the current authenticated user.
 */
export const fetchUser = (): Promise<User> => 
  fetchWithDelay(MOCK_USER);

/**
 * @description Fetches the complete, aggregated data for the user profile display page.
 * @param userId The ID of the user.
 */
export const fetchUserProfileDisplay = (userId: string): Promise<UserProfileDisplay> => {
  console.log(`[API] Fetching display profile for user: ${userId}`);
  return fetchWithDelay(MOCK_USER_PROFILE_DISPLAY, 800);
};

// ============================================================================
// DONATIONS API
// ============================================================================

/**
 * @description Fetches a list of all donations for the current user.
 */
export const fetchDonations = (): Promise<Donation[]> => 
  fetchWithDelay(MOCK_DONATIONS);

/**
 * @description Fetches a single donation by its ID.
 * @param id The ID of the donation to fetch.
 */
export const fetchDonationById = (id: string): Promise<Donation> => {
  const donation = MOCK_DONATIONS.find(d => d.id === id);
  return fetchWithDelayAndError(donation || null, !donation, 600);
};

/**
 * @description Creates a new donation.
 * @param data The donation form data to be submitted.
 */
export const createDonation = (data: CreateDonationFormData): Promise<Donation> => {
  const newDonation: Donation = {
    id: `donation-${Date.now()}`,
    status: 'submitted' as DonationStatus,
    submittedDate: new Date().toISOString(),
    pickupDate: data.pickupDate.toISOString(),
    items: data.items || [],
    recipient: {
      name: 'Pending Assignment', // More realistic default
      id: `recipient-${Date.now()}` // Generate a temporary ID
    }
  };

  return fetchWithDelay(newDonation, 1000);
};

// ============================================================================
// TRACKING API
// ============================================================================

/**
 * @description Fetches the real-time tracking data for a specific donation.
 * @param donationId The ID of the donation to track.
 */
export const fetchTrackingData = (donationId: string): Promise<TrackingData> => {
  console.log(`[API] Fetching tracking data for: ${donationId}`);
  const data = generateMockTrackingData(donationId);
  return fetchWithDelayAndError(data, !data, 600);
};

// ============================================================================
// PICKUPS & METRICS API
// ============================================================================

/**
 * @description Fetches all scheduled pickups for the user.
 */
export const fetchScheduledPickups = (): Promise<ScheduledPickup[]> => 
  fetchWithDelay(MOCK_SCHEDULED_PICKUPS);

/**
 * @description Fetches the user's impact metrics.
 */
export const fetchImpactMetrics = (): Promise<ImpactMetrics> => 
  fetchWithDelay(MOCK_IMPACT_METRICS);

// ============================================================================
// ERROR TYPES (for better error handling in components)
// ============================================================================

export class ApiError extends Error {
  constructor(
    message: string, 
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function for components to handle API errors consistently
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};