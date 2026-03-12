"use client";

import { useProfile } from "@/context/profile_context";

export default function Home() {
  const profile = useProfile();

  return (
    <>
      <section
        id="hero"
        className="flex flex-col items-center justify-center
         text-center min-h-screen tracking-widest gap-4 bg-cover opa bg-center bg-[url('/header_bg.png')] "
      >
        
        <p className="uppercase text-[0.6rem] sm:text-xs xl:text-lg tracking-[0.35em]">
          Indie Game Developer
        </p>

        <p className="uppercase font-title font-bold text-lg sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl xl:leading-18 2xl:leading-20">
          {profile.main_quote}
        </p>

        <p className="font-body text-[0.55rem] sm:text-xs xl:text-lg text-textmaincolor mt-4">
          {profile.sub_quote}
        </p>

        <a href="#games" className="text-primary mt-8 uppercase text-[0.6rem] sm:text-xs xl:text-lg ">
          VIEW MY WORK
        </a>
      </section>

      <section id="games" className="min-h-screen">
        <h2 className="text-primary text-3xl">Games</h2>
      </section>

      <section id="about" className="min-h-screen">
        <h2 className="text-primary text-3xl">About Me</h2>
      </section>

      <section id="contact" className="min-h-screen">
        <h2 className="text-primary text-3xl">Contact</h2>
      </section>
    </>
  );
}