// src/hooks/use-create-donation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDonation } from '@/lib/api'; // We'll add this to api.ts
import type { CreateDonationFormData } from '@/types/donation';
import { toast } from 'sonner';

export const useCreateDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newDonation: CreateDonationFormData) => createDonation(newDonation),
    onSuccess: (data) => {
      // Invalidate and refetch the donations list to show the new one
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      
      toast.success('Donation Submitted!', {
        description: `Your donation (ID: ${data.id}) has been successfully scheduled.`,
      });
    },
    onError: (error) => {
      toast.error('Submission Failed', {
        description: `An error occurred: ${error.message}. Please try again.`,
      });
    },
  });
};