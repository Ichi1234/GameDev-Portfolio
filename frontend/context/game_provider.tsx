"use client";

import React from "react";
import { GameContext } from "./game_context";
import { MockGamesData } from "@/mock/game";


type Props = {
  children: React.ReactNode;
};

export default function GameDataProvider({ children }: Props) {
  return (
    <GameContext.Provider value={MockGamesData}>
      {children}
    </GameContext.Provider>
  );
}