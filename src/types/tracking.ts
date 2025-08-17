// src/types/tracking.ts
import { DonationStatus } from './donation'; // Assuming this enum exists from previous steps

export type TrackingDonationStatus =
  | 'Scheduled'
  | 'Driver Assigned'
  | 'Collected'
  | 'In Transit'
  | 'Delivered'
  | 'Completed';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface VehicleInfo {
  makeModel: string;
  licensePlate: string;
  color: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  avatarUrl: string;
  phone: string;
  rating: number; // e.g., 4.9
  vehicle: VehicleInfo;
  currentLocation: Coordinates;
}

export interface RecipientOrg {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  address: string;
  totalDonationsReceived: number;
}

export interface StatusUpdate {
  status: TrackingDonationStatus;
  timestamp: string; // ISO 8601 string
  notes: string;
  isCompleted: boolean;
}

export interface RouteInfo {
  pickupLocation: Coordinates;
  deliveryLocation: Coordinates;
  estimatedDistance: string; // "12.5 km"
  estimatedDuration: string; // "25 mins"
}

export interface DonationSummary {
  id: string;
  createdAt: string;
  itemCount: number;
  pickupAddress: string;
  deliveryAddress: string;
}

export interface TrackingData {
  summary: DonationSummary;
  currentStatus: TrackingDonationStatus;
  timeline: StatusUpdate[];
  driver: DriverInfo | null;
  recipient: RecipientOrg;
  eta: string; // ISO 8601 string
  route: RouteInfo;
}