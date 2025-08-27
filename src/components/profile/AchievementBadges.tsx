// src/components/profile/AchievementBadges.tsx - Safe version without TooltipProvider
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Achievement } from "@/types/profile";
import { cn } from "@/lib/utils";

export const AchievementBadges = ({ achievements }: { achievements: Achievement[] }) => {
  console.log("AchievementBadges rendering with", achievements.length, "achievements");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {achievements.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No achievements yet. Keep donating to unlock badges!
          </div>
        ) : (
          achievements.map((ach) => (
            <div key={ach.id} className="flex flex-col items-center gap-2 text-center">
              <div 
                className={cn(
                  "relative flex h-20 w-20 items-center justify-center rounded-full bg-muted",
                  !ach.unlockedAt && "opacity-40"
                )}
                title={`${ach.name}: ${ach.description}`} // Simple HTML title instead of Tooltip
              >
                <ach.icon className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xs font-semibold">{ach.name}</p>
              {ach.progress && !ach.unlockedAt && (
                <Progress 
                  value={(ach.progress.current / ach.progress.target) * 100} 
                  className="h-1 w-full" 
                />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};