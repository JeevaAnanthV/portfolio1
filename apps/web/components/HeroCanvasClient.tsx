'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function LowPolyCluster({ isMobile }: { isMobile: boolean }) {
    const meshRef = useRef<THREE.Group>(null);

    // Procedural geometry for low-poly look
    // In a real scenario, we'd load the GLB here. For now, we synthesize primitives.

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Central Icosahedron */}
                <mesh>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial color="#333" wireframe={true} />
                </mesh>

                {/* Floating particles */}
                {Array.from({ length: isMobile ? 5 : 15 }).map((_, i) => (
                    <mesh key={i} position={[
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6
                    ]}>
                        <octahedronGeometry args={[0.2, 0]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#0070f3" : "#ffffff"} emissive={i % 2 === 0 ? "#0070f3" : "#333"} emissiveIntensity={2} />
                    </mesh>
                ))}
            </Float>
        </group>
    );
}

export default function HeroCanvasClient() {
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [webglSupported, setWebglSupported] = useState(true);

    useEffect(() => {
        // Check WebGL support
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) setWebglSupported(false);
        } catch (e) {
            setWebglSupported(false);
        }

        const mobileQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mobileQuery.matches);

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(motionQuery.matches);

        const handleResize = () => setIsMobile(mobileQuery.matches);
        mobileQuery.addEventListener('change', handleResize);
        return () => mobileQuery.removeEventListener('change', handleResize);
    }, []);

    if (!webglSupported || prefersReducedMotion) {
        return <img src="/hero-fallback.webp" alt="Hero fallback" className="hero-fallback" />;
    }

    // Adaptive DPR for performance
    const dpr = isMobile ? [1, 1.5] : [1, 2];

    return (
        <>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={dpr} performance={{ min: 0.5 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={null}>
                    <LowPolyCluster isMobile={isMobile} />
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={!isPaused} 
                    autoRotateSpeed={0.5} 
                />
            </Canvas>
            {/* Pause animation control */}
            <button
                onClick={() => setIsPaused(!isPaused)}
                className="absolute bottom-4 right-4 z-30 px-4 py-2 bg-background/80 text-foreground rounded-md text-sm hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={isPaused ? "Resume animation" : "Pause animation"}
            >
                {isPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
        </>
    );
}
