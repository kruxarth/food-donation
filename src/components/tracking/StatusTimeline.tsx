// src/components/tracking/StatusTimeline.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { StatusUpdate } from '@/types/tracking';
import { CheckCircle, Circle, Loader2, Truck } from 'lucide-react';
import { format } from 'date-fns';

interface StatusTimelineProps {
  timeline: StatusUpdate[];
  currentStatus: string;
}

const getStatusIcon = (status: StatusUpdate, currentStatus: string) => {
  if (status.isCompleted) {
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
  if (status.status === currentStatus) {
    return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
  }
  return <Circle className="h-5 w-5 text-muted-foreground" />;
};

export const StatusTimeline = ({ timeline, currentStatus }: StatusTimelineProps) => (
  <Card>
    <CardHeader><CardTitle>Donation Timeline</CardTitle></CardHeader>
    <CardContent>
      <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-2">
        {timeline.map((status, index) => (
          <li key={index} className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-8 ring-background">
              {getStatusIcon(status, currentStatus)}
            </span>
            <div className="ml-2">
              <h3 className={cn("font-semibold", status.isCompleted ? "text-primary" : "text-foreground")}>
                {status.status}
              </h3>
              {status.isCompleted && (
                <time className="block text-sm font-normal leading-none text-muted-foreground">
                  {format(new Date(status.timestamp), 'MMM d, yyyy, h:mm a')}
                </time>
              )}
              <p className="text-sm text-muted-foreground">{status.notes}</p>
            </div>
          </li>
        ))}
      </ol>
    </CardContent>
  </Card>
);