"use client";

import React, { useState, useEffect } from "react";
import { GameContext } from "./game_context";
import { Game } from "@/types/game";

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
          const normalized = (data as any[]).map((g) => {
            const copy = { ...g } as any;
            const fix = (val: any) => {
              if (!val) return val;
              if (typeof val === "string" && val.startsWith("/storage")) {
                return encodeURI(`${API_BASE}${val}`);
              }
              return val;
            };

            copy.cover_img_path = fix(copy.cover_img_path);
            copy.download_path = fix(copy.download_path);

            if (Array.isArray(copy.photos)) copy.photos = copy.photos.map((p: string) => fix(p));
            if (Array.isArray(copy.videos)) copy.videos = copy.videos.map((v: string) => fix(v));

            if (Array.isArray(copy.changelogs)) {
              copy.changelogs = copy.changelogs.map((c: any) => ({
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