// src/components/profile/ProfileStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserStats } from "@/types/profile";
import { HandHeart, Leaf, Pizza, Repeat } from "lucide-react";

const statsItems = (stats: UserStats) => [
  { title: "Total Donations", value: stats.totalDonations, icon: Pizza },
  { title: "Meals Provided", value: stats.totalMeals, icon: HandHeart },
  { title: "CO2 Saved (kg)", value: stats.co2Saved, icon: Leaf },
  { title: "Current Streak", value: `${stats.currentStreak} months`, icon: Repeat },
];

export const ProfileStats = ({ stats }: { stats: UserStats }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {statsItems(stats).map((item, index) => (
      <Card key={index}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
          <item.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
        </CardContent>
      </Card>
    ))}
  </div>
);