// src/lib/validations.ts

import { z } from "zod";

// Regex for basic phone number validation (supports formats like +1-123-456-7890)
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

/**
 * @const loginSchema
 * @description Zod schema for validating user login credentials.
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  rememberMe: z.boolean().optional(),
});

/**
 * @const signupSchema
 * @description Zod schema for validating new user registration data.
 * Includes password complexity and confirmation checks.
 */
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z
      .string()
      .regex(phoneRegex, { message: "Please enter a valid phone number." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
    userType: z.enum(["individual", "business"], {
      message: "You need to select a user type.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Path to show the error message on
  });

  // src/lib/validations.ts






  


const foodItemSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Item name must be at least 2 characters."),
  category: z.string().min(1, "Please select a category."),
  quantity: z.string().min(1, "Quantity is required."),
  unit: z.string().min(1, "Unit is required."), // Simplified for now
  expiryDate: z.date().optional(),
  description: z.string().optional(),
});

export const step1Schema = z.object({
  foodType: z.enum(['perishable', 'non-perishable'], { message: "Please select a food type." }),
});

export const step2Schema = z.object({
  items: z.array(foodItemSchema).min(1, "Please add at least one food item."),
  dietaryInfo: z.array(z.enum(['vegetarian', 'vegan', 'gluten-free'])),
  allergenInfo: z.object({
    nuts: z.boolean(), dairy: z.boolean(), gluten: z.boolean(),
    shellfish: z.boolean(), eggs: z.boolean(), soy: z.boolean(),
  }),
});

export const step3Schema = z.object({
  pickupAddress: z.object({
    id: z.string().optional(),
    street: z.string().min(3, "Street address is required."),
    city: z.string().min(2, "City is required."),
    state: z.string().min(2, "State is required."),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code."), // Allow ZIP+4 format
    isPrimary: z.boolean().optional(),
  }),
  pickupDate: z.date({ message: "Please select a pickup date." }),
  pickupTimeSlot: z.enum(['morning', 'afternoon', 'evening'], { message: "Please select a time slot." }),
  specialInstructions: z.string().max(300, "Instructions cannot exceed 300 characters.").optional(),
});

export const step4Schema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
});

export const fullDonationSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);