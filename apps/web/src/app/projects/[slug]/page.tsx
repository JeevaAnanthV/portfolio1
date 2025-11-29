import ArchitectureViewer from '../../../../components/ArchitectureViewer';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const validProjects = ['knitibot', 'inquiro', 'elysium-ai'];

    if (!validProjects.includes(slug)) {
        return notFound();
    }

    return (
        <main className="container">
            <h1 className="text-4xl font-bold mb-6 capitalize">{slug} Architecture</h1>
            <ArchitectureViewer url={`/content/projects/${slug}/architecture.json`} />
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
