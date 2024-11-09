import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role: User['role'] }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        role: 'jobseeker',
      };

      setUser(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      navigate('/dashboard/jobseeker');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  }, [navigate]);

  const register = useCallback(async (userData: { name: string; email: string; password: string; role: User['role'] }) => {
    try {
      // Simulate API call
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };

      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      navigate('/profile/setup');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  }, [navigate]);

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
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