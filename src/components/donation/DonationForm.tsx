// src/components/donation/DonationForm.tsx

import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDonationFormStore } from '@/store/donation-store';
import { useCreateDonation } from '@/hooks/use-create-donatinos';
import { fullDonationSchema, step1Schema, step2Schema, step3Schema, step4Schema } from '@/lib/validations';
import type { CreateDonationFormData } from '@/types/donation';
import { Button } from '@/components/ui/button';
import { FoodCategorySelector } from './FoodCategorySelector';
import { ItemDetailsForm } from './ItemDetailsForm';
import { PickupDetailsForm } from './PickupDetailsForm';
import { ReviewSubmitForm } from './ReviewSubmitForm';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Food Type' },
  { id: 2, title: 'Item Details' },
  { id: 3, title: 'Pickup Details' },
  { id: 4, title: 'Review & Submit' },
];

/**
 * @component DonationForm
 * @description The main multi-step form component that orchestrates the entire donation creation process.
 * @returns {JSX.Element} The rendered DonationForm component.
 */
export const DonationForm = () => {
  const { currentStep, formData, setCurrentStep, updateFormData, resetForm } = useDonationFormStore();
  const createDonationMutation = useCreateDonation();
  const navigate = useNavigate();

  const methods = useForm<CreateDonationFormData>({
    resolver: zodResolver(fullDonationSchema) as any,
    defaultValues: formData,
    mode: 'onChange' // To keep draft updated
  });
  
  // Update Zustand store whenever form data changes (for draft saving)
  useEffect(() => {
      interface WatchValue {
        [key: string]: unknown;
      }
      interface Subscription {
        unsubscribe: () => void;
      }
      const subscription: Subscription = methods.watch((value: WatchValue) => {
          updateFormData(value);
      });
      return () => subscription.unsubscribe();
  }, [methods.watch, updateFormData]);

  const handleNext = async () => {
    let schema;
    let fieldsToValidate: (keyof CreateDonationFormData)[] = [];

    if (currentStep === 1) {
        schema = step1Schema;
        fieldsToValidate = ['foodType'];
    } else if (currentStep === 2) {
        schema = step2Schema;
        fieldsToValidate = ['items', 'dietaryInfo', 'allergenInfo'];
    } else if (currentStep === 3) {
        schema = step3Schema;
        fieldsToValidate = ['pickupAddress', 'pickupDate', 'pickupTimeSlot', 'specialInstructions'];
    }

    const isStepValid = await methods.trigger(fieldsToValidate);

    if (isStepValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1 as (1|2|3|4));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1 as (1|2|3|4));
    }
  };

  const onSubmit = (data: CreateDonationFormData) => {
    createDonationMutation.mutate(data, {
      onSuccess: () => {
        resetForm(); // Clear the form and draft from localStorage
        navigate('/dashboard');
      }
    });
  };
  
  const selectedFoodType = methods.watch('foodType');

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        {/* Stepper UI */}
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    currentStep > step.id ? "bg-primary text-primary-foreground" :
                    currentStep === step.id ? "bg-primary text-primary-foreground border-2 border-ring" : "bg-muted text-muted-foreground"
                  )}
                >
                  {step.id}
                </div>
                <p className={cn("text-sm mt-2", currentStep >= step.id ? "font-semibold" : "text-muted-foreground")}>{step.title}</p>
              </div>
              {index < steps.length - 1 && <div className="flex-1 h-0.5 bg-border mx-4" />}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 1 && <FoodCategorySelector selectedValue={selectedFoodType} onSelect={(val) => methods.setValue('foodType', val, { shouldValidate: true })} />}
          {currentStep === 2 && <ItemDetailsForm />}
          {currentStep === 3 && <PickupDetailsForm />}
          {currentStep === 4 && <ReviewSubmitForm />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext}>Next</Button>
            ) : (
              <Button type="submit" disabled={createDonationMutation.isPending}>
                 {createDonationMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Donation
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};