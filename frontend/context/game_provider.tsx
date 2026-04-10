"use client";

import React, { useState, useEffect } from "react";
import { GameContext } from "./game_context";
import { Game, GameInput } from "@/types/game";
import { ChangeLogInput } from "@/types/change_log";

type Props = {
  children: React.ReactNode;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function GameDataProvider({ children }: Props) {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_BASE}/games/`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          const normalized = (data as Game[]).map((g) => {
            const copy = { ...g } as GameInput;
            const fix = (val: string | undefined): string => {
              if (!val) return ""; 
              if (val.startsWith("/storage")) {
                return encodeURI(`${API_BASE}${val}`);
              }
              return val;
            };

            copy.cover_img_path = fix(copy.cover_img_path);
            copy.download_link = fix(copy.download_link);

            if (Array.isArray(copy.photos)) copy.photos = copy.photos.map((p: string) => fix(p));
            if (Array.isArray(copy.videos)) copy.videos = copy.videos.map((v: string) => fix(v));

            if (Array.isArray(copy.changelogs)) {
              copy.changelogs = copy.changelogs.map((c: ChangeLogInput) => ({
                ...c,
                date: c.date,
              }));
            }

            return copy as Game;
          });

          setGames(normalized as Game[]);
        }
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };

    fetchGames();
  }, []);

  return <GameContext.Provider value={games}>{children}</GameContext.Provider>;
}