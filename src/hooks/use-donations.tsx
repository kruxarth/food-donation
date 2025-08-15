// src/hooks/use-donations.ts

import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api";

/**
 * @description Custom hook to fetch all donations using TanStack Query.
 */
export const useDonations = () => {
  return useQuery({
    queryKey: ["donations"],
    queryFn: api.fetchDonations,
  });
};

/**
 * @description Custom hook to fetch a single donation by ID.
 * @param id The ID of the donation.
 */
export const useDonationById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["donation", id],
    queryFn: () => api.fetchDonationById(id!), // The '!' asserts id is not undefined
    enabled: !!id, // Only run the query if the id is not undefined
  });
};


/**
 * @description Custom hook to fetch impact metrics.
 */
export const useImpactMetrics = () => {
  return useQuery({
    queryKey: ["impactMetrics"],
    queryFn: api.fetchImpactMetrics,
  });
};

/**
 * @description Custom hook to fetch scheduled pickups for the calendar.
 */
export const useScheduledPickups = () => {
  return useQuery({
    queryKey: ["scheduledPickups"],
    queryFn: api.fetchScheduledPickups,
  });
};