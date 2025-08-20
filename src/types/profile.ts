// src/types/profile.ts
import type { LucideIcon } from 'lucide-react';
import { DonationStatus } from './donation';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  location: string; // "City, State"
  userType: 'Individual' | 'Business';
}

export interface UserStats {
  totalDonations: number;
  totalMeals: number;
  co2Saved: number; // in kg
  moneyValue: number; // in USD
  currentStreak: number; // in months
  memberSince: string; // ISO 8601 string
  profileCompletion: number; // Percentage (0-100)
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  unlockedAt: string | null; // ISO 8601 string or null if not unlocked
  category: 'donation' | 'impact' | 'community';
  progress?: {
    current: number;
    target: number;
  };
}

export interface DonationSummary {
    id: string;
    date: string; // ISO 8601 string
    recipient: string;
    itemCount: number;
    status: DonationStatus;
}

export interface ActivityItem {
  id: string;
  type: 'donation_completed' | 'achievement_unlocked' | 'thank_you' | 'milestone';
  title: string;
  description: string;
  timestamp: string; // ISO 8601 string
  icon: LucideIcon;
  metadata?: {
    donationId?: string;
    achievementName?: string;
  };
}

export interface CharitySummary {
    id: string;
    name: string;
    logoUrl: string;
    donationCount: number;
}

// --- Data for Recharts ---
export interface MonthlyData {
  month: string; // "Jan", "Feb", ...
  donations: number;
}
export interface CategoryData {
  name: string;
  value: number;
  fill: string;
}

/**
 * @interface ChartData (Corrected)
 * @description Defines the structure for the visualization chart data.
 */
export interface ChartData {
  donationTrend: MonthlyData[];
  categoryBreakdown: CategoryData[];
}

export interface UserProfileDisplay {
  user: UserInfo;
  stats: UserStats;
  achievements: Achievement[];
  recentDonations: DonationSummary[];
  activityFeed: ActivityItem[];
  favoriteCharities: CharitySummary[];
  charts: ChartData;
}