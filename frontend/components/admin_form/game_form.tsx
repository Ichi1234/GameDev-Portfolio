"use client";
import { useState } from "react";
import GameAddForm from "./game/add_form";
import GameHomeForm from "./game/home_form";
import GameEditForm from "./game/edit_form";
import { Game } from "@/types/game";

export default function GameForm() {
    const [screen, setScreen] = useState("home");
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    
    return (
        <>
            {screen === "home" && <GameHomeForm setScreen={setScreen} setSelectedGame={setSelectedGame} />}
            {screen === "add" && <GameAddForm setScreen={setScreen} />}
            {screen === "edit" && <GameEditForm setScreen={setScreen} />}
        </>
    );
}
