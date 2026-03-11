import type { Metadata } from "next";
import { Rajdhani, Cinzel } from "next/font/google";
import "./globals.css";

import { ProfileContext } from "@/context/profile_context";
import { MockOwnerProfile } from "@/mock/owner_profile";

import Navbar from "../components/navbar";
import Footer from "@/components/footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const mockUser = {
  id: 1,
  username: "Kasidet Uthaiwiwatkul",
  google_id: null,
  role_id: 1
};

export const metadata: Metadata = {
  title: "Game Dev Resume",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${cinzel.variable} ${rajdhani.variable} bg-background text-textmaincolor`}>
        <ProfileContext.Provider value={MockOwnerProfile}>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
          <Footer />
        </ProfileContext.Provider>
      </body>
    </html>
  );
}