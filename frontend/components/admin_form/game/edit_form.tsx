import { Game } from "@/types/game";

type Props = {
    setScreen: (screen: string) => void;
    gameData: Game 
};

export default function GameEditForm({ setScreen, gameData }: Props) {
    return (
        <form className="flex flex-col gap-6 font-title">
            {gameData.title}
        </form>
    )
}