import ListItem from "@/components/ListItem";
import { Game } from "@/types/game";
import { useState, useEffect } from "react"

type Props = {
    setScreen: (screen: string) => void;
    setSelectedGame: (game: Game) => void;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function GameHomeForm({ setScreen, setSelectedGame }: Props) {
    const [gameLst, setGameLst] = useState<Game[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch(`${API_BASE}/games/`);
                if (!res.ok) return setGameLst([]);
                const data = await res.json();
                if (Array.isArray(data)) setGameLst(data as Game[]);
                else if (data && data.error) setGameLst([]);
            } catch (err) {
                console.error("Failed to fetch games:", err);
                setGameLst([]);
            }
        };

        fetchGames();
    }, []);

    const handleRemove = async (gameID: number) => {
        if (!confirm("Delete this game?")) return;
        try {
            const res = await fetch(`${API_BASE}/games/${gameID}`, { method: "DELETE" });
            if (res.ok) {
                setGameLst((prev) => prev.filter((game) => game.id !== gameID));
            } else {
                const text = await res.text();
                alert("Failed to delete: " + text);
            }
        } catch (err) {
            alert("Network error: " + String(err));
        }
    };

    const handleEdit = (data: Game) => {
        setSelectedGame(data);
        setScreen("edit");
    }

    return (
        <div>
            <button onClick={() => setScreen("add")} className="cursor-pointer transition hover:bg-white/70 ml-auto text-admintitle rounded-xl px-4 py-2 border-2 border-admintitle flex items-center gap-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            Add Game
            </button>

            <h1 className="font-title font-bold text-admintitle text-xl my-6">Games List</h1>

            {gameLst.map((game) => {
                return (
                    <ListItem
                        key={game.id}
                        title={game.title}
                        onEdit={() => handleEdit(game)}
                        onRemove={() => handleRemove(game.id)}
                        showEdit={true}
                    />
                )
            })}
            
            
            
        </div>
    )
}