// src/lib/mock-data.ts
import type { User } from "@/types/user";
import { DonationStatus } from "@/types/donation";
import type { Donation, ImpactMetrics, ScheduledPickup } from "@/types/donation";
import type { TrackingData, TrackingDonationStatus, StatusUpdate, RecipientOrg, RouteInfo, DriverInfo, DonationSummary } from "@/types/tracking";
import type { UserProfileDisplay } from "@/types/profile";
import { Gift, ShieldCheck, Sprout, Star, Trophy, MessageSquare, HandHeart, CheckCircle } from "lucide-react";
import { subMonths, subDays } from 'date-fns';

// --- BASE DATA - SINGLE SOURCE OF TRUTH ---

const BASE_USER = {
  id: "user-123",
  name: "Priya Sharma",
  fullName: "Priya Sharma", // For backward compatibility
  email: "priya.sharma@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
  userType: "business" as const,
  location: "Metro City, ST",
  image: null,
};

const BASE_RECIPIENTS: Record<string, RecipientOrg> = {
  'rec-abc': {
    id: 'rec-abc',
    name: 'City Harvest Food Bank',
    logoUrl: '/logos/city-harvest.png',
    description: 'Serving nutritious food to communities in need since 1982.',
    address: '456 Charity Lane, Metro City, ST 98765',
    totalDonationsReceived: 142,
  },
  'rec-def': {
    id: 'rec-def',
    name: 'Community Kitchen Shelter',
    logoUrl: '/logos/community-kitchen.png',
    description: 'Providing hot meals and shelter to homeless individuals.',
    address: '789 Hope Street, Metro City, ST 98766',
    totalDonationsReceived: 98,
  },
  'rec-ghi': {
    id: 'rec-ghi',
    name: 'Helping Hands Foundation',
    logoUrl: '/logos/helping-hands.png',
    description: 'Supporting families in need through food assistance programs.',
    address: '321 Compassion Ave, Metro City, ST 98767',
    totalDonationsReceived: 156,
  },
};

const BASE_DRIVERS: Record<string, DriverInfo> = {
  'driver-01': {
    id: 'driver-01',
    name: 'Rajesh Kumar',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    phone: '555-123-4567',
    rating: 4.9,
    vehicle: { makeModel: 'Ford Transit', licensePlate: 'FOOD-4-ALL', color: 'White' },
    currentLocation: { lat: 34.0422, lng: -118.2337 },
  },
  'driver-02': {
    id: 'driver-02',
    name: 'Anjali Mehta',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    phone: '555-987-6543',
    rating: 4.8,
    vehicle: { makeModel: 'Nissan NV200', licensePlate: 'GIVE-BACK', color: 'Silver' },
    currentLocation: { lat: 34.0622, lng: -118.2537 },
  },
};

const BASE_ROUTE: RouteInfo = {
  pickupLocation: { lat: 34.0522, lng: -118.2437 },
  deliveryLocation: { lat: 34.0622, lng: -118.2537 },
  estimatedDistance: "8.2 miles",
  estimatedDuration: "22 mins",
};

// Raw donation data - minimal structure
const RAW_DONATIONS = [
  {
    id: "don-001",
    status: DonationStatus.Pending,
    submittedDaysAgo: 2,
    pickupDaysFromNow: 1,
    items: [
      { name: "Sourdough Bread", quantity: "20 loaves" },
      { name: "Assorted Pastries", quantity: "3 boxes" }
    ],
    recipientId: "rec-abc",
  },
  {
    id: "don-002",
    status: DonationStatus.InProgress,
    submittedDaysAgo: 1,
    pickupDaysFromNow: 0,
    items: [{ name: "Fresh Vegetable Mix", quantity: "50 lbs" }],
    recipientId: "rec-def",
  },
  {
    id: "don-003",
    status: DonationStatus.Completed,
    submittedDaysAgo: 10,
    pickupDaysFromNow: -9,
    items: [{ name: "Canned Soups", quantity: "5 cases" }],
    recipientId: "rec-ghi",
  },
  {
    id: "don-004",
    status: DonationStatus.Completed,
    submittedDaysAgo: 15,
    pickupDaysFromNow: -14,
    items: [{ name: "Milk and Dairy", quantity: "25 gallons" }],
    recipientId: "rec-abc",
  },
  {
    id: "don-005",
    status: DonationStatus.Cancelled,
    submittedDaysAgo: 5,
    pickupDaysFromNow: -4,
    items: [{ name: "Frozen Meals", quantity: "30 units" }],
    recipientId: "rec-def",
  },
  {
    id: "don-006",
    status: DonationStatus.Pending,
    submittedDaysAgo: 1,
    pickupDaysFromNow: 3,
    items: [{ name: "Rice and Grains", quantity: "100 lbs" }],
    recipientId: "rec-ghi",
  },
];

// --- DERIVED DATA ---

