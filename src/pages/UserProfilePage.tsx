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


