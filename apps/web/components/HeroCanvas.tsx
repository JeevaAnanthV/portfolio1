import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeroCanvasClient = dynamic(() => import('./HeroCanvasClient'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <div className="animate-pulse text-secondary">Loading 3D Experience...</div>
        </div>
    ),
});

export default function HeroCanvas() {
    return (
        <div className="relative w-full h-[600px] md:h-screen bg-background overflow-hidden">
            {/* Fallback for mobile / no-JS / error */}
            <div className="absolute inset-0 z-0 block md:hidden">
                <Image
                    src="/hero-fallback.webp"
                    alt="Jeeva Ananth V Portfolio Hero"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
            </div>

            {/* R3F Scene */}
            <div className="absolute inset-0 z-10">
                <HeroCanvasClient />
            </div>

            {/* JA Monogram Overlay (Animated Entrance) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <img
                    src="/ja-monogram.svg"
                    alt="JA Monogram"
                    className="w-32 h-32 md:w-48 md:h-48 animate-fade-in-up opacity-0"
                    style={{ animationFillMode: 'forwards', animationDelay: '0.5s' }}
                />
            </div>
        </div>
    );
}
