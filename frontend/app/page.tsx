"use client";

import GameCard from "@/components/game_card";
import SkillChip from "@/components/skill_chip";
import { useGameData } from "@/context/game_context";
import { useProfile } from "@/context/profile_context";

export default function Home() {
  const profile = useProfile();
  const games = useGameData();

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

        <h1 className="uppercase font-title font-bold text-lg sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl xl:leading-18 2xl:leading-20">
          {profile.main_quote}
        </h1>

        <p className="font-body text-[0.55rem] sm:text-xs xl:text-lg text-textmaincolor mt-4">
          {profile.sub_quote}
        </p>

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
            <p className="">{profile.introduction}</p>

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

      <section id="contact" className="min-h-screen">
        <h2 className="text-primary text-3xl">Contact</h2>
      </section>
    </>
  );
}