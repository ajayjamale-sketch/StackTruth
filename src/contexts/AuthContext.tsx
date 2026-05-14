import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User, UserRole } from "@/types";
import { MOCK_USERS } from "@/constants/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGitHub: () => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_USER_MAP: Record<UserRole, User> = {
  developer: MOCK_USERS[0],
  expert: MOCK_USERS[1],
  recruiter: MOCK_USERS[2],
  admin: MOCK_USERS[3],
};

const CREDENTIAL_MAP: Record<string, UserRole> = {
  "alex@example.com": "developer",
  "sarah@example.com": "expert",
  "hiring@techforge.com": "recruiter",
  "admin@stacktruth.com": "admin",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("stacktruth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("stacktruth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const persistUser = (u: User) => {
    setUser(u);
    localStorage.setItem("stacktruth_user", JSON.stringify(u));
  };

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const role = CREDENTIAL_MAP[email];
    if (role) {
      persistUser(ROLE_USER_MAP[role]);
      setIsLoading(false);
      return true;
    }
    // Default to developer for any unknown email
    if (email.includes("@")) {
      persistUser(ROLE_USER_MAP["developer"]);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const loginWithGitHub = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    persistUser(ROLE_USER_MAP["developer"]);
    setIsLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    persistUser(ROLE_USER_MAP["developer"]);
    setIsLoading(false);
    return true;
  };

  const loginAsRole = (role: UserRole) => {
    persistUser(ROLE_USER_MAP[role]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("stacktruth_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    persistUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGitHub,
        loginWithGoogle,
        loginAsRole,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
