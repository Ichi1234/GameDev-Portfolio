"use client";

import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game";
import { formatDate } from "@/utils/format_date";

type Props = {
  game: Game;
};

export default function GameHeader({ game }: Props) {
  return (
    <div className="flex flex-col gap-2">
      
      {/* Back */}
      <Link href="/#games" className="flex items-center gap-x-2 text-sm mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>

        Back to Games
      </Link>
      
      {/* Type */}
      <div className="w-fit px-3 py-1 rounded-sm text-sm bg-black border border-primary/40 text-primary uppercase">
        {game.type}
      </div>

      {/* Title + Meta */}
      <div>
        <h1 className="text-4xl mt-2 text-white font-bold font-title">
          {game.title}
        </h1>

        <div className="flex gap-4 items-center text-sm px-0.5 mt-1">
          <span className="text-textsubcolor">
            {game.release_date
              ? formatDate(game.release_date)
              : "In Progress"}
          </span>

          {game.repository_link && (
            <a
              href={game.repository_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-1 hover:underline"
            >
              <Image
                className="mb-0.5"
                src="/img/github_icon.png"
                alt="GitHub Icon"
                width={16}
                height={16}
              />

              GitHub Repository

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}