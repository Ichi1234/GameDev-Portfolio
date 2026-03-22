"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useGameData } from "@/context/game_context";
import { convertGameNameToId } from "@/utils/gamename_to_id";
import { formatDate } from "@/utils/format_date";
import { formatVersion } from "@/utils/format_version";
import GameShowcase from "@/components/game_detail/game_showcase";
import GameInfo from "@/components/game_detail/game_detail";
import GameHeader from "@/components/game_detail/game_header";

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

                <div className="absolute inset-0 bg-linear-to-t from-cardbackground via-cardbackground/40 to-transparent"></div>

            </div>
            
            {/* Main Description */}
            <div className="flex flex-col gap-y-2 z-10 px-4 lg:px-60 mt-40">

                <GameHeader game={game}/>
                
                <div className="flex flex-col gap-y-10 mt-12">
                    
                    <GameInfo game={game}/>

                    <GameShowcase game={game}/>


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