// src/store/donation-store.ts
import { create } from "zustand";
import { persist } from 'zustand/middleware';
import type { CreateDonationFormData } from "@/types/donation";

type FormStep = 1 | 2 | 3 | 4;

interface DonationFormState {
  currentStep: FormStep;
  formData: Partial<CreateDonationFormData>;
  setCurrentStep: (step: FormStep) => void;
  updateFormData: (data: Partial<CreateDonationFormData>) => void;
  resetForm: () => void;
}

const initialState: Pick<DonationFormState, 'currentStep' | 'formData'> = {
  currentStep: 1,
  formData: {},
};

export const useDonationFormStore = create<DonationFormState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateFormData: (data) => set({ formData: { ...get().formData, ...data } }),
      resetForm: () => set(initialState),
    }),
    {
      name: 'donation-form-draft', // Name for localStorage item
    }
  )
);