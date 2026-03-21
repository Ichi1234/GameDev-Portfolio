"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGameData } from "@/context/game_context";
import { convertGameNameToId } from "@/utils/gamename_to_id";
import Link from "next/link";

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

            <div className="fixed top-0 w-full h-80">
                <Image
                    className="object-cover "
                    src={game.cover_img_path || "/img/default_cover_img.png"}
                    alt="Cover Image of the game"
                    fill
                />

                <div className="absolute inset-0 bg-gradient-to-t from-cardbackground via-cardbackground/40 to-transparent"></div>

            </div>
            
            <div className="z-10 px-4 lg:px-60 mt-30">

                <div className="flex items-center gap-x-2 text-sm mb-8">
                    {/* ARROWWWW */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className="lucide lucide-arrow-left">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    
                    <Link href="/">Back to Games</Link>
                </div>
                
                <div className="text-primary uppercase">
                    {game.type}
                </div>

                <h1 className="text-3xl font-title">{game.title}</h1>

                

                <p className="mt-4">{game.description}</p>
            </div>
            
        </div>
    );
}