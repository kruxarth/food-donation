// src/components/tracking/TrackingMap.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RouteInfo } from '@/types/tracking';
import { MapPin, Clock } from 'lucide-react';

export const TrackingMap = ({ route, eta }: { route: RouteInfo, eta: string }) => (
  <Card>
    <CardHeader><CardTitle>Live Map</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground"></p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{route.estimatedDistance}</span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-primary">
          <Clock className="h-4 w-4" />
          <span>ETA: {new Date(eta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);