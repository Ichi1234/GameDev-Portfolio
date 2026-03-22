"use client";

import { Game } from "@/types/game";
import Chip from "@/components/chip";

type Props = {
  game: Game;
};

export default function GameInfo({ game }: Props) {
  return (
    <div className="flex flex-col gap-10">
      
      {/* Buttons */}
      <div className="flex gap-x-4">
        <button className="flex items-center gap-x-2 px-6 py-3 bg-primary text-black text-sm font-semibold rounded-lg">
          DOWNLOAD
        </button>

        <button className="flex items-center gap-x-2 px-6 py-3 border border-primary/40 bg-[#272321] text-white text-sm font-semibold rounded-lg">
          FOLLOW
        </button>
      </div>

      {/* Description */}
      <div className="p-7 bg-cardbackground border border-[#332e2b] max-w-2xl rounded-xl">
        <h2 className="text-white font-title text-xl mb-4">Description</h2>
        <p>{game.description}</p>
      </div>

      {/* Platforms + Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="px-5 py-3 bg-cardbackground border border-[#332e2b] rounded-lg">
          <h2 className="text-textsubcolor font-title text-sm mb-2">Platforms</h2>
          <div className="flex gap-3">
            {game.platforms.map((p) => (
              <Chip key={p} label={p} className="text-white" />
            ))}
          </div>
        </div>

        <div className="px-5 py-3 bg-cardbackground border border-[#332e2b] rounded-lg">
          <h2 className="text-textsubcolor font-title text-sm mb-2">Tags</h2>
          <div className="flex gap-3">
            {game.tags.map((t) => (
              <Chip key={t} label={t} className="text-white" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}