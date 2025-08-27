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

const ProfileSkeleton = () => (
  <div className="container mx-auto px-4 py-8 space-y-8">
    {/* Header Skeleton */}
    <div className="w-full rounded-lg bg-card p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
    
    {/* Stats Skeleton */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-8 w-16 mt-2" />
        </div>
      ))}
    </div>
    
    {/* Content Skeleton */}
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            User ID is required to view the profile.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { data: profile, isLoading, error } = useUserProfile(userId);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Profile</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load user profile. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Profile Not Found</AlertTitle>
          <AlertDescription>
            The requested user profile could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}

      <ProfileHeader user={profile.user} stats={profile.stats} />
      
      {/* Profile Stats */}

      <ProfileStats stats={profile.stats} />
      
      {/* Main Content Grid */}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column */}
        
        <div className="space-y-8">
          {/* Impact Metrics */}

          <ImpactMetrics charts={profile.charts} />
          
          {/* Donation History */}

          <DonationHistory donations={profile.recentDonations} />
        </div>
        

        {/* Right Column */}

        <div className="space-y-8">

          {/* Achievement Badges */}

          <AchievementBadges achievements={profile.achievements} />
          
        </div>
      </div>
    </div>
  );
};


