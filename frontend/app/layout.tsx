import type { Metadata } from "next";
import { Rajdhani, Cinzel } from "next/font/google";
import "./globals.css";

import ClientWrapper from "./ClientWrapper";

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
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}