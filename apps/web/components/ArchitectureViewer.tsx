'use client';

import dynamic from 'next/dynamic';

const ArchitectureViewerClient = dynamic(() => import('./ArchitectureViewerClient'), {
    ssr: false,
    loading: () => <div className="p-4 border rounded animate-pulse">Loading Architecture...</div>,
});

export default function ArchitectureViewer({ url }: { url: string }) {
    return <ArchitectureViewerClient url={url} />;
}
