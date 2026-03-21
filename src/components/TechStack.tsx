"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Tech } from "@/types";
import { useTechStack } from "@/hooks/useTechStack";

export default function TechStack() {
    const { techStack, loading } = useTechStack();

    return (
        <section
            id="tech-stack"
            className="relative py-28 px-6 md:px-16 text-white overflow-hidden"
        >
            {loading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[700px] sm:h-[700px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[50px] md:blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[700px] sm:h-[700px] translate-x-1/2 translate-y-1/2 bg-cyan-600/20 blur-[50px] md:blur-[80px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                        >
                            Tech Stack
                        </motion.h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                            {techStack.map((tech, index) => (
                                <TechCard key={tech.name} tech={tech} index={index} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

function TechCard({ tech, index }: { tech: Tech; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * 8;
        const rotateY = ((x - rect.width / 2) / rect.width) * -8;

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const resetTilt = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            viewport={{ once: true, margin: "-40px" }}
            className="relative group perspective-[1000px]"
        >
            <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-md md:blur-xl opacity-20 tech-stack-card-glow pointer-events-none"
                aria-hidden
            />

            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="w-full h-full rounded-2xl bg-black" />
            </div>

            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
                className="relative p-8 rounded-2xl bg-black/80 border border-white/10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)] min-h-[160px]"
            >
                <div className="text-5xl mb-4 transition duration-300 drop-shadow-md group-hover:scale-110">
                    {tech.icon}
                </div>

                <p className="text-sm text-gray-400 group-hover:text-white transition duration-300 font-medium">
                    {tech.name}
                </p>

                <div className="absolute bottom-3 opacity-0 group-hover:opacity-100 transition text-xs text-purple-400 font-medium">
                    {tech.level}
                </div>
            </div>
        </motion.div>
    );
}
