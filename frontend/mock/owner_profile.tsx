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
  introduction:
    "I am an independent game developer and software engineering student specializing in gameplay systems and backend architecture.",
  github_link: "https://github.com/Ichi1234",
};