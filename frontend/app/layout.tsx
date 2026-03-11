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

const mockUser = {
  id: 1,
  username: "Kasidet Uthaiwiwatkul",
  google_id: null,
  role_id: 1
};

const MockOwnerProfile = {
  id: 1,
  user_id: 1,
  role_id: 1,
  portfolio_title: "Kasidet Uthaiwiwatkul",
  main_quote: "May my game bring you challenges and difficulties",
  sub_quote: "Crafting hardcore experiences through mechanics, systems, and immersive world design.",
  introduction: "I am an independent game developer and software engineering student specializing\
   in gameplay systems and backend architecture. I focus on building challenging experiences driven\
    by mechanics, systems, and immersive world design.",
  github_link: "https://github.com/Ichi1234"
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
        <Navbar profile={MockOwnerProfile} />
        <main className="min-h-screen bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}