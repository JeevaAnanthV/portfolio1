'use client';

import React, { useState, useEffect } from 'react';

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

// Minimal error boundary component
function ClientErrorBoundary({ children }: { children: React.ReactNode }) {
    const [err, setErr] = useState<Error | null>(null);

    useEffect(() => {
        if (err) {
            console.error('ArchitectureViewer client error:', err);
        }
    }, [err]);

    if (err) {
        return (
            <div data-testid="architecture-error" className="p-4 text-red-400">
                Architecture viewer failed to load — check console for details.
            </div>
        );
    }

    return <ErrorCatcher onError={setErr}>{children}</ErrorCatcher>;
}

function ErrorCatcher({ children, onError }: { children: React.ReactNode; onError: (err: Error) => void }) {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            onError(new Error(event.message));
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, [onError]);

    try {
        return <>{children}</>;
    } catch (e) {
        if (e instanceof Error) {
            onError(e);
        }
        return null;
    }
}

export default function ArchitectureViewerInline({ url }: { url: string }) {
    const [data, setData] = useState<ArchitectureData | null>(null);
    const [activeLayer, setActiveLayer] = useState<string | null>(null);
    const [snippetContent, setSnippetContent] = useState<string>('');

    // Normalize URL to ensure absolute path
    const fetchUrl = url.startsWith('/') ? url : `/${url.replace(/^\/+/, '')}`;

    useEffect(() => {
        fetch(fetchUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch architecture: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((d) => {
                setData(d);
                if (d.layers && d.layers.length > 0) {
                    setActiveLayer(d.layers[0].id);
                }
            })
            .catch((err) => {
                console.error('Error loading architecture data:', err);
            });
    }, [fetchUrl]);

    useEffect(() => {
        if (activeLayer && data) {
            const layer = data.layers.find((l) => l.id === activeLayer);
            if (layer) {
                // Extract slug from URL path or use data.slug
                const slugMatch = fetchUrl.match(/\/projects\/([^\/]+)\//);
                const slug = slugMatch ? slugMatch[1] : (data.slug || 'unknown');
                // Construct absolute path to snippet
                const snippetUrl = `/content/projects/${slug}/repro/snippets/${layer.snippet}`;
                
                fetch(snippetUrl)
                    .then((res) => {
                        if (!res.ok) {
                            console.warn(`Snippet not found: ${snippetUrl} (${res.status})`);
                            return '';
                        }
                        return res.text();
                    })
                    .then((text) => setSnippetContent(text || `# ${layer.snippet}\n\nSnippet content not available.`))
                    .catch((err) => {
                        console.error('Error loading snippet:', err);
                        setSnippetContent(`# ${layer.snippet}\n\nError loading snippet content.`);
                    });
            }
        }
    }, [activeLayer, data, fetchUrl]);

    if (!data) {
        return <div data-testid="architecture-viewer-loading">Loading architecture data...</div>;
    }

    const activeLayerData = data.layers.find(l => l.id === activeLayer);

    return (
        <ClientErrorBoundary>
            <div data-testid="architecture-viewer" className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-card text-card-foreground">
                <div className="w-full md:w-1/3 space-y-2">
                    <h3 className="font-bold text-lg mb-4">System Layers</h3>
                    {data.layers.map((layer, index) => (
                        <button
                            key={layer.id}
                            data-testid={`layer-button-${index}`}
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
                        <pre data-testid="snippet-content">{snippetContent}</pre>
                    </div>
                </div>
            </div>
        </ClientErrorBoundary>
    );
}

