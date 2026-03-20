"use client";

import { User } from "@/types/user";
import { MOCK_USER } from "@/mock/user";
import { createContext, useContext, useState, ReactNode } from "react";


type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);



export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User | null>(MOCK_USER);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};