export const MOCK_USER: User = {
  ...BASE_USER,
};

// Generate donations with proper dates and recipient objects
export const MOCK_DONATIONS: Donation[] = RAW_DONATIONS.map(raw => ({
  id: raw.id,
  status: raw.status,
  submittedDate: new Date(Date.now() - raw.submittedDaysAgo * 86400000).toISOString(),
  pickupDate: new Date(Date.now() + raw.pickupDaysFromNow * 86400000).toISOString(),
  items: raw.items,
  recipient: {
    name: BASE_RECIPIENTS[raw.recipientId].name,
    id: raw.recipientId,
  },
}));

// Calculate metrics from actual data
const completedDonations = MOCK_DONATIONS.filter(d => d.status === DonationStatus.Completed);
const activeDonations = MOCK_DONATIONS.filter(d => d.status === DonationStatus.Pending || d.status === DonationStatus.InProgress);

export const MOCK_IMPACT_METRICS: ImpactMetrics = {
  totalMealsDonated: completedDonations.length * 30, // Estimate 30 meals per donation
  co2SavedKg: completedDonations.length * 145, // Estimate 145kg CO2 per donation
  activeDonations: activeDonations.length,
};

export const MOCK_SCHEDULED_PICKUPS: ScheduledPickup[] = activeDonations.map(d => ({
  id: `pickup-${d.id}`,
  date: new Date(d.pickupDate),
  donationId: d.id,
  recipientName: d.recipient.name,
}));

// --- TRACKING DATA GENERATOR ---

const createStatusTimeline = (): StatusUpdate[] => [
  { status: 'Scheduled', timestamp: '', notes: 'Donation has been scheduled for pickup.', isCompleted: false },
  { status: 'Driver Assigned', timestamp: '', notes: 'A driver is assigned and en route.', isCompleted: false },
  { status: 'Collected', timestamp: '', notes: 'Your donation has been collected by the driver.', isCompleted: false },
  { status: 'In Transit', timestamp: '', notes: 'The donation is on its way to the recipient.', isCompleted: false },
  { status: 'Delivered', timestamp: '', notes: 'Successfully delivered to the charity.', isCompleted: false },
  { status: 'Completed', timestamp: '', notes: 'The donation process is complete. Thank you!', isCompleted: false },
];

export const generateMockTrackingData = (donationId: string): TrackingData | null => {
  const baseDonation = MOCK_DONATIONS.find(d => d.id === donationId);
  if (!baseDonation) return null;

  const now = new Date();
  const recipient = BASE_RECIPIENTS[RAW_DONATIONS.find(r => r.id === donationId)?.recipientId || 'rec-abc'];
  
  const summary: DonationSummary = {
    id: baseDonation.id,
    createdAt: baseDonation.submittedDate,
    itemCount: baseDonation.items.length,
    pickupAddress: "The Curry Leaf Bistro, 123 Gourmet St, Metro City",
    deliveryAddress: recipient.address,
  };

  let timeline = createStatusTimeline();
  let currentStatus: TrackingDonationStatus = 'Scheduled';
  let driver: DriverInfo | null = null;
  let eta = new Date(now.getTime() + 25 * 60000).toISOString();

  // Scenario-based data generation
  const scenarios: Record<string, () => void> = {
    'don-001': () => {
      currentStatus = 'Driver Assigned';
      timeline[0].isCompleted = true;
      timeline[0].timestamp = new Date(now.getTime() - 60 * 60000).toISOString();
      timeline[1].timestamp = new Date(now.getTime() - 5 * 60000).toISOString();
      driver = { ...BASE_DRIVERS['driver-01'] };
    },
    
    'don-002': () => {
      currentStatus = 'In Transit';
      timeline[0] = { ...timeline[0], timestamp: new Date(now.getTime() - 2 * 60 * 60000).toISOString(), isCompleted: true };
      timeline[1] = { ...timeline[1], timestamp: new Date(now.getTime() - 45 * 60000).toISOString(), isCompleted: true };
      timeline[2] = { ...timeline[2], timestamp: new Date(now.getTime() - 15 * 60000).toISOString(), isCompleted: true };
      timeline[3].timestamp = new Date(now.getTime() - 1 * 60000).toISOString();
      eta = new Date(now.getTime() + 10 * 60000).toISOString();
      driver = { ...BASE_DRIVERS['driver-01'], currentLocation: { lat: 34.0550, lng: -118.2450 } };
    },
    
    'don-003': () => {
      currentStatus = 'Completed';
      timeline = timeline.map((step, i) => ({
        ...step,
        isCompleted: true,
        timestamp: new Date(now.getTime() - (6 - i) * 60 * 60000).toISOString()
      }));
      eta = timeline[5].timestamp;
      driver = { ...BASE_DRIVERS['driver-02'], currentLocation: BASE_ROUTE.deliveryLocation };
    },
  };

  // Execute scenario or use default
  const scenario = scenarios[donationId];
  if (scenario) {
    scenario();
  } else {
    timeline[0].isCompleted = true;
    timeline[0].timestamp = baseDonation.submittedDate;
  }

  return { summary, currentStatus, timeline, driver, recipient, eta, route: BASE_ROUTE };
};

