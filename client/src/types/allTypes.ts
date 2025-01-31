import { ReactNode } from 'react';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AdminRouteProps {
  children: ReactNode;
}