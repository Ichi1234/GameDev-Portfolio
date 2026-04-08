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
        if (Array.isArray(data)) setGames(data as Game[]);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };

    fetchGames();
  }, []);

  return <GameContext.Provider value={games}>{children}</GameContext.Provider>;
}