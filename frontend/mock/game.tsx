import { Game } from "@/types/game";

export const MockGamesData: Game[] = [
  {
    id: 1,
    title: "Raging Cacophony",
    description: 
    <>
      A 2D boss fight prototype inspired by Hollow Knight.
      <br/>
      This project focuses on designing a responsive combat system and experimenting with a unique rage mechanic driven by real-time microphone input.
    </>,
    download_path: "yes",
    cover_img_path: "/img/raging.png",
    start_date: "2026-01-17",
    release_date: "",
    repository_link: "https://github.com/Ichi1234/GameDev-Portfolio",
    status: "inprogress",
    type: "Experimental Game",
    tags: ["2D", "Action", "Single Player"],
    platforms: ["PC"],
    photos: ["AAA"],
    videos: ["AAA"],

    changelogs: [
      {
      id: 1,
      game_id: 1,
      version: 0.9,
      description: "All the main feature is finished, Published the demo.",
      date: "2026-01-26"
      },
    ]
  },

  {
    id: 2,
    title: "Space Shooter",
    description: 
    <>
      Space Shooter is a roguelike space-invader-style game where players battle waves of enemies while upgrading their ship to survive longer. 
      <br/>
      This project was developed as part of a 2026 internship assignment. The main focus of the project is software architecture, scalability, and maintainability rather than the amount of game content.
    </>,
    download_path: "",
    cover_img_path: "",
    start_date: "2026-02-04",
    release_date: "2026-01-26",
    status: "completed",
    type: "Retro Game",
    tags: ["2D", "Retro", "Rogue-like", "Single Player"],
    platforms: ["PC"],
    photos: ["AAA"],
    videos: ["AAA"],

    changelogs: [
      {
      id: 2,
      game_id: 2,
      version: 1,
      description: "All the main feature is finished, Published the game for the company.",
      date: "2026-02-17"
      },
    ]
  },
];