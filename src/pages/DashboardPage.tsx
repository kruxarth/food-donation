// src/pages/DashboardPage.tsx

import React from 'react';
import { useDonations, useImpactMetrics, useScheduledPickups } from '@/hooks/use-donations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HandHeart, Leaf, Truck, AlertCircle } from "lucide-react";
import{  DonationStatus } from '@/types/donation';
import type { Donation } from '@/types/donation';
import { format } from "date-fns";

/**
 * @component ImpactMetricsCards
 * @description Displays key impact metrics in a card format with loading skeletons.
 */
const ImpactMetricsCards: React.FC = () => {
  const { data: metrics, isLoading, isError } = useImpactMetrics();

  if (isError) return <p>Could not load metrics.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { icon: HandHeart, label: "Total Meals Donated", value: metrics?.totalMealsDonated, skeletonWidth: 'w-24' },
        { icon: Leaf, label: "CO2 Saved (kg)", value: metrics?.co2SavedKg, skeletonWidth: 'w-20' },
        { icon: Truck, label: "Active Donations", value: metrics?.activeDonations, skeletonWidth: 'w-12' },
      ].map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className={`h-8 ${item.skeletonWidth}`} />
            ) : (
              <div className="text-2xl font-bold">{item.value ?? 'N/A'}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const getStatusBadgeVariant = (status: DonationStatus) => {
    switch(status) {
        case DonationStatus.Pending: return "secondary";
        case DonationStatus.InProgress: return "default";
        case DonationStatus.Completed: return "outline";
        case DonationStatus.Cancelled: return "destructive";
        default: return "secondary";
    }
}

/**
 * @component ActiveDonationsList
 * @description Displays a list of donations that are currently pending or in transit.
 */
const ActiveDonationsList: React.FC<{ donations: Donation[], isLoading: boolean }> = ({ donations, isLoading }) => {
    const activeDonations = donations?.filter(d => d.status === DonationStatus.Pending || d.status === DonationStatus.InProgress);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Donations</CardTitle>
                <CardDescription>Your donations that are pending pickup or in transit.</CardDescription>
            </CardHeader>
            <CardContent>
                 {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : activeDonations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No active donations.</p>
                ) : (
                    <ul className="space-y-4">
                        {activeDonations.map(d => (
                           <li key={d.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted/50 rounded-lg">
                               <div>
                                    <p className="font-semibold">{d.items.map(i => i.name).join(', ')}</p>
                                    <p className="text-sm text-muted-foreground">Pickup on {format(new Date(d.pickupDate), "MMM d, yyyy")}</p>
                               </div>
                               <Badge variant={getStatusBadgeVariant(d.status)} className="mt-2 sm:mt-0">{d.status}</Badge>
                           </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};

/**
 * @component DonationsHistoryTable
 * @description Displays a table of completed or cancelled donations.
 */
const DonationsHistoryTable: React.FC<{ donations: Donation[], isLoading: boolean }> = ({ donations, isLoading }) => {
    const historicalDonations = donations?.filter(d => d.status === DonationStatus.Completed || d.status === DonationStatus.Cancelled);
    
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Donation History</CardTitle>
                 <CardDescription>A record of your past donations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Recipient</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                </TableRow>
                            ))
                        ) : historicalDonations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">No historical donations found.</TableCell>
                            </TableRow>
                        ) : (
                             historicalDonations.map(d => (
                                <TableRow key={d.id}>
                                    <TableCell>{format(new Date(d.pickupDate), "MMM d, yyyy")}</TableCell>
                                    <TableCell>{d.items.map(i => i.name).join(', ')}</TableCell>
                                    <TableCell>{d.recipient.name}</TableCell>
                                    <TableCell><Badge variant={getStatusBadgeVariant(d.status)}>{d.status}</Badge></TableCell>
                                </TableRow>
                             ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

/**
 * @component PickupCalendar
 * @description Displays a calendar highlighting upcoming pickup dates.
 */
const PickupCalendar: React.FC = () => {
    const { data: pickups, isLoading, isError } = useScheduledPickups();
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    if (isError) return <p>Could not load calendar.</p>;
    
    const pickupDates = pickups?.map(p => p.date) || [];
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Scheduled Pickups</CardTitle>
                <CardDescription>Your upcoming donation pickup schedule.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                {isLoading ? (
                    <Skeleton className="w-full h-[300px]" />
                ) : (
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        modifiers={{ scheduled: pickupDates }}
                        modifiersStyles={{ scheduled: { 
                            border: '2px solid', 
                            borderColor: 'hsl(var(--primary))', 
                            borderRadius: '50%' 
                        }}}
                        className="rounded-md"
                    />
                )}
            </CardContent>
        </Card>
    );
};

/**
 * @page DashboardPage
 * @description The main dashboard overview page, assembling all data widgets.
 */
const DashboardPage: React.FC = () => {
  const { data: donations, isLoading, isError, error } = useDonations();

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load dashboard data. Please try again later. Error: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <ImpactMetricsCards />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <ActiveDonationsList donations={donations || []} isLoading={isLoading} />
            <DonationsHistoryTable donations={donations || []} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
            <PickupCalendar />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;