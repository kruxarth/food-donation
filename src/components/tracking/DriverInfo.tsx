// src/components/tracking/DriverInfo.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { DriverInfo as DriverType } from '@/types/tracking';
import { Phone, MessageSquare, Star } from 'lucide-react';

export const DriverInfo = ({ driver }: { driver: DriverType }) => (
  <Card>
    <CardHeader><CardTitle>Your Driver</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={driver.avatarUrl} alt={driver.name} />
          <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg">{driver.name}</p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>{driver.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm">Vehicle</h4>
        <p className="text-muted-foreground">{driver.vehicle.color} {driver.vehicle.makeModel} - {driver.vehicle.licensePlate}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline"><Phone className="mr-2 h-4 w-4" /> Call</Button>
        <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
      </div>
    </CardContent>
  </Card>
);