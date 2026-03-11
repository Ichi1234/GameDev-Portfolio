"use client";

import { useProfile } from "@/context/profile_context";

export default function Home() {
  const profile = useProfile();

  return (
    <>
      <section
        id="hero"
        className="flex flex-col items-center justify-center text-center min-h-screen"
      >
        <p className="uppercase">
          Indie Game Developer
        </p>

        <p className="uppercase text-primary text-3xl">
          {profile.main_quote}
        </p>

        <p className="font-body text-lg text-textmaincolor mt-4">
          {profile.sub_quote}
        </p>
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