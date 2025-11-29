'use client';

import { useState, useEffect } from 'react';

type Layer = {
    id: string;
    label: string;
    description: string;
    tech: string[];
    snippet: string;
};

type ArchitectureData = {
    slug: string;
    layers: Layer[];
};

export default function ArchitectureViewerClient({ url }: { url: string }) {
    const [data, setData] = useState<ArchitectureData | null>(null);
    const [activeLayer, setActiveLayer] = useState<string | null>(null);
    const [snippetContent, setSnippetContent] = useState<string>('');

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((d) => {
                setData(d);
                if (d.layers.length > 0) setActiveLayer(d.layers[0].id);
            })
            .catch(() => { });
    }, [url]);

    useEffect(() => {
        if (activeLayer && data) {
            const layer = data.layers.find((l) => l.id === activeLayer);
            if (layer) {
                const snippetUrl = url.replace('architecture.json', `repro/snippets/${layer.snippet}`);
                fetch(snippetUrl)
                    .then((res) => res.text())
                    .then((text) => setSnippetContent(text))
                    .catch(() => setSnippetContent(''));
            }
        }
    }, [activeLayer, data, url]);

    if (!data) return null;

    const activeLayerData = data.layers.find(l => l.id === activeLayer);

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-card text-card-foreground">
            <div className="w-full md:w-1/3 space-y-2">
                <h3 className="font-bold text-lg mb-4">System Layers</h3>
                {data.layers.map((layer) => (
                    <button
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id)}
                        className={`w-full text-left p-3 rounded transition-colors ${activeLayer === layer.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                            }`}
                        aria-pressed={activeLayer === layer.id ? 'true' : 'false'}
                    >
                        <div className="font-semibold">{layer.label}</div>
                        <div className="text-xs opacity-80">{layer.description}</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                            {layer.tech.map((t) => (
                                <span key={t} className="text-[10px] px-1 py-0.5 bg-background/20 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </button>
                ))}
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-4">
                <div className="h-48 bg-muted rounded flex items-center justify-center border-2 border-dashed">
                    <div className="text-center">
                        <p className="font-bold">Interactive Diagram</p>
                        <p className="text-sm text-muted-foreground">{activeLayerData?.label}</p>
                    </div>
                </div>

                <div className="flex-1 bg-black text-green-400 p-4 rounded font-mono text-sm overflow-auto h-48">
                    <div className="flex justify-between items-center mb-2 border-b border-green-900 pb-1">
                        <span>{activeLayerData?.snippet}</span>
                        <span className="text-xs opacity-50">Read-only</span>
                    </div>
                    <pre>{snippetContent}</pre>
                </div>
            </div>
        </div>
    );
}
