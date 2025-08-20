// src/hooks/use-user-profile.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfileDisplay } from '@/lib/api'; // Add this to your api.ts

/**
 * @description Custom hook to fetch the complete user profile data for display.
 * Caches the data and provides loading/error states.
 * @param {string} userId The ID of the user whose profile to fetch.
 */
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfileDisplay', userId],
    queryFn: () => fetchUserProfileDisplay(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Keep previous data while refetching for a smoother UX
    placeholderData: (previousData) => previousData,
  });
};