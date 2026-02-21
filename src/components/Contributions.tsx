"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useRef } from "react";

import { Contribution, ContributionType } from "@/types";
import { useContributions } from "@/hooks/useContributions";

/* ============================= */
/*       Type Badge Styles       */
/* ============================= */

const typeBadgeConfig: Record<
    ContributionType,
    { bg: string; border: string; text: string; glow: string }
> = {
    "Bug Fix": {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        glow: "group-hover:shadow-red-500/20",
    },
    Feature: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        glow: "group-hover:shadow-green-500/20",
    },
    Refactor: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        glow: "group-hover:shadow-blue-500/20",
    },
    Docs: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
        glow: "group-hover:shadow-yellow-500/20",
    },
};

/* ============================= */
/*    Contribution Card          */
/* ============================= */

function ContributionCard({
    contribution,
    index,
}: {
    contribution: Contribution;
    index: number;
}) {
    const badgeStyle = typeBadgeConfig[contribution.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative h-full"
        >
            {/* Animated Glow Background */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 blur-md md:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Card Container with Gradient Border */}
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative h-full p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent group-hover:from-purple-500/30 group-hover:via-cyan-500/20 group-hover:to-pink-500/30 transition-all duration-500"
            >
                {/* Glassmorphism Card */}
                <div className="relative h-full p-7 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-sm md:backdrop-blur-xl border border-white/10 group-hover:border-white/20 group-hover:bg-black/50 transition-all duration-500 flex flex-col">

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl sm:text-2xl font-bold mb-1 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-cyan-400 group-hover:to-pink-400 transition-all duration-500">
                                {contribution.repo}
                            </h3>
                            {contribution.pr && (
                                <p className="text-xs text-purple-400/80 font-mono">
                                    PR: {contribution.pr}
                                </p>
                            )}
                        </div>

                        {/* Type Badge */}
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text} shadow-lg ${badgeStyle.glow} transition-all duration-300`}
                        >
                            {contribution.type}
                        </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                        {contribution.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {contribution.tech.map((tech, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.06 + i * 0.03 }}
                                viewport={{ once: true, margin: "-100px" }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-400/30 hover:text-white transition-all duration-300 cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* GitHub Button */}
                    <motion.a
                        href={contribution.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/20 text-white font-medium hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-white/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group/btn"
                    >
                        <FiGithub className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span className="text-sm">View on GitHub</span>
                        <FiExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </motion.a>

                    {/* Decorative Corner Accents */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-purple-500/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-cyan-500/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ============================= */
/*       Main Component          */
/* ============================= */

export default function Contributions() {
    const { contributions, loading } = useContributions();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Subtle parallax background glows
    const glow1Y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const glow1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]);
    const glow2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]);

    return (
        <section
            ref={sectionRef}
            id="contributions"
            className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
            {/* Subtle Background Glow 1 - Purple */}
            <motion.div
                style={{ y: glow1Y, opacity: glow1Opacity }}
                className="absolute top-1/3 left-1/4 w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[50px] md:blur-[80px] rounded-full pointer-events-none will-change-transform -z-10"
            />

            {/* Subtle Background Glow 2 - Cyan */}
            <motion.div
                style={{ y: glow2Y, opacity: glow2Opacity }}
                className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px] translate-x-1/2 translate-y-1/2 bg-cyan-600/20 blur-[50px] md:blur-[80px] rounded-full pointer-events-none will-change-transform -z-10"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 sm:mb-20 lg:mb-24"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                    >
                        Open Source Contributions
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
                    >
                        Contributing to the ecosystem that powers modern web development
                    </motion.p>
                </motion.div>

                {/* Contributions Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {contributions.map((contribution, index) => (
                        <ContributionCard key={index} contribution={contribution} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
