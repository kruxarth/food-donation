// src/components/donation/DonationForm.tsx

import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDonationFormStore } from '@/store/donation-store';
import { useCreateDonation } from '@/hooks/use-create-donatinos';
import { fullDonationSchema } from '@/lib/validations';
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

  // Ensure proper default values
  const defaultValues: Partial<CreateDonationFormData> = {
    foodType: formData.foodType || undefined,
    items: formData.items || [],
    dietaryInfo: formData.dietaryInfo || [],
    allergenInfo: formData.allergenInfo || {
      nuts: false,
      dairy: false,
      gluten: false,
      shellfish: false,
      eggs: false,
      soy: false,
    },
    pickupAddress: formData.pickupAddress || {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    pickupDate: formData.pickupDate || undefined,
    pickupTimeSlot: formData.pickupTimeSlot || undefined,
    specialInstructions: formData.specialInstructions || '',
    termsAccepted: formData.termsAccepted || false,
  };

  const methods = useForm<CreateDonationFormData>({
    resolver: zodResolver(fullDonationSchema) as any,
    defaultValues,
    mode: 'onChange'
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
  let fieldsToValidate: (keyof CreateDonationFormData)[] = [];

  if (currentStep === 1) {
    fieldsToValidate = ['foodType'];
  } else if (currentStep === 2) {
    fieldsToValidate = ['items', 'dietaryInfo', 'allergenInfo'];
  } else if (currentStep === 3) {
    fieldsToValidate = ['pickupAddress', 'pickupDate', 'pickupTimeSlot'];
  }

  // Check current form values
  const currentValues = methods.getValues();
  console.log('Current form values:', currentValues);
  console.log('Fields to validate:', fieldsToValidate);

  // First, let's clear previous errors
  methods.clearErrors();
  
  // Validate step by step to get better error reporting
  let isStepValid = true;
  
  if (currentStep === 1) {
    if (!currentValues.foodType) {
      methods.setError('foodType', { message: 'Please select a food type' });
      isStepValid = false;
    }
  } else if (currentStep === 2) {
    if (!currentValues.items || currentValues.items.length === 0) {
      methods.setError('items', { message: 'Please add at least one food item' });
      isStepValid = false;
    } else {
      // Validate each item
      currentValues.items.forEach((item, index) => {
        if (!item.name) {
          methods.setError(`items.${index}.name`, { message: 'Item name is required' });
          isStepValid = false;
        }
        if (!item.category) {
          methods.setError(`items.${index}.category`, { message: 'Category is required' });
          isStepValid = false;
        }
        if (!item.quantity) {
          methods.setError(`items.${index}.quantity`, { message: 'Quantity is required' });
          isStepValid = false;
        }
        if (!item.unit) {
          methods.setError(`items.${index}.unit`, { message: 'Unit is required' });
          isStepValid = false;
        }
      });
    }
  } else if (currentStep === 3) {
    if (!currentValues.pickupAddress?.street) {
      methods.setError('pickupAddress.street', { message: 'Street address is required' });
      isStepValid = false;
    }
    if (!currentValues.pickupAddress?.city) {
      methods.setError('pickupAddress.city', { message: 'City is required' });
      isStepValid = false;
    }
    if (!currentValues.pickupAddress?.state) {
      methods.setError('pickupAddress.state', { message: 'State is required' });
      isStepValid = false;
    }
    if (!currentValues.pickupAddress?.zip) {
      methods.setError('pickupAddress.zip', { message: 'ZIP code is required' });
      isStepValid = false;
    }
    if (!currentValues.pickupDate) {
      methods.setError('pickupDate', { message: 'Please select a pickup date' });
      isStepValid = false;
    }
    if (!currentValues.pickupTimeSlot) {
      methods.setError('pickupTimeSlot', { message: 'Please select a time slot' });
      isStepValid = false;
    }
  }
  
  console.log('Step:', currentStep, 'Valid:', isStepValid, 'Errors:', methods.formState.errors);

  if (isStepValid && currentStep < steps.length) {
    setCurrentStep(currentStep + 1 as (1|2|3|4));
  } else {
    console.log('Validation failed. Current errors:', methods.formState.errors);
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