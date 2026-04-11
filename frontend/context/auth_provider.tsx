"use client";

import { User } from "@/types/user";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

type JwtPayload = {
  user_id?: number | string;
  email?: string;
  username?: string;
  google_id?: string | null;
  role?: string;
  [key: string]: unknown;
};

function parseJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validate = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          setUser(null);
          return;
        }

        const data = await res.json();
        const u: User = {
          id: data.id,
          username: data.username || (data.email || '').split('@')[0] || '',
          google_id: null,
          role: data.role || 'visitor',
        };

        setUser(u);
      } catch (err) {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          const payload = parseJwt(token);
          if (!payload) return;

          const role = payload.role as string | undefined;

          const u: User = {
            id: Number(payload.user_id) || 0,
            username: (payload.email as string)?.split('@')[0] || (payload.username as string) || '',
            google_id: (payload.google_id as string) || null,
            role: role || 'visitor',
          };

          setUser(u);
        } catch {
          // ignore
        }
      }
    };

    validate();
  }, []);

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