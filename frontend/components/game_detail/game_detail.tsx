"use client";

import { Game } from "@/types/game";
import Chip from "@/components/chip";
import { useState } from "react";

function parseJwt(token: string | null) {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch (e) {
    return null;
  }
}

type Props = {
  game: Game;
};

export default function GameInfo({ game }: Props) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const payload = parseJwt(token);
  const userId = payload?.user_id ?? payload?.id ?? payload?.sub ?? null;
  const role = payload?.role ?? null;

  const canFollow = role === "visitor";

  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    if (userId && Array.isArray(game.subscribers)) {
      try {
        return game.subscribers.includes(userId);
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  

  async function follow() {
    const token = localStorage.getItem("token");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch("http://localhost:8000/follow/", {
        method: "POST",
        headers,
        body: JSON.stringify({ game_id: game.id }),
      });
      if (res.ok) {
        setIsFollowing(true);
      }
    } catch (e) {

    }
  }

  async function unfollow() {
    const token = localStorage.getItem("token");
    try {
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`http://localhost:8000/follow?game_id=${game.id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        setIsFollowing(false);
      }
    } catch (e) {

    }
  }

  return (
    <div className="flex flex-col gap-10">

      {/* Buttons */}
      <div className="flex gap-x-4">
        {game.download_link ? (
          <a href={game.download_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 px-6 py-3 bg-primary text-black text-sm font-semibold rounded-lg">
            DOWNLOAD
          </a>
        ) : (
          <button disabled aria-disabled className="flex items-center gap-x-2 px-6 py-3 bg-primary/70 text-black text-sm font-semibold rounded-lg cursor-not-allowed opacity-50">
            DOWNLOAD
          </button>
        )}

        {canFollow ? (
          isFollowing ? (
            <button onClick={unfollow} className="flex items-center gap-x-2 px-6 py-3 border border-primary/40 bg-[#272321] hover:bg-[#272321c4] hover:cursor-pointer text-textmaincolor text-sm font-semibold rounded-lg">
              UNFOLLOW 
            </button>
          ) : (
            <button onClick={follow} className="flex items-center gap-x-2 px-6 py-3 border border-primary/40 bg-[#272321]  hover:bg-[#272321c4] hover:cursor-pointer text-textmaincolor text-sm font-semibold rounded-lg">
              FOLLOW 
            </button>
          )
        ) : null}
      </div>

      {/* Description */}
      <div className="p-7 bg-cardbackground border border-[#332e2b] max-w-2xl rounded-xl">
        <h2 className="text-white font-title text-xl mb-4">Description</h2>
        <p dangerouslySetInnerHTML={{ __html: game.description }}
/>
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