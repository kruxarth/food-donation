// src/components/donation/ItemDetailsForm.tsx

import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import type { CreateDonationFormData } from '@/types/donation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ALLERGENS, DIETARY_OPTIONS, QUANTITY_UNITS } from '@/lib/constants';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

/**
 * @component ItemDetailsForm
 * @description A dynamic form for adding, removing, and detailing food items.
 * Includes fields for allergens and dietary information.
 * @returns {JSX.Element} The rendered ItemDetailsForm component.
 */
export const ItemDetailsForm = () => {
  const { control, register, formState: { errors } } = useFormContext<CreateDonationFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAddItem = () => {
    append({
      id: uuidv4(),
      name: '',
      category: '',
      quantity: '',
      unit: '',
      expiryDate: undefined,
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Food Items</h3>
        {fields.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
             <p className="text-muted-foreground">No items added yet.</p>
          </div>
        )}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="relative p-4 pt-8">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                onClick={() => remove(index)}
                aria-label={`Remove item ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Item Name */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.name`}>Item Name</Label>
                  <Input {...register(`items.${index}.name`)} id={`items.${index}.name`} placeholder="e.g., Sourdough Bread" />
                  {errors.items?.[index]?.name && <p className="text-sm text-destructive">{errors.items[index]?.name?.message}</p>}
                </div>

                {/* Category */}
                <div className="space-y-2">
                   <Label htmlFor={`items.${index}.category`}>Category</Label>
                   <Input {...register(`items.${index}.category`)} id={`items.${index}.category`} placeholder="e.g., Baked Goods" />
                   {errors.items?.[index]?.category && <p className="text-sm text-destructive">{errors.items[index]?.category?.message}</p>}
                </div>
                
                {/* Quantity & Unit */}
                <div className="flex gap-2">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor={`items.${index}.quantity`}>Quantity</Label>
                        <Input {...register(`items.${index}.quantity`)} id={`items.${index}.quantity`} type="number" placeholder="20" />
                         {errors.items?.[index]?.quantity && <p className="text-sm text-destructive">{errors.items[index]?.quantity?.message}</p>}
                    </div>
                    <div className="space-y-2 w-28">
                        <Label htmlFor={`items.${index}.unit`}>Unit</Label>
                        <Controller
                            control={control}
                            name={`items.${index}.unit`}
                            render={({ field: selectField }) => (
                                <Select onValueChange={selectField.onChange} defaultValue={selectField.value}>
                                    <SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger>
                                    <SelectContent>
                                        {QUANTITY_UNITS.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                         {errors.items?.[index]?.unit && <p className="text-sm text-destructive">{errors.items[index]?.unit?.message}</p>}
                    </div>
                </div>

                {/* Expiry Date */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.expiryDate`}>Expiry Date (Optional)</Label>
                  <Controller
                    control={control}
                    name={`items.${index}.expiryDate`}
                    render={({ field: dateField }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !dateField.value && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateField.value ? format(dateField.value, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateField.value} onSelect={dateField.onChange} initialFocus /></PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        {errors.items && typeof errors.items.message === 'string' && <p className="text-sm text-destructive mt-2">{errors.items.message}</p>}
        <Button type="button" variant="outline" className="mt-4" onClick={handleAddItem}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Special Dietary Information</h3>
          <div className="space-y-2">
            {DIETARY_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                     <Controller
                        name="dietaryInfo"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id={option.id}
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), option.id])
                                        : field.onChange(field.value?.filter((value) => value !== option.id))
                                }}
                            />
                        )}
                     />
                    <label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        {option.name}
                    </label>
                </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Allergen Warnings</h3>
          <div className="grid grid-cols-2 gap-2">
            {ALLERGENS.map(allergen => (
              <div key={allergen.id} className="flex items-center space-x-2">
                <Controller
                  name={`allergenInfo.${allergen.id}` as keyof CreateDonationFormData}
                  control={control}
                  render={({ field }) => (
                     <Checkbox id={allergen.id} checked={!!field.value} onCheckedChange={field.onChange} />
                  )}
                />
                 <label htmlFor={allergen.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                    <allergen.icon className="h-4 w-4" />
                    {allergen.name}
                 </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};