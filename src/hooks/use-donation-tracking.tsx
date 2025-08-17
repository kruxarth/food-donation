// src/hooks/use-donation-tracking.ts
import { useQuery } from '@tanstack/react-query';
import { fetchTrackingData } from '@/lib/api'; // Add to api.ts

/**
 * @description Fetches donation tracking data and refetches every 30 seconds to simulate live updates.
 * @param {string | undefined} donationId - The ID of the donation to track.
 */
export const useDonationTracking = (donationId: string | undefined) => {
  return useQuery({
    queryKey: ['tracking', donationId],
    queryFn: () => fetchTrackingData(donationId!),
    enabled: !!donationId, // Only run the query if donationId is not undefined
    refetchInterval: 30000, // Poll for updates every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });
};