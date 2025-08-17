// src/pages/TrackingPage.tsx
import { useParams } from 'react-router-dom';
import { useDonationTracking } from '@/hooks/use-donation-tracking';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { StatusTimeline } from '@/components/tracking/StatusTimeline';
import { TrackingMap } from '@/components/tracking/TrackingMap';
import { DriverInfo } from '@/components/tracking/DriverInfo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

const TrackingPageSkeleton = () => (
  <div className="grid gap-6 lg:grid-cols-3">
    <div className="lg:col-span-2 space-y-6">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
    <div className="lg:col-span-1 space-y-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  </div>
);

const TrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useDonationTracking(id);

  if (isLoading) return <TrackingPageSkeleton />;

  if (isError || !data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not load tracking information for donation ID "{id}". It may not exist or an error occurred.
        </AlertDescription>
      </Alert>
    );
  }

  const { summary, currentStatus, timeline, driver, route, eta } = data;

  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Track Donation #{summary.id}</h1>
       <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
              <Card>
                  <CardHeader>
                      <div className="flex justify-between items-start">
                          <div>
                              <CardTitle>Donation Overview</CardTitle>
                              <CardDescription>Created on {new Date(summary.createdAt).toLocaleDateString()}</CardDescription>
                          </div>
                          <Badge variant="default" className="text-lg">{currentStatus}</Badge>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <p><strong>From:</strong> {summary.pickupAddress}</p>
                      <p><strong>To:</strong> {summary.deliveryAddress}</p>
                  </CardContent>
              </Card>
              <StatusTimeline timeline={timeline} currentStatus={currentStatus} />
          </div>
          <div className="lg:col-span-1 space-y-6">
              <TrackingMap route={route} eta={eta} />
              {driver && <DriverInfo driver={driver} />}
          </div>
       </div>
    </div>
  );
};

export default TrackingPage;