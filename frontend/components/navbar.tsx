import { OwnerProfile } from "@/types/owner_profile";

export default function Navbar({ profile }: { profile?: OwnerProfile }) {
  return (
    <nav>
      <div className="p-4 text-lg flex justify-around items-center tracking-widest">
        <a href="#hero" className="font-title text-primary uppercase">
          { profile?.portfolio_title }
        </a>

        <div className="font-body text-sm space-x-8 text-textmaincolor font-semibold">
          <a href="#games">GAMES</a>
          <a href="#about">ABOUT ME</a>
          <a href="#contact">CONTACT</a>
          <a href="signup" className="text-primary font-normal">SIGN UP</a>
          <a href="admin" className="text-primary font-normal">ADMIN</a>
        </div>
      </div>

      <hr className="text-[#1f1c19]" />
    </nav>
  );
}