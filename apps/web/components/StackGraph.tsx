'use client';

import dynamic from 'next/dynamic';

const StackGraphClient = dynamic(() => import('./StackGraphClient'), {
    ssr: false,
    loading: () => <div className="p-4 border rounded animate-pulse">Loading Stack Graph...</div>,
});

export default function StackGraph() {
    return <StackGraphClient />;
}

