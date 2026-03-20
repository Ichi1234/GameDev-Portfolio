"use client";

import Link from "next/link";
import { useProfile } from "@/context/profile_context";
import { useAuth } from "@/context/auth_provider";

export default function Navbar() {

  const profile = useProfile();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="p-5 sm:text-sm lg:text-lg flex flex-col gap-y-2 sm:gap-0 sm:flex-row justify-around items-center tracking-widest">
        <Link href="/#hero" className="font-title text-primary uppercase">
          { profile?.portfolio_title }
        </Link>

        <div className="flex sm:block font-body text-[0.65rem] sm:text-xs lg:text-sm space-x-4 sm:space-x-8 text-textmaincolor">
          <Link href="/#games">GAMES</Link>
          <Link href="/#about">ABOUT ME</Link>
          <Link href="/#contact">CONTACT</Link>
          <Link href="/signup" className="text-primary font-normal">SIGN UP</Link>

          {user?.role === "recruiter" && (
            <Link href="/job-contact" className="text-primary font-normal">
              JOB CONTACT
            </Link>
          )}

          {user?.role === "developer" && (
            <Link href="/admin" className="text-primary font-normal">
              ADMIN
            </Link>
          )}
          
        </div>
      </div>

      <hr className="text-[#1f1c19]" />
    </nav>
  );
}