// src/lib/api.ts

import { MOCK_DONATIONS, MOCK_IMPACT_METRICS, MOCK_SCHEDULED_PICKUPS, MOCK_USER } from "@/lib/ mock-data";
import type { Donation, ImpactMetrics, ScheduledPickup } from "@/types/donation";
import type {User} from "@/types/user"


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