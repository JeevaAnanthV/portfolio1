import HeroCanvas from '../../components/HeroCanvas';
import StackGraph from '../../components/StackGraph';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-32">
      {/* Hero */}
      <section className="relative w-full h-[70vh]">
        <HeroCanvas />
        <div className="absolute bottom-10 left-8">
          <h1 className="text-6xl font-bold">Jeeva Ananth V</h1>
          <p className="text-lg opacity-80">AI/ML Engineer • Deep-Tech Builder</p>
        </div>
      </section>

      {/* Tech Stack Graph */}
      <section className="space-y-8">
        <h2 className="text-4xl font-semibold">Tech Stack</h2>
        <div className="flex justify-center">
          <StackGraph />
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-8">
        <h2 className="text-4xl font-semibold">Featured Work</h2>
        <ul className="space-y-4 text-xl text-neutral-400">
          <li><a href="/projects/knitibot" className="hover:text-white">KnitiBot</a></li>
          <li><a href="/projects/inquiro" className="hover:text-white">Inquiro</a></li>
          <li><a href="/projects/elysium-ai" className="hover:text-white">Elysium AI</a></li>
        </ul>
      </section>
    </div>
  );
}
