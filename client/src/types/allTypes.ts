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