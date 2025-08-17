// src/lib/mock-data.ts
import type {   User } from "@/types/user";
import {  DonationStatus } from "@/types/donation";
import type { Donation,  ImpactMetrics, ScheduledPickup } from "@/types/donation";
import type { TrackingData, TrackingDonationStatus, StatusUpdate, RecipientOrg, RouteInfo, DriverInfo, DonationSummary } from "@/types/tracking";

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



// --- New Mock Data and Generator for Tracking ---

/**
 * @function generateMockTrackingData
 * @description Creates different tracking data scenarios based on the donation ID.
 * This simulates fetching real-time data for different donations.
 * @param {string} donationId - The ID of the donation to track.
 * @returns {TrackingData | null} Tracking data for the donation, or null if not found.
 */
export const generateMockTrackingData = (donationId: string): TrackingData | null => {
  const baseDonation = MOCK_DONATIONS.find(d => d.id === donationId);
  if (!baseDonation) return null;

  const now = new Date();
  
  const recipient: RecipientOrg = {
    id: 'rec-abc',
    name: 'City Harvest Food Bank',
    logoUrl: '/logos/city-harvest.png', // Placeholder path
    description: 'Serving nutritious food to communities in need since 1982.',
    address: '456 Charity Lane, Metro City, ST 98765',
    totalDonationsReceived: 142,
  };
  
  const route: RouteInfo = {
    pickupLocation: { lat: 34.0522, lng: -118.2437 },
    deliveryLocation: { lat: 34.0622, lng: -118.2537 },
    estimatedDistance: "8.2 miles",
    estimatedDuration: "22 mins",
  };
  
  const summary = {
    id: baseDonation.id,
    createdAt: baseDonation.submittedDate,
    itemCount: baseDonation.items.length,
    pickupAddress: "The Curry Leaf Bistro, 123 Gourmet St, Metro City",
    deliveryAddress: recipient.address,
  };

  let timeline: StatusUpdate[] = [
    { status: 'Scheduled', timestamp: baseDonation.submittedDate, notes: 'Donation has been scheduled for pickup.', isCompleted: false },
    { status: 'Driver Assigned', timestamp: '', notes: 'A driver is assigned and en route.', isCompleted: false },
    { status: 'Collected', timestamp: '', notes: 'Your donation has been collected by the driver.', isCompleted: false },
    { status: 'In Transit', timestamp: '', notes: 'The donation is on its way to the recipient.', isCompleted: false },
    { status: 'Delivered', timestamp: '', notes: 'Successfully delivered to the charity.', isCompleted: false },
    { status: 'Completed', timestamp: '', notes: 'The donation process is complete. Thank you!', isCompleted: false },
  ];
  
  let currentStatus: TrackingDonationStatus = 'Scheduled';
  let driver: DriverInfo | null = null;
  let eta = new Date(now.getTime() + 25 * 60000).toISOString(); // ETA 25 mins from now

  // --- Scenarios based on donationId ---
  switch (donationId) {
    case 'don-001': // Scheduled / Driver Assigned
      currentStatus = 'Driver Assigned';
      timeline[0].isCompleted = true;
      timeline[0].timestamp = new Date(now.getTime() - 60 * 60000).toISOString(); // 1 hour ago
      timeline[1].timestamp = new Date(now.getTime() - 5 * 60000).toISOString(); // 5 mins ago
      driver = {
        id: 'driver-01', name: 'Rajesh Kumar', avatarUrl: 'https://i.pravatar.cc/150?img=2', phone: '555-123-4567', rating: 4.9,
        vehicle: { makeModel: 'Ford Transit', licensePlate: 'FOOD-4-ALL', color: 'White' },
        currentLocation: { lat: 34.0422, lng: -118.2337 },
      };
      break;

    case 'don-002': // In Transit
      currentStatus = 'In Transit';
      timeline[0] = { status: 'Scheduled', timestamp: new Date(now.getTime() - 2 * 60 * 60000).toISOString(), notes: 'Donation scheduled.', isCompleted: true };
      timeline[1] = { status: 'Driver Assigned', timestamp: new Date(now.getTime() - 45 * 60000).toISOString(), notes: 'Rajesh Kumar is assigned.', isCompleted: true };
      timeline[2] = { status: 'Collected', timestamp: new Date(now.getTime() - 15 * 60000).toISOString(), notes: 'Donation collected.', isCompleted: true };
      timeline[3].timestamp = new Date(now.getTime() - 1 * 60000).toISOString(); // 1 min ago
      eta = new Date(now.getTime() + 10 * 60000).toISOString(); // ETA 10 mins from now
      driver = {
        id: 'driver-01', name: 'Rajesh Kumar', avatarUrl: 'https://i.pravatar.cc/150?img=2', phone: '555-123-4567', rating: 4.9,
        vehicle: { makeModel: 'Ford Transit', licensePlate: 'FOOD-4-ALL', color: 'White' },
        currentLocation: { lat: 34.0550, lng: -118.2450 }, // Driver is moving
      };
      break;
      
    case 'don-003': // Completed
      currentStatus = 'Completed';
       timeline = timeline.map((step, i) => ({
           ...step,
           isCompleted: true,
           timestamp: new Date(now.getTime() - (6 - i) * 60 * 60000).toISOString() // Fill in past timestamps
       }));
       eta = timeline[5].timestamp;
       driver = {
        id: 'driver-02', name: 'Anjali Mehta', avatarUrl: 'https://i.pravatar.cc/150?img=3', phone: '555-987-6543', rating: 4.8,
        vehicle: { makeModel: 'Nissan NV200', licensePlate: 'GIVE-BACK', color: 'Silver' },
        currentLocation: route.deliveryLocation,
      };
      break;
      
    default: // Default case is 'Scheduled'
      timeline[0].isCompleted = true;
      timeline[0].timestamp = baseDonation.submittedDate;
      break;
  }
  
  return { summary, currentStatus, timeline, driver, recipient, eta, route };
};