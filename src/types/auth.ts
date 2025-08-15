// src/types/auth.ts

import { z } from "zod";
import { loginSchema, signupSchema } from "@/lib/validations";

/**
 * @typedef LoginFormData
 * @description Type definition for the data captured in the login form.
 * Inferred from the Zod login schema.
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * @typedef SignupFormData
 * @description Type definition for the data captured in the signup form.
 * Inferred from the Zod signup schema.
 */
export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * @interface User
 * @description Represents the structure of a user object in the application.
 */
export interface User {
  id: string;
  fullName: string;
  email: string;
  userType: "individual" | "business";
}