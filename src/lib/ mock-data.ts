// src/lib/mock-data.ts
import type {   User } from "@/types/user";
import {  DonationStatus } from "@/types/donation";
import type { Donation,  ImpactMetrics, ScheduledPickup } from "@/types/donation";

export const MOCK_USER: User = {
  id: "user-123",
  fullName: "Priya Sharma",
  image: null, // or provide an appropriate value for 'image'
  email: "priya.sharma@example.com",
  userType: "business",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
};

export const MOCK_DONATIONS: Donation[] = [
  {
    id: "don-001",
    status: DonationStatus.Pending,
    submittedDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    pickupDate: new Date(Date.now() + 1 * 86400000).toISOString(),
    items: [{ name: "Sourdough Bread", quantity: "20 loaves" }, { name: "Assorted Pastries", quantity: "3 boxes" }],
    recipient: { name: "City Harvest Food Bank", id: "rec-abc" },
  },
  {
    id: "don-002",
    status: DonationStatus.InProgress,
    submittedDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    pickupDate: new Date().toISOString(),
    items: [{ name: "Fresh Vegetable Mix", quantity: "50 lbs" }],
    recipient: { name: "Community Kitchen Shelter", id: "rec-def" },
  },
  {
    id: "don-003",
    status: DonationStatus.Completed,
    submittedDate: new Date(Date.now() - 10 * 86400000).toISOString(),
    pickupDate: new Date(Date.now() - 9 * 86400000).toISOString(),
    items: [{ name: "Canned Soups", quantity: "5 cases" }],
    recipient: { name: "Helping Hands Foundation", id: "rec-ghi" },
  },
  {
    id: "don-004",
    status: DonationStatus.Completed,
    submittedDate: new Date(Date.now() - 15 * 86400000).toISOString(),
    pickupDate: new Date(Date.now() - 14 * 86400000).toISOString(),
    items: [{ name: "Milk and Dairy", quantity: "25 gallons" }],
    recipient: { name: "City Harvest Food Bank", id: "rec-abc" },
  },
  {
    id: "don-005",
    status: DonationStatus.Cancelled,
    submittedDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    pickupDate: new Date(Date.now() - 4 * 86400000).toISOString(),
    items: [{ name: "Frozen Meals", quantity: "30 units" }],
    recipient: { name: "Community Kitchen Shelter", id: "rec-def" },
  },
  {
    id: "don-006",
    status: DonationStatus.Pending,
    submittedDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    pickupDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    items: [{ name: "Rice and Grains", quantity: "100 lbs" }],
    recipient: { name: "Helping Hands Foundation", id: "rec-ghi" },
  },
];

export const MOCK_IMPACT_METRICS: ImpactMetrics = {
  totalMealsDonated: 1256,
  co2SavedKg: 870,
  activeDonations: MOCK_DONATIONS.filter(d => d.status === DonationStatus.Pending || d.status === DonationStatus.InProgress).length,
};

export const MOCK_SCHEDULED_PICKUPS: ScheduledPickup[] = MOCK_DONATIONS
  .filter(d => d.status === DonationStatus.Pending || d.status === DonationStatus.InProgress)
  .map(d => ({
    id: `pickup-${d.id}`,
    date: new Date(d.pickupDate),
    donationId: d.id,
    recipientName: d.recipient.name,
  }));