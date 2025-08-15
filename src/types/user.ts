// src/types/user.ts

/**
 * @interface User
 * @description Represents the structure of a user object in the application.
 */
export interface User {
  id: string;
  fullName: string;
  image: any,
  email: string;
  userType: "individual" | "business";
  avatarUrl?: string; // Optional avatar image URL
}