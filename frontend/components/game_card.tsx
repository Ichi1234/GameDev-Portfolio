import { Game } from "@/types/game";

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  return (
    <div className="relative bg-cardbackground p-4 w-90 h-50">
      <div className="absolute top-4 left-4 p-2 inline border-2 border-primary bg-primary/20 text-primary uppercase">
        { game.type }
      </div>

      <h2>{ game.title }</h2>
    </div>
  );
}