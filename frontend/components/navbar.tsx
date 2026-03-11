export default function Navbar() {
  return (
    <nav className="bg-background">
      <div className="p-4 flex justify-around">
        <a href="#hero" className="font-title text-primary">
          Kasidet Uthaiwiatkul
        </a>

        <div className="font-body space-x-6 text-textmaincolor">
          <a href="#games">GAMES</a>
          <a href="#about">ABOUT ME</a>
          <a href="#contact">CONTACT</a>
        </div>
      </div>

      <hr className="text-[#1f1c19]" />
    </nav>
  );
}