// src/components/donation/TimeSlotPicker.tsx

import { Button } from '@/components/ui/button';
import { TIME_SLOTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { TimeSlot } from '@/types/donation';

interface TimeSlotPickerProps {
  selectedSlot: string | undefined;
  onSelectSlot: (slotId: TimeSlot['id']) => void;
  selectedDate: Date | undefined;
}

/**
 * @component TimeSlotPicker
 * @description Renders a grid of time slots, allowing for selection.
 * Disables unavailable or past time slots.
 * @param {TimeSlotPickerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered TimeSlotPicker component.
 */
export const TimeSlotPicker = ({ selectedSlot, onSelectSlot, selectedDate }: TimeSlotPickerProps)  => {
  // A real implementation might have more complex logic based on the date
  const isSlotDisabled = (slot: TimeSlot) => {
    return !slot.available;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TIME_SLOTS.map((slot) => (
        <Button
          key={slot.id}
          type="button"
          variant={selectedSlot === slot.id ? 'default' : 'outline'}
          className={cn("h-auto py-4 flex flex-col items-start", selectedSlot === slot.id && "bg-primary text-primary-foreground")}
          onClick={() => onSelectSlot(slot.id)}
          disabled={isSlotDisabled(slot)}
          aria-pressed={selectedSlot === slot.id}
        >
          <span className="font-semibold">{slot.label}</span>
          <span className="text-sm">{slot.range}</span>
          {!slot.available && <span className="text-xs text-destructive mt-1">(Unavailable)</span>}
        </Button>
      ))}
    </div>
  );
};