// --- USER PROFILE DATA ---

// Calculate user statistics from actual donation data
const userDonationCount = MOCK_DONATIONS.length;
const userCompletedDonations = MOCK_DONATIONS.filter(d => d.status === DonationStatus.Completed);

// Create recent donations from actual data
const recentDonations = MOCK_DONATIONS
  .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime())
  .slice(0, 5)
  .map(d => ({
    id: d.id,
    date: d.submittedDate,
    recipient: d.recipient.name,
    itemCount: d.items.length,
    status: d.status,
  }));

// Calculate favorite charities from donation frequency
const charityDonationCounts = MOCK_DONATIONS.reduce((acc, d) => {
  acc[d.recipient.id] = (acc[d.recipient.id] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const favoriteCharities = Object.entries(charityDonationCounts)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 3)
  .map(([id, count]) => ({
    id,
    name: BASE_RECIPIENTS[id].name,
    logoUrl: BASE_RECIPIENTS[id].logoUrl,
    donationCount: count,
  }));

export const MOCK_USER_PROFILE_DISPLAY: UserProfileDisplay = {
  user: {
    id: BASE_USER.id,
    name: BASE_USER.name,
    email: BASE_USER.email,
    avatarUrl: BASE_USER.avatarUrl,
    location: BASE_USER.location,
    userType: "Business",
  },
  stats: {
    totalDonations: userDonationCount,
    totalMeals: MOCK_IMPACT_METRICS.totalMealsDonated,
    co2Saved: MOCK_IMPACT_METRICS.co2SavedKg,
    moneyValue: userCompletedDonations.length * 75, // Estimate $75 per donation
    currentStreak: 6,
    memberSince: subMonths(new Date(), 18).toISOString(),
    profileCompletion: 85,
  },
  achievements: [
    { id: 'ach-1', name: 'First Donation', description: 'Made your first donation.', icon: Gift, unlockedAt: subMonths(new Date(), 17).toISOString(), category: 'donation' },
    { id: 'ach-2', name: 'Community Champion', description: 'Donated 10 times.', icon: Trophy, unlockedAt: subMonths(new Date(), 8).toISOString(), category: 'donation' },
    { id: 'ach-3', name: 'Eco Warrior', description: 'Saved 500kg of CO2.', icon: Sprout, unlockedAt: subMonths(new Date(), 3).toISOString(), category: 'impact' },
    { id: 'ach-4', name: 'Top Contributor', description: 'Become a top 10% donor.', icon: Star, unlockedAt: null, category: 'community', progress: { current: userDonationCount, target: 50 } },
    { id: 'ach-5', name: 'Perfect Year', description: 'Donate every month for a year.', icon: ShieldCheck, unlockedAt: null, category: 'community', progress: { current: 6, target: 12 } },
  ],
  recentDonations,
  activityFeed: [
    { id: 'act-1', type: 'donation_completed', title: 'Donation #don-001 Completed', description: `Your donation to ${BASE_RECIPIENTS['rec-abc'].name} was successfully delivered.`, timestamp: subDays(new Date(), 5).toISOString(), icon: CheckCircle },
    { id: 'act-2', type: 'achievement_unlocked', title: 'Achievement Unlocked: Eco Warrior', description: 'You have saved over 500kg of CO2 emissions!', timestamp: subMonths(new Date(), 3).toISOString(), icon: Trophy },
    { id: 'act-3', type: 'thank_you', title: `A Message from ${BASE_RECIPIENTS['rec-ghi'].name}`, description: '"Thank you for your generous donation! It made a huge difference."', timestamp: subDays(new Date(), 11).toISOString(), icon: MessageSquare },
    { id: 'act-4', type: 'milestone', title: '6-Month Donation Streak!', description: 'You have donated for 6 consecutive months. Keep it up!', timestamp: subDays(new Date(), 20).toISOString(), icon: HandHeart },
  ],
  favoriteCharities,
  charts: {
    donationTrend: [
      { month: 'Mar', donations: 3 }, { month: 'Apr', donations: 4 }, { month: 'May', donations: 2 },
      { month: 'Jun', donations: 5 }, { month: 'Jul', donations: 4 }, { month: 'Aug', donations: 6 },
    ],
    categoryBreakdown: [
      { name: 'Produce', value: 400, fill: '#8884d8' },
      { name: 'Baked Goods', value: 300, fill: '#82ca9d' },
      { name: 'Dairy', value: 300, fill: '#ffc658' },
      { name: 'Pantry', value: 200, fill: '#ff8042' },
    ],
  },
};

