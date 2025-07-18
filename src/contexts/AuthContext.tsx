import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@steelforge.com',
    role: 'admin',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'floor.manager@steelforge.com',
    role: 'floor_manager',
    department: 'Production Line A',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'unit.head@steelforge.com',
    role: 'unit_head',
    department: 'Manufacturing Unit 1',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '4',
    name: 'Lisa Chen',
    email: 'plant.head@steelforge.com',
    role: 'plant_head',
    department: 'Entire Facility',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '5',
    name: 'Tom Rodriguez',
    email: 'worker@steelforge.com',
    role: 'worker',
    workerId: 'W001',
    machineId: 'M001',
    department: 'Production Line A',
    shiftPattern: 'Day Shift',
    createdAt: '2024-01-01',
    isActive: true
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('steelforge_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const user = mockUsers.find(u => u.email === credentials.email);
    if (user && credentials.password === 'password') {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('steelforge_user', JSON.stringify(updatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('steelforge_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}