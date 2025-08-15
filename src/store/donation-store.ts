// src/store/donation-store.ts

import { create } from "zustand";

/**
 * @interface DonationState
 * @description Defines the shape of the donation store's state and actions.
 */
interface DonationState {
  selectedDonationId: string | null;
  setSelectedDonationId: (id: string | null) => void;
}

/**
 * @function useDonationStore
 * @description A Zustand store for managing donation-related UI state.
 */
export const useDonationStore = create<DonationState>((set) => ({
  selectedDonationId: null,
  setSelectedDonationId: (id) => set({ selectedDonationId: id }),
}));