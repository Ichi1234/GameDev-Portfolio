import { Game } from "@/types/game";
import Chip from "./chip";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format_date";
import { convertGameNameToId } from "@/utils/gamename_to_id";

  type Props = {
    game: Game;
  };

  export default function GameCard({ game }: Props) {
    return (
      <Link href={`/game/${convertGameNameToId(game.title)}`} className="block">
        <div className="bg-cardbackground max-w-110 2xl:max-w-130 border-2 h-full border-[#332e2b] rounded-xl">

          {/* Image Section */}
          <div className="relative aspect-video">
            <Image
              className="object-cover rounded-t-xl"
              src={game.cover_img_path || "/img/default_cover_img.png"}
              alt="Cover Image of the game"
              fill
              unoptimized
            />

            <div className="absolute inset-0 bg-linear-to-t from-cardbackground via-cardbackground/40 to-transparent"></div>

            {/* Yes, this is top left yellow thing */}
            <div className="absolute top-3 left-3 px-2 sm:px-3 py-1 text-[0.55rem] sm:text-[0.65rem] lg:text-xs
            rounded-sm inline border border-primary/50 bg-cardbackground text-primary uppercase"
            >
              { game.type || (game.tags?.[0] ? game.tags[0] + " GAME" : "GAME") }
            </div>
          </div>
          
          {/* Detail Section */}
          <div className="p-4">
            <div className="flex justify-between items-baseline">
              <h2 className="text-white font-title text-lg sm:text-xl lg:text-2xl 2xl:text-3xl">{ game.title }</h2>
              <p className="text-xs 2xl:text-sm text-textsubcolor"> { game.release_date != "" ? formatDate(game.release_date) : "In Progress" } </p>
            </div>

            <p dangerouslySetInnerHTML={{ __html: game.description }} className="mt-2 line-clamp-4 text-xs lg:text-sm min-h-20"/>

            <div className="flex gap-x-2 mt-4">
              {game.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
            </div>
          
          </div>
          
        </div>
      </Link>
    );
  }