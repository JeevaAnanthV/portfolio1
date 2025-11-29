import ArchitectureViewer from '../../../../components/ArchitectureViewer';
import { notFound } from 'next/navigation';

// In a real app, we'd generate static params or fetch data.
// For this phase, we just render the viewer with the correct URL.

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const validProjects = ['knitibot', 'inquiro', 'elysium-ai'];

    if (!validProjects.includes(slug)) {
        return notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8 bg-background text-foreground">
            <h1 className="text-4xl font-bold mb-8 capitalize">{slug} Architecture</h1>
            <div className="w-full max-w-5xl">
                <ArchitectureViewer url={`/content/projects/${slug}/architecture.json`} />
            </div>
        </main>
    );
}

export function generateStaticParams() {
    return [
        { slug: 'knitibot' },
        { slug: 'inquiro' },
        { slug: 'elysium-ai' },
    ];
}
