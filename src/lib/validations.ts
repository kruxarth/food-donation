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