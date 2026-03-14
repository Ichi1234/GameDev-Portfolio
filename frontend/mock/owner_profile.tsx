import { OwnerProfile } from "@/types/owner_profile";

export const MockOwnerProfile: OwnerProfile = {
  id: 1,
  user_id: 1,
  role_id: 1,
  portfolio_title: "Kasidet Uthaiwiwatkul",
  main_quote: (
    <>
      May my <span className="text-primary">game</span> bring you <br/>challenges and difficulties
    </>
  ),
  sub_quote: (
    <>
      Crafting hardcore experiences through mechanics, systems, and <br/>immersive world design.
    </>

  ),
  introduction: (
    <>
      I am an independent game developer and software engineering student specializing in gameplay systems and backend architecture.
      <br/><br/>
      I focus on building challenging experiences driven by mechanics, systems, and immersive world design.
    </>
  ),
  github_link: "https://github.com/Ichi1234",
  current_focus: ["Improving C# knowledge", "Improving Unity knowledge", "Improving code quality Readability & Scalability"],
  core_skills: [
    {
      id: 1,
      owner_id: 1,
      name: "C#",
      description: "Language"
    },

    {
      id: 2,
      owner_id: 1,
      name: "Unity",
      description: "Engine"
    },

    {
      id: 3,
      owner_id: 1,
      name: "OOP",
      description: "Paradigm"
    },

    {
      id: 4,
      owner_id: 1,
      name: "State Machine",
      description: "Pattern"
    },

    {
      id: 5,
      owner_id: 1,
      name: "Git",
      description: "Version Control"
    },

    {
      id: 6,
      owner_id: 1,
      name: "Jira",
      description: "Management"
    },

    {
      id: 7,
      owner_id: 1,
      name: "Figma",
      description: "Design"
    },

    {
      id: 8,
      owner_id: 1,
      name: "Aseprite",
      description: "Pixel Art"
    },
  ]
};