import { ReactNode } from 'react';

// Frontend User Model (without Passwort and Methodes)
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage?: string;
  favorites: Favorite[];
}

// Frontend User Model for new Users (while Register)
export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  profileImage?: string;
  favorites: Favorite[];
}

export type EditableUser = Partial<User> & { password?: string };

// Frontend Model fot Tours
export interface Tour {
  _id: string;
  user_id: string;       // User ID of the user
  title: string;         // Name of the Tour
  destination: string;   // Where we're going
  startDate: string;       // Start of the Tour
  endDate: string;         // End of the tour
  duration?: number;     // Calculated duration in days
  days: ITourDay[];      // Different Days with different places
}

// Model for one day on the Tour
export interface ITourDay {
  _id: string;
  date: Date;
  locations: ITourPlace[]; // Save many places for one tour
}

// Model for Places on one selected day
export interface ITourPlace {
  _id: string;
  latitude: number;
  longitude: number;
  label?: string;
}

// Frontend Model for Favorites
export interface Favorite {
  _id: string;
  latitude: number;
  longitude: number;
  label?: string;
}

// Props for AdminRoute Middleware
export interface AdminRouteProps {
  children: ReactNode;
}