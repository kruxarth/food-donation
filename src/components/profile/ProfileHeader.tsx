// src/components/profile/ProfileHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { CustomProgress } from "../ui/custom-progress";
import type { UserInfo, UserStats } from "@/types/profile";
import { format } from "date-fns";
import { Edit, MapPin, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  user: UserInfo;
  stats: UserStats;
}

export const ProfileHeader = ({ user, stats }: ProfileHeaderProps) => (
  <div className="w-full rounded-lg bg-card text-card-foreground p-6 md:p-8 space-y-6">
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
            <Badge variant="secondary">{user.userType}</Badge>
        </div>
        <p className="text-muted-foreground mt-2">Member since {format(new Date(stats.memberSince), "MMMM yyyy")}</p>
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{user.location}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        <Button asChild><Link to="/dashboard/profile/settings"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Link></Button>
      </div>
    </div>
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Profile Completion</p>
        <p className="text-sm font-bold text-primary">{stats.profileCompletion}%</p>
      </div>
      <CustomProgress value={stats.profileCompletion} aria-label={`${stats.profileCompletion}% profile completion`} />
    </div>
  </div>
);