// src/components/donation/LocationPicker.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, LocateFixed } from 'lucide-react';
import type { CreateDonationFormData } from '@/types/donation';

/**
 * @component LocationPicker
 * @description A component for inputting a physical address, with a mock feature
 * to use the user's current location. Designed for React Hook Form.
 * @returns {JSX.Element} The rendered LocationPicker component.
 */
export const LocationPicker = () => {
  const { register, setValue, formState: { errors } } = useFormContext<CreateDonationFormData>();
  const [isLocating, setIsLocating] = React.useState(false);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    // Simulate fetching GPS location
    setTimeout(() => {
      const mockAddress = {
        id: 'new-current-location',
        street: '123 Innovation Drive',
        city: 'Techville',
        state: 'CA',
        zip: '94043',
      };
      // Set values for all fields in the address object
      setValue('pickupAddress.street', mockAddress.street, { shouldValidate: true });
      setValue('pickupAddress.city', mockAddress.city, { shouldValidate: true });
      setValue('pickupAddress.state', mockAddress.state, { shouldValidate: true });
      setValue('pickupAddress.zip', mockAddress.zip, { shouldValidate: true });
      setValue('pickupAddress.id', mockAddress.id, { shouldValidate: true });
      setIsLocating(false);
    }, 1500);
  };

  const addrErrors = errors.pickupAddress;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pickup Address</CardTitle>
        <CardDescription>Enter the address where the donation will be picked up.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button type="button" variant="outline" className="w-full" onClick={handleUseCurrentLocation} disabled={isLocating}>
          {isLocating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LocateFixed className="mr-2 h-4 w-4" />
          )}
          Use Current Location
        </Button>
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input id="street" {...register('pickupAddress.street')} placeholder="123 Main St" />
          {addrErrors?.street && <p className="text-sm text-destructive">{addrErrors.street.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register('pickupAddress.city')} placeholder="Anytown" />
            {addrErrors?.city && <p className="text-sm text-destructive">{addrErrors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" {...register('pickupAddress.state')} placeholder="CA" />
            {addrErrors?.state && <p className="text-sm text-destructive">{addrErrors.state.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input id="zip" {...register('pickupAddress.zip')} placeholder="12345" />
          {addrErrors?.zip && <p className="text-sm text-destructive">{addrErrors.zip.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
};