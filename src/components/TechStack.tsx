"use client";

import { useState, useRef } from "react";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import { Tech } from "@/types";
import { useTechStack } from "@/hooks/useTechStack";
import { useParallax } from "@/hooks/useParallax";

export default function TechStack() {
    const {
        filteredTech: filtered,
        categories,
        activeCategory: active,
        setActiveCategory: setActive,
        loading
    } = useTechStack();
    const sectionRef = useRef<HTMLElement>(null);
    const { glow1Y, glow2Y } = useParallax(sectionRef);

    return (
        <section
            ref={sectionRef}
            id="tech-stack"
            className="relative py-28 px-6 md:px-16 text-white overflow-hidden"
        >
            {loading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    {/* Background Glow */}
                    <motion.div
                        style={{ y: glow1Y }}
                        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"
                    />

                    <motion.div
                        style={{ y: glow2Y }}
                        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] translate-x-1/2 translate-y-1/2 bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"
                    />

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                        >
                            Tech Stack
                        </motion.h2>

                        {/* Filter Buttons - Enhanced & Responsive */}
                        <div className="mb-16 sm:mb-20">
                            <div className="flex justify-center">
                                <div className="inline-flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 p-2 sm:p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                                    {categories.map((cat) => (
                                        <div key={cat} className="relative">
                                            <button
                                                onClick={() => setActive(cat)}
                                                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 ${active === cat
                                                    ? "text-white bg-white/10"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <span className="relative z-10">{cat}</span>

                                                {/* Active Background */}
                                                {active === cat && (
                                                    <motion.div
                                                        layoutId="activeCategory"
                                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 380,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </button>

                                            {/* Animated Underline */}
                                            {active === cat && (
                                                <motion.div
                                                    layoutId="underline"
                                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 380,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode="sync">
                                {filtered.map((tech, index) => (
                                    <TechCard key={tech.name} tech={tech} index={index} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </>
            )}
        </section>
    );
}

/* ============================= */
/*       Premium Tech Card       */
/* ============================= */

function TechCard({ tech, index }: { tech: Tech; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.3 }
            }}
            className="relative group perspective-[1000px]"
        >
            {/* Floating Glow Pulse */}
            <motion.div
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-2xl opacity-20"
            />

            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="w-full h-full rounded-2xl bg-black" />
            </div>

            {/* Card */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] min-h-[160px]"
            >
                <div className="text-5xl mb-4 text-gray-300 group-hover:text-purple-400 transition duration-300">
                    {tech.icon}
                </div>

                <p className="text-sm text-gray-400 group-hover:text-white transition duration-300 font-medium">
                    {tech.name}
                </p>

                {/* Tooltip */}
                <div className="absolute bottom-3 opacity-0 group-hover:opacity-100 transition text-xs text-purple-400 font-medium">
                    {tech.level}
                </div>
            </motion.div>
        </motion.div>
    );
}
