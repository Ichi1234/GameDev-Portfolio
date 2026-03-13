"use client";

import { createContext, useContext } from "react";
import { Game } from "@/types/game";

export const GameContext = createContext<Game[] | null>(null);

export const useGameData = () => {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useGameData must be used inside GameDataProvider");
    }

    return context;
}