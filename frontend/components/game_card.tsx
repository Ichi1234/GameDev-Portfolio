import { Game } from "@/types/game";

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  return (
    <div>
      <h3>{game.title}</h3>
    </div>
  );
}