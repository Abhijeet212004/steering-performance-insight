export type UserRole = 'worker' | 'floor_manager' | 'unit_head' | 'plant_head' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  workerId?: string;
  machineId?: string;
  department?: string;
  shiftPattern?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  workerId?: string;
  machineId?: string;
  department?: string;
  shiftPattern?: string;
  password: string;
}