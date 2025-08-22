// src/pages/UserProfilePage.tsx
import { useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ImpactMetrics } from "@/components/profile/ImpactMetrics";
import { AchievementBadges } from "@/components/profile/AchievementBadges";
import { DonationHistory } from "@/components/profile/DonationHistory";
import { AlertCircle } from "lucide-react";

// const UserProfileSkeleton = () => (
//   <div className="space-y-6">
//     <Skeleton className="h-56 w-full" />
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Skeleton className="h-24 w-full" />
//       <Skeleton className="h-24 w-full" />
//       <Skeleton className="h-24 w-full" />
//       <Skeleton className="h-24 w-full" />
//     </div>
//     <Skeleton className="h-96 w-full" />
//     <Skeleton className="h-64 w-full" />
//   </div>
// );

// const UserProfilePage = () => {
//   // Get the user ID from URL parameters
//   const { id } = useParams<{ id: string }>();
  
//   // Use the ID from params, or fallback to a default if not provided
//   const userId = id || "user-123";
  
//   const { data, isLoading, isError, error } = useUserProfile(userId);

//   if (isLoading) return <UserProfileSkeleton />;

//   if (isError) {
//     return (
//       <Alert variant="destructive">
//         <AlertCircle className="h-4 w-4" />
//         <AlertTitle>Error Loading Profile</AlertTitle>
//         <AlertDescription>
//           {error instanceof Error ? error.message : "An unexpected error occurred"}
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   if (!data) {
//     return (
//       <Alert>
//         <AlertCircle className="h-4 w-4" />
//         <AlertTitle>No Data</AlertTitle>
//         <AlertDescription>No profile data found.</AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <ProfileHeader user={data.user} stats={data.stats} />
//       <ProfileStats stats={data.stats} />
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <ImpactMetrics charts={data.charts} />
//           <DonationHistory donations={data.recentDonations} />
//         </div>
//         <div className="lg:col-span-1 space-y-6">
//           <AchievementBadges achievements={data.achievements} />
//           {/* Other components like RecentActivity and CharityConnections would go here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/UserProfilePage.tsx - Progressive Component Testing
import React from "react";

// STEP 1: Start by uncommenting ONE import at a time
// import { ProfileHeader } from "@/components/profile/ProfileHeader";
// import { ProfileStats } from "@/components/profile/ProfileStats";
// import { ImpactMetrics } from "@/components/profile/ImpactMetrics";
// import { AchievementBadges } from "@/components/profile/AchievementBadges";
// import { DonationHistory } from "@/components/profile/DonationHistory";

const UserProfilePage = () => {
  console.log("UserProfilePage rendering - Progressive test");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Progressive Component Test</h1>
      <p className="mb-4 text-gray-600">Uncomment imports and components one by one to find the problematic component.</p>
      
      {/* STEP 2: Uncomment ONE component at a time */}
      
      {/* Test 1: ProfileHeader */}
      {/* <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Testing: ProfileHeader</h2>
        <ProfileHeader 
          user={{
            id: "test",
            name: "Test User",
            email: "test@example.com",
            avatarUrl: "",
            location: "Test City",
            userType: "Individual" as const
          }}
          stats={{
            totalDonations: 0,
            totalMeals: 0,
            co2Saved: 0,
            moneyValue: 0,
            currentStreak: 0,
            memberSince: new Date().toISOString(),
            profileCompletion: 50
          }}
        />
      </div> */}

      {/* Test 2: ProfileStats */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Testing: ProfileStats</h2>
        <ProfileStats 
          stats={{
            totalDonations: 5,
            totalMeals: 150,
            co2Saved: 25,
            moneyValue: 375,
            currentStreak: 3,
            memberSince: new Date().toISOString(),
            profileCompletion: 85
          }}
        />
      </div>

      {/* Test 3: AchievementBadges */}
      {/* <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Testing: AchievementBadges</h2>
        <AchievementBadges achievements={[]} />
      </div> */}

      {/* Test 4: DonationHistory */}
      {/* <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Testing: DonationHistory</h2>
        <DonationHistory donations={[]} />
      </div> */}

      {/* Test 5: ImpactMetrics */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Testing: ImpactMetrics</h2>
        <ImpactMetrics 
          charts={{
            donationTrend: [],
            categoryBreakdown: []
          }}
        />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-800">Testing Instructions:</h3>
        <ol className="mt-2 text-blue-700 text-sm space-y-1">
          <li>1. Uncomment the first import</li>
          <li>2. Uncomment the first component test</li>
          <li>3. Save and check if it renders</li>
          <li>4. If it works, move to the next component</li>
          <li>5. If it fails, you found the problematic component!</li>
        </ol>
      </div>
    </div>
  );
};

export default UserProfilePage;