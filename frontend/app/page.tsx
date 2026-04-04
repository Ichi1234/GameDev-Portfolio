"use client";

import GameCard from "@/components/game_card";
import SkillChip from "@/components/skill_chip";
import { useGameData } from "@/context/game_context";
import { useProfile } from "@/context/profile_context";

export default function Home() {
  const profile = useProfile();
  const games = useGameData();
  const main_email = process.env.NEXT_PUBLIC_MAIN_EMAIL;

  return (
    <>
      <section
        id="hero"
        className="flex flex-col items-center justify-center
         text-center min-h-screen tracking-widest gap-4 bg-cover opa bg-center bg-[url('/img/header_bg.png')] "
      >
        
        <p className="uppercase text-[0.6rem] sm:text-xs xl:text-lg tracking-[0.35em]">
          Indie Game Developer
        </p>

        <h1 dangerouslySetInnerHTML={{ __html: profile.main_quote }} className="uppercase font-title font-bold text-lg sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl xl:leading-18 2xl:leading-20"/>

        <p dangerouslySetInnerHTML={{ __html: profile.sub_quote }} className="font-body text-[0.55rem] sm:text-xs xl:text-lg text-textmaincolor mt-4"/>

        <a href="#games" className="text-primary mt-8 uppercase text-[0.6rem] sm:text-xs xl:text-lg ">
          VIEW MY WORK
        </a>
      </section>

      <section id="games" className="relative py-28 flex flex-col gap-y-4 items-center min-h-screen">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 mb-4 w-px h-20 bg-linear-to-t from-primary/30 to-transparent"></div>
        
        <p className="text-textsubcolor sm:text-xs xl:text-sm tracking-[0.35em]">PORTFOLIO</p>

        <h2 className="font-title font-bold text-4xl mb-12">My <span className="text-primary">Games</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 2xl:gap-8">         
          {games.map((game) => (
            <GameCard key={game.id} game={game}/>
          ))}
        </div>
        
      </section>

      <section id="about" className="relative py-28 flex flex-col gap-y-4 items-center min-h-screen">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 mb-4 w-px h-20 bg-linear-to-t from-primary/30 to-transparent"></div>
        
        <p className="text-textsubcolor sm:text-xs xl:text-sm tracking-[0.35em]">WHO I AM</p>

        <h2 className="font-title font-bold text-4xl mb-12">ABOUT <span className="text-primary">ME</span></h2>

        <div className="grid md:grid-cols-2 gap-x-12 px-4 lg:px-60">

          {/* Left Grid Here */}
          <div className="flex flex-col">
            <h2 className="mb-4 text-xl text-primary font-title">Introduction</h2>
            <p dangerouslySetInnerHTML={{ __html: profile.introduction }}/>

            <h2 className="mt-8 mb-4 text-xl text-primary font-title">Current Focus</h2>
            <ul className="ml-4">
              {profile.current_focus.map((focus) => (
                <li className="list-disc marker:text-primary" key={focus}>{focus}</li>
              ))}
            </ul>
          </div>
          
          {/* Right Grid Here */}
          <div>
            <h2 className="mt-8 md:mt-0 mb-4 text-xl text-primary font-title">Core Skills</h2>         
            <div className="grid grid-cols-2 gap-4">
              {profile.core_skills.map((skill) => (
                <SkillChip key={skill.id} core_skill={skill} />
              ))}
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="relative py-28 flex flex-col gap-y-4 items-center text-center">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 mb-4 w-px h-20 bg-linear-to-t from-primary/30 to-transparent"></div>
        <p className="text-textsubcolor sm:text-xs xl:text-sm tracking-[0.35em]">GET IN TOUCH</p>

        <h2 className="font-title font-bold text-4xl mb-4">Let&apos;s  <span className="text-primary">Collaborate</span></h2>

        <p className="max-w-2xl text-center mb-8">
          Interested in collaboration, internship opportunities, or discussing game systems and architecture? Feel free to reach out.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <a href={`mailto:${main_email}`} className="text-primary bg-[#272321] flex justify-evenly items-center gap-2 border border-primary/40 rounded-lg px-8 py-3">
            
            {/* Mail Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            
            EMAIL ME

            {/* Arrow Thingy */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-arrow-up-right transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>

          <a href={profile.github_link} target="_blank" rel="noopener noreferrer" className="bg-[#272321] flex justify-evenly items-center gap-2 border border-[#2b2826] rounded-lg px-8 py-3">
            
            {/* Github Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            
            GITHUB

            {/* Arrow Thingy */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-arrow-up-right transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}