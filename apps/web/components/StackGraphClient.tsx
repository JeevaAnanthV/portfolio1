'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

type TechNode = {
    id: string;
    name: string;
    category: string;
    role: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
};

type Link = {
    source: string;
    target: string;
};

const techStack: Omit<TechNode, 'x' | 'y' | 'vx' | 'vy'>[] = [
    { id: 'python', name: 'Python', category: 'Language', role: 'Primary language for ML/AI development, data processing, and backend services' },
    { id: 'pytorch', name: 'PyTorch', category: 'ML Framework', role: 'Deep learning model development and training' },
    { id: 'tensorflow', name: 'TensorFlow', category: 'ML Framework', role: 'Production ML model deployment and optimization' },
    { id: 'langchain', name: 'LangChain', category: 'AI Framework', role: 'RAG system orchestration and LLM application development' },
    { id: 'huggingface', name: 'HuggingFace', category: 'AI Framework', role: 'Transformer models, embeddings, and model hub integration' },
    { id: 'fastapi', name: 'FastAPI', category: 'Backend', role: 'High-performance API development for ML services' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'Database', role: 'Vector storage with pgvector extension for semantic search' },
    { id: 'kafka', name: 'Kafka', category: 'Data Engineering', role: 'Real-time data streaming and event processing' },
    { id: 'docker', name: 'Docker', category: 'DevOps', role: 'Containerization and deployment orchestration' },
    { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', role: 'Container orchestration and scalable ML infrastructure' },
    { id: 'nextjs', name: 'Next.js', category: 'Frontend', role: 'Full-stack web applications and React-based UIs' },
    { id: 'react', name: 'React', category: 'Frontend', role: 'Interactive user interfaces and component architecture' },
    { id: 'aws', name: 'AWS', category: 'Cloud', role: 'Cloud infrastructure, ML services, and scalable deployments' },
    { id: 'redis', name: 'Redis', category: 'Data Engineering', role: 'Caching and real-time data processing' },
    { id: 'airflow', name: 'Airflow', category: 'Data Engineering', role: 'Workflow orchestration and ETL pipeline management' },
];

const links: Link[] = [
    { source: 'python', target: 'pytorch' },
    { source: 'python', target: 'tensorflow' },
    { source: 'python', target: 'fastapi' },
    { source: 'langchain', target: 'huggingface' },
    { source: 'langchain', target: 'postgresql' },
    { source: 'fastapi', target: 'postgresql' },
    { source: 'fastapi', target: 'redis' },
    { source: 'kafka', target: 'python' },
    { source: 'airflow', target: 'python' },
    { source: 'docker', target: 'kubernetes' },
    { source: 'kubernetes', target: 'aws' },
    { source: 'nextjs', target: 'react' },
    { source: 'fastapi', target: 'nextjs' },
    { source: 'pytorch', target: 'huggingface' },
    { source: 'tensorflow', target: 'aws' },
];

const categoryColors: Record<string, string> = {
    'Language': 'bg-blue-500',
    'ML Framework': 'bg-purple-500',
    'AI Framework': 'bg-pink-500',
    'Backend': 'bg-green-500',
    'Database': 'bg-yellow-500',
    'Data Engineering': 'bg-orange-500',
    'DevOps': 'bg-red-500',
    'Frontend': 'bg-cyan-500',
    'Cloud': 'bg-indigo-500',
};

export default function StackGraphClient() {
    const [nodes, setNodes] = useState<TechNode[]>([]);
    const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const animationRef = useRef<number>();

    const width = 800;
    const height = 600;

    useEffect(() => {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;

        const initialNodes: TechNode[] = techStack.map((tech, i) => {
            const angle = (2 * Math.PI * i) / techStack.length;
            return {
                ...tech,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
                vx: 0,
                vy: 0,
            };
        });

        setNodes(initialNodes);
    }, []);

    const tick = useCallback(() => {
        setNodes((prevNodes) => {
            const newNodes = prevNodes.map((node) => ({ ...node }));
            const k = 0.1;
            const charge = -300;
            const linkDistance = 100;

            newNodes.forEach((node, i) => {
                let fx = 0;
                let fy = 0;

                newNodes.forEach((other, j) => {
                    if (i === j) return;
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = charge / (dist * dist);
                    fx += (dx / dist) * force;
                    fy += (dy / dist) * force;
                });

                links.forEach((link) => {
                    if (link.source === node.id || link.target === node.id) {
                        const source = newNodes.find((n) => n.id === link.source);
                        const target = newNodes.find((n) => n.id === link.target);
                        if (source && target) {
                            const dx = target.x - source.x;
                            const dy = target.y - source.y;
                            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                            const diff = (dist - linkDistance) / dist;
                            if (link.source === node.id) {
                                fx += dx * diff * k;
                                fy += dy * diff * k;
                            } else {
                                fx -= dx * diff * k;
                                fy -= dy * diff * k;
                            }
                        }
                    }
                });

                node.vx = (node.vx + fx) * 0.9;
                node.vy = (node.vy + fy) * 0.9;
                node.x += node.vx;
                node.y += node.vy;

                const padding = 50;
                if (node.x < padding) node.x = padding;
                if (node.x > width - padding) node.x = width - padding;
                if (node.y < padding) node.y = padding;
                if (node.y > height - padding) node.y = height - padding;
            });

            return newNodes;
        });

        animationRef.current = requestAnimationFrame(tick);
    }, [width, height]);

    useEffect(() => {
        if (nodes.length > 0) {
            animationRef.current = requestAnimationFrame(tick);
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [nodes.length, tick]);

    const handleNodeClick = (node: TechNode) => {
        setSelectedNode(node);
    };

    return (
        <div className="relative w-full">
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className="border rounded-lg bg-black"
            >
                {links.map((link, i) => {
                    const source = nodes.find((n) => n.id === link.source);
                    const target = nodes.find((n) => n.id === link.target);
                    if (!source || !target) return null;
                    return (
                        <line
                            key={i}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="1"
                        />
                    );
                })}
                {nodes.map((node) => {
                    const category = techStack.find((t) => t.id === node.id)?.category || '';
                    const colorClass = categoryColors[category] || 'bg-gray-500';
                    return (
                        <g key={node.id}>
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={20}
                                fill="currentColor"
                                className={colorClass}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleNodeClick(node)}
                                style={{ cursor: 'pointer' }}
                            />
                            <text
                                x={node.x}
                                y={node.y + 35}
                                textAnchor="middle"
                                fill="white"
                                fontSize="10"
                                className="pointer-events-none"
                            >
                                {node.name}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {selectedNode && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-black border border-white/20 rounded-lg p-4 max-w-xs z-10"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{selectedNode.name}</h3>
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="text-white/60 hover:text-white"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-xs text-white/60 mb-1">{selectedNode.category}</p>
                    <p className="text-sm text-white/80">{selectedNode.role}</p>
                </motion.div>
            )}
        </div>
    );
}

