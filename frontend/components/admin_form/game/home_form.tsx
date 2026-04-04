import ListItem from "@/components/ListItem";
import { MockGamesData } from "@/mock/game";
import { Game } from "@/types/game";
import { useState } from "react"

type Props = {
    setScreen: (screen: string) => void;
    setSelectedGame: (game: Game) => void;
};

export default function GameHomeForm({ setScreen, setSelectedGame }: Props) {
    const [gameLst, setGameLst] = useState(MockGamesData);

    const handleRemove = (gameID: number) => {
        setGameLst(prev =>
            prev.filter(game => game.id !== gameID)
        );
    };

    const handleEdit = (data : Game) => {
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