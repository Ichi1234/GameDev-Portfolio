import type { Metadata } from "next";
import { Rajdhani, Cinzel } from "next/font/google";
import "./globals.css";

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
        <Navbar />
        <main className="min-h-screen bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}