"use client";

import { useProfile } from "@/context/profile_context";

export default function Navbar() {

  const profile = useProfile();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="p-5 text-lg flex justify-around items-center tracking-widest">
        <a href="#hero" className="font-title text-primary uppercase">
          { profile?.portfolio_title }
        </a>

        <div className="font-body text-sm space-x-8 text-textmaincolor">
          <a href="#games">GAMES</a>
          <a href="#about">ABOUT ME</a>
          <a href="#contact">CONTACT</a>
          <a href="signup" className="text-primary font-normal">SIGN UP</a>
          <a href="admin" className="text-primary font-normal">ADMIN</a>
        </div>
      </div>

      <hr className="text-[#1f1c19]" />
    </nav>
  );
}