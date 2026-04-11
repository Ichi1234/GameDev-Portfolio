"use client";

import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { usePathname } from "next/navigation";

import ProfileProvider from "@/context/profile_provider";
import GameDataProvider from "@/context/game_provider";
import { AuthProvider } from "@/context/auth_provider";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <AuthProvider>
        <ProfileProvider>
          <Navbar />
          <GameDataProvider>
            <main className={`pb-40 ${isAdmin ? "bg-adminbackground" : "bg-background "}`}>
              {children}
            </main>
          </GameDataProvider>
          <Footer />
        </ProfileProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
