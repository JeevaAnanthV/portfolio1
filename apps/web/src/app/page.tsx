import HeroCanvas from '../../components/HeroCanvas';
import ArchitectureViewer from '../../components/ArchitectureViewer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
      <HeroCanvas />
      <div className="z-10 w-full max-w-5xl p-8">
        <h1 className="text-4xl font-bold mb-8">Jeeva Ananth V</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Architecture Preview: KnitiBot</h2>
          {/* We need to serve the content files. In dev, Next.js serves public/. 
              We should move content/ to public/content/ or configure a route. 
              For simplicity, let's assume we move content to public/ for this phase. */}
          <ArchitectureViewer url="/content/projects/knitibot/architecture.json" />
        </section>
      </div>
    </main>
  );
}
