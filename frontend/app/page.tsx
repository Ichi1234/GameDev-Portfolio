export default function Home() {
  return (
    <>
      <section id="hero" className="flex flex-col items-center bg-background justify-center text-center min-h-screen">
        <h1 className="font-title text-5xl text-primary">
          Banana Lord
        </h1>

        <p className="font-body text-lg text-textmaincolor mt-4">
          Gameplay Programmer
        </p>
      </section>

      <section id="games" className="min-h-screen">
        <h2 className="text-primary text-3xl">Games</h2>
      </section>

      <section id="about" className="min-h-screen">
        <h2 className="text-primary text-3xl">About Me</h2>
      </section>

      <section id="contact" className="min-h-screen">
        <h2 className="text-primary text-3xl">Contact</h2>
      </section>
    </>
  );
}