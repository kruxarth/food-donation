// src/store/authStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, LoginFormData, SignupFormData } from "@/types/auth";

import { v4 as uuidv4 } from 'uuid';

/**
 * @interface AuthState
 * @description Defines the shape of the authentication store's state and actions.
 */
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
}

/**
 * @function useAuthStore
 * @description A Zustand store for managing authentication state.
 * The state is persisted to localStorage.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      // Mock login action
      login: async (data: LoginFormData) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockUser: User = {
              id: 'mock-user-123',
              fullName: "John Doe",
              email: data.email,
              userType: "individual",
            };
            const mockToken = "mock-jwt-token";
            
            set({ isAuthenticated: true, user: mockUser, token: mockToken });
            resolve();
          }, 1000);
        });
      },

      // Mock signup action
      signup: async (data: SignupFormData) => {
        return new Promise((resolve) => {
           setTimeout(() => {
            const newUser: User = {
              id: uuidv4(),
              fullName: data.fullName,
              email: data.email,
              userType: data.userType,
            };
            const mockToken = "new-mock-jwt-token";

            set({ isAuthenticated: true, user: newUser, token: mockToken });
            resolve();
          }, 1500);
        });
      },

      // Logout action
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // Name for the localStorage item
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);