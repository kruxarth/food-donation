// src/lib/constants.ts
import { Apple, Milk, Wheat, Fish, Egg, Beef, Shell, Vegan, Leaf, Nut } from "lucide-react";
import type { FoodCategory, TimeSlot, DietaryInfo, Allergen } from "@/types/donation";

export const FOOD_CATEGORIES: FoodCategory[] = [
  { id: 'perishable', name: 'Perishable', description: 'Fresh items like produce, dairy, and baked goods.', icon: Apple },
  { id: 'non-perishable', name: 'Non-Perishable', description: 'Canned goods, dry pasta, rice, and pantry staples.', icon: Wheat },
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'morning', label: 'Morning', range: '9:00 AM - 12:00 PM', available: true },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 PM - 4:00 PM', available: true },
  { id: 'evening', label: 'Evening', range: '4:00 PM - 7:00 PM', available: false },
];

export const DIETARY_OPTIONS: DietaryInfo[] = [
  { id: 'vegetarian', name: 'Vegetarian', icon: Leaf },
  { id: 'vegan', name: 'Vegan', icon: Vegan },
  { id: 'gluten-free', name: 'Gluten-Free', icon: Wheat },
];

export const ALLERGENS: Allergen[] = [
  { id: 'nuts', name: 'Nuts', icon: Nut },
  { id: 'dairy', name: 'Dairy', icon: Milk },
  { id: 'gluten', name: 'Gluten', icon: Wheat },
  { id: 'shellfish', name: 'Shellfish', icon: Shell },
  { id: 'eggs', name: 'Eggs', icon: Egg },
  { id: 'soy', name: 'Soy', icon: Beef },
];

export const QUANTITY_UNITS = ["pieces", "kg", "lbs", "boxes", "cans", "gallons", "bunches"];