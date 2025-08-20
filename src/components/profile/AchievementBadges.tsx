// src/components/profile/AchievementBadges.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import type { Achievement } from "@/types/profile";
import { cn } from "@/lib/utils";

export const AchievementBadges = ({ achievements }: { achievements: Achievement[] }) => (
  <Card>
    <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
    <CardContent className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      <TooltipProvider>
        {achievements.map((ach) => (
          <Tooltip key={ach.id}>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className={cn("relative flex h-20 w-20 items-center justify-center rounded-full bg-muted", !ach.unlockedAt && "opacity-40")}>
                  <ach.icon className="h-10 w-10 text-primary" />
                </div>
                <p className="text-xs font-semibold">{ach.name}</p>
                {ach.progress && !ach.unlockedAt && (
                  <Progress value={(ach.progress.current / ach.progress.target) * 100} className="h-1 w-full" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{ach.name}</p>
              <p>{ach.description}</p>
              {ach.unlockedAt ? <p className="text-xs text-muted-foreground">Unlocked on {new Date(ach.unlockedAt).toLocaleDateString()}</p> : <p className="text-xs text-muted-foreground">In Progress</p>}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </CardContent>
  </Card>
);