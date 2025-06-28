export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  role: string;
}

export interface BlockedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  reason?: string; // ako backend vraća razlog, opciono
}