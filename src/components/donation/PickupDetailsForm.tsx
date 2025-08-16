// src/components/donation/PickupDetailsForm.tsx

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { CreateDonationFormData } from '@/types/donation';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { LocationPicker } from './LocationPicker';
import { TimeSlotPicker } from './TimeSlotPicker';

/**
 * @component PickupDetailsForm
 * @description The form step for collecting pickup address, date, time, and instructions.
 * @returns {JSX.Element} The rendered PickupDetailsForm component.
 */
export const PickupDetailsForm = () => {
  const { control, watch, formState: { errors } } = useFormContext<CreateDonationFormData>();
  const selectedDate = watch('pickupDate');
  const selectedTimeSlot = watch('pickupTimeSlot');

  return (
    <div className="space-y-8">
      <LocationPicker />
      
      <Card>
        <CardHeader><CardTitle>Pickup Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Preferred Pickup Date</Label>
            <Controller
              control={control}
              name="pickupDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal mt-2", !field.value && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.pickupDate && <p className="text-sm text-destructive mt-1">{errors.pickupDate.message}</p>}
          </div>

          <div>
            <Label>Preferred Time Slot</Label>
            <Controller
              control={control}
              name="pickupTimeSlot"
              render={({ field }) => (
                <div className="mt-2">
                   <TimeSlotPicker
                    selectedSlot={field.value}
                    onSelectSlot={field.onChange}
                    selectedDate={selectedDate}
                  />
                </div>
              )}
            />
             {errors.pickupTimeSlot && <p className="text-sm text-destructive mt-1">{errors.pickupTimeSlot.message}</p>}
          </div>

           <div>
            <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
            <Textarea
              id="specialInstructions"
              {...control.register('specialInstructions')}
              placeholder="e.g., Use the loading dock on the north side of the building. Call upon arrival."
              className="mt-2"
            />
             {errors.specialInstructions && <p className="text-sm text-destructive mt-1">{errors.specialInstructions.message}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};