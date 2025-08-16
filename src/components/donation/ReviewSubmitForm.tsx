// src/components/donation/ReviewSubmitForm.tsx

import { useFormContext, Controller } from 'react-hook-form';
import type { CreateDonationFormData } from '@/types/donation';
import { useDonationFormStore } from '@/store/donation-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { ALLERGENS, DIETARY_OPTIONS, TIME_SLOTS } from '@/lib/constants';
import { Edit } from 'lucide-react';

/**
 * @component ReviewSubmitForm
 * @description A summary view of the entire donation form for final review and submission.
 * @returns {JSX.Element} The rendered ReviewSubmitForm component.
 */
export const ReviewSubmitForm = () => {
  const { control, getValues } = useFormContext<CreateDonationFormData>();
  const { setCurrentStep } = useDonationFormStore();
  const formData = getValues();

  const selectedTimeSlot = TIME_SLOTS.find(ts => ts.id === formData.pickupTimeSlot);
  const selectedDietary = DIETARY_OPTIONS.filter(d => formData.dietaryInfo?.includes(d.id));
  const selectedAllergens = ALLERGENS.filter(a => formData.allergenInfo?.[a.id as keyof typeof formData.allergenInfo]);

  return (
    <div className="space-y-8">
      <Alert>
        <AlertTitle>Final Review</AlertTitle>
        <AlertDescription>
          Please review all the details below carefully before submitting your donation.
        </AlertDescription>
      </Alert>
      
      {/* Items Review */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Items & Dietary Info</CardTitle>
            <CardDescription>{formData.items?.length || 0} items listed</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => setCurrentStep(2)}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {formData.items?.map(item => (
              <li key={item.id} className="py-2">
                <strong>{item.quantity} {item.unit}</strong> of {item.name} ({item.category})
              </li>
            ))}
          </ul>
           {selectedDietary.length > 0 && <div className="mt-4">
             <h4 className="font-semibold text-sm mb-2">Dietary Info:</h4>
             <div className="flex flex-wrap gap-2">{selectedDietary.map(d => <Badge key={d.id} variant="secondary">{d.name}</Badge>)}</div>
           </div>}
           {selectedAllergens.length > 0 && <div className="mt-4">
             <h4 className="font-semibold text-sm mb-2">Allergens Present:</h4>
             <div className="flex flex-wrap gap-2">{selectedAllergens.map(a => <Badge key={a.id} variant="destructive">{a.name}</Badge>)}</div>
           </div>}
        </CardContent>
      </Card>
      
      {/* Pickup Review */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pickup Details</CardTitle>
            <CardDescription>Address and schedule for pickup</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm">Address:</h4>
            <p className="text-muted-foreground">
              {formData.pickupAddress?.street}, {formData.pickupAddress?.city}, {formData.pickupAddress?.state} {formData.pickupAddress?.zip}
            </p>
          </div>
           <div>
            <h4 className="font-semibold text-sm">Date & Time:</h4>
            <p className="text-muted-foreground">
              {formData.pickupDate ? format(formData.pickupDate, 'EEEE, MMMM d, yyyy') : 'N/A'}
              <br/>
              {selectedTimeSlot?.label} ({selectedTimeSlot?.range})
            </p>
          </div>
          {formData.specialInstructions && <div>
            <h4 className="font-semibold text-sm">Instructions:</h4>
            <p className="text-muted-foreground">{formData.specialInstructions}</p>
          </div>}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <div>
        <Controller
          control={control}
          name="termsAccepted"
          render={({ field, fieldState }) => (
            <>
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms" className="text-sm font-medium">
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              {fieldState.error && <p className="text-sm text-destructive mt-2">{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>
    </div>
  );
};