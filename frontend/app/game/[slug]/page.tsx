"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGameData } from "@/context/game_context";
import { convertGameNameToId } from "@/utils/gamename_to_id";
import Link from "next/link";
import { formatDate } from "@/utils/format_date";
import Chip from "@/components/chip";
import { formatVersion } from "@/utils/format_version";

export default function GameDetail() {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    
    const games = useGameData();

    const game = games.find(
        (g) => convertGameNameToId(g.title) === slug
    );

    if (!game) {
        return <p>No game data available.</p>;
    }

    return (
        <div className="flex flex-col gap-y-4 min-h-screen">

            <div className="absolute top-0 w-full h-65">
                <Image
                    className="object-cover "
                    src={game.cover_img_path || "/img/default_cover_img.png"}
                    alt="Cover Image of the game"
                    fill
                />

                <div className="absolute inset-0 bg-gradient-to-t from-cardbackground via-cardbackground/40 to-transparent"></div>

            </div>
            
            {/* Main Description */}
            <div className="flex flex-col gap-y-2 z-10 px-4 lg:px-60 mt-40">

                <div className="flex items-center gap-x-2 text-sm mb-2">
                    {/* ARROWWWW */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className="lucide lucide-arrow-left">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    
                    <Link href="/#games">Back to Games</Link>
                </div>
                
                <div className="w-fit px-3 py-1 rounded-sm text-sm bg-black border border-primary/40 text-primary uppercase">
                    {game.type}
                </div>

                <div>
                    <h1 className="text-4xl mt-2 text-white font-bold font-title">{game.title}</h1>

                    <div className="flex gap-4 items-center text-sm px-0.5">
                        <span className="text-textsubcolor">{game.release_date != "" ? formatDate(game.release_date) : "In Progress"}</span>
                        {game?.repository_link && (
                            <a href={game.repository_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-1">
                                <Image
                                    className="mb-0.5"
                                    src={"/img/github_icon.png"}
                                    alt="GitHub Icon"
                                    width={16}
                                    height={16}
                                />

                                GitHub Repository

                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-arrow-up-right">
                                    <path d="M7 7h10v10"></path>
                                    <path d="M7 17 17 7"></path>
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-col gap-y-10 mt-12">
                    <div className="flex gap-x-4">
                        <button className="flex items-center gap-x-2 px-6 py-3 bg-primary text-black text-sm font-semibold rounded-lg">

                            {/* Download Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-download">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                            </svg>

                            DOWNLOAD
                        </button>

                        <button className="flex items-center gap-x-2 px-6 py-3 border border-primary/40 bg-[#272321] text-white text-sm font-semibold rounded-lg">

                            {/* Plus Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-plus">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>

                            FOLLOW

                        </button>
                    </div>
                        
                    <div className="p-7 bg-cardbackground border border-[#332e2b] max-w-2xl rounded-xl">
                        <h2 className="text-white font-title text-xl mb-4">Description</h2>
                        <p>{game.description}</p>
                    </div>
                    
                    <div className="flex gap-x-6">
                        <div className="px-5 py-3 bg-cardbackground border border-[#332e2b] w-fit rounded-lg">
                            <h2 className="text-textsubcolor font-title text-sm mb-2">Platforms</h2>
                            
                            <div className="flex gap-3">
                              {game.platforms.map((platform) => (
                                <Chip key={platform} label={platform} className="text-white"/>
                              ))}
                            </div>
                           
                        </div>

                        <div className="px-5 py-3 bg-cardbackground border border-[#332e2b] w-fit rounded-lg">
                            <h2 className="text-textsubcolor font-title text-sm mb-2">Tags</h2>
                            
                            <div className="flex gap-3">

                              {game.tags.map((tag) => (
                                <Chip key={tag} label={tag} className="text-white"/>
                              ))}
                            </div>

                        </div>
                    </div>

                    <h2 className="font-title text-2xl text-white"><span className="text-primary">Game</span> Showcase</h2>

                    <div>
                        {/* ADD MEDIA HERE */}
                    </div>

                    <h2 className="font-title text-2xl text-white"><span className="text-primary">Change</span> Log</h2>
                    
                    <div className="text-sm rounded-xl overflow-hidden max-w-3xl border border-[#332e2b]">

                        {game.changelogs.map((log, index) => (
                            <p
                                key={log.version}
                                className={
                                    `
                                    flex flex-wrap items-center gap-x-4 p-5
                                    ${index % 2 === 0 ? "bg-cardbackground" : "bg-[#272321]"}
                                    `
                                }
                            >
                                <span className="w-8 text-primary font-semibold">{formatVersion(log.version.toString())}</span>
                                <span className="w-16 text-textsubcolor text-xs">{formatDate(log.date, true)}</span>
                                <span>{log.description}</span>
                               
                            </p>
                        ))}
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}