"use client";
import { useState } from "react";
import GameAddForm from "./game/add_form";

export default function GameForm() {
    const [mainForm, setMainForm] = useState(true);
    const [editForm, setEditForm] = useState(false);
    const [addForm, setAddForm] = useState(false);

    
    
    return (
        <>
            {mainForm && (
                <form className="flex flex-col gap-6 font-title">test
                
                </form>

            )}

            {addForm && (
                <GameAddForm/>
            )}
        </>
    );
}
