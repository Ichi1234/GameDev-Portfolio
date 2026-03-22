"use client";

import { useState } from "react";
import Image from "next/image";
import { Game } from "@/types/game";

type Props = {
  game: Game;
};

export default function GameShowcase({ game }: Props) {
  const media = [
    ...(game?.videos?.map((v) => ({ type: "video", src: v })) || []),
    ...(game?.photos?.map((p) => ({ type: "image", src: p })) || []),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = media[selectedIndex];
  const hasMedia = media.length > 0;

  return (
    <div className="flex flex-col gap-y-4">
      {/* TITLE */}
      <h2 className="my-2 font-title text-2xl text-white">
        <span className="text-primary">Game</span> Showcase
      </h2>

      {hasMedia ? (
        <div>
          {/* PREVIEW */}
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-[#332e2b]">
            {selected?.type === "video" ? (
              <video
                src={selected.src}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={selected.src}
                alt="preview"
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {media.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`
                  relative w-32 h-20 rounded-md overflow-hidden cursor-pointer border
                  ${index === selectedIndex ? "border-primary" : "border-[#332e2b]"}
                `}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                    />

                    {/* ▶ Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition">
                      <div className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt="game image"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl aspect-video rounded-xl border border-[#332e2b] flex items-center justify-center text-textsubcolor">
          This game doesn&apos;t have any media yet.
        </div>
      )}
    </div>
  );
}