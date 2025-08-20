// src/pages/UserProfilePage.tsx
import { useUserProfile } from "@/hooks/use-user-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ImpactMetrics } from "@/components/profile/ImpactMetrics";
import { AchievementBadges } from "@/components/profile/AchievementBadges";
import { DonationHistory } from "@/components/profile/DonationHistory";
import { AlertCircle } from "lucide-react";

// A mock user ID for the hook
const MOCK_USER_ID = "user-123";

const UserProfileSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-56 w-full" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-96 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const UserProfilePage = () => {
  const { data, isLoading, isError, error } = useUserProfile(MOCK_USER_ID);

  if (isLoading) return <UserProfileSkeleton />;

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Profile</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }
  
  if (!data) return null;

  return (
    <div className="space-y-6">
      <ProfileHeader user={data.user} stats={data.stats} />
      <ProfileStats stats={data.stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <ImpactMetrics charts={data.charts} />
             <DonationHistory donations={data.recentDonations} />
          </div>
          <div className="lg:col-span-1 space-y-6">
             <AchievementBadges achievements={data.achievements} />
             {/* Other components like RecentActivity and CharityConnections would go here */}
          </div>
      </div>
    </div>
  );
};

export default UserProfilePage;