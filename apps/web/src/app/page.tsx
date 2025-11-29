import HeroCanvas from '../../components/HeroCanvas';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
      <HeroCanvas />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex p-24">
        <h1 className="text-4xl font-bold">Jeeva Ananth V</h1>
        <p>Portfolio Preview</p>
      </div>
    </main>
  );
}
