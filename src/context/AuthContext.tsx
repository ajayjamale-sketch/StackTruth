import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  login: (role?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('st-auth') === 'true';
  });
  
  const [userRole, setUserRole] = useState<string>(() => {
    return localStorage.getItem('st-role') || 'developer';
  });

  const login = (role: string = 'developer') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('st-auth', 'true');
    localStorage.setItem('st-role', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('developer');
    localStorage.setItem('st-auth', 'false');
    localStorage.removeItem('st-role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
