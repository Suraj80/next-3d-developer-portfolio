"use client";

import {
    motion,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import { useRef, useState, useEffect, memo, useMemo, useCallback } from "react";
import Image from "next/image";

import { ExperienceItem } from "@/types";
import { useExperience } from "@/hooks/useExperience";

/* ============================= */
/*   Optimized Year Counter      */
/* ============================= */

const YearCounter = memo(({ year }: { year: number }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        // Optimized: Use requestAnimationFrame instead of setInterval
        let start = 2000;
        let animationFrame: number;
        const increment = (year - 2000) / 60; // 60 frames

        const animate = () => {
            start += increment;
            if (start >= year) {
                setCount(year);
            } else {
                setCount(Math.floor(start));
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [inView, year]);

    return <span ref={ref}>{count}</span>;
});

YearCounter.displayName = "YearCounter";

/* ============================= */
/*   Optimized Experience Card   */
/* ============================= */

const ExperienceCard = memo(({
    experience,
    index,
    isActive,
}: {
    experience: ExperienceItem;
    index: number;
    isActive: boolean;
}) => {
    const isCurrent = !experience.endYear;
    const isLeft = index % 2 === 0;

    // Memoize className to prevent recalculation
    const containerClassName = useMemo(
        () => `relative flex ${isLeft ? "md:justify-start" : "md:justify-end"}`,
        [isLeft]
    );

    const cardClassName = useMemo(
        () => `ml-20 md:ml-0 md:w-[calc(50%-3rem)] group ${isLeft ? "md:mr-auto" : "md:ml-auto"}`,
        [isLeft]
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className={containerClassName}
        >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-8">
                <div className="relative group">
                    {/* Optimized: Removed outer glow ring animation for performance */}

                    {/* Main Dot */}
                    <div className="relative w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/80 transition-shadow duration-300 group-hover:scale-110 will-change-transform">
                        <div className="absolute inset-[3px] rounded-full bg-black" />
                        <div className="absolute inset-[5px] rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                    </div>

                    {/* Pulse for Current Role - Optimized */}
                    {isCurrent && (
                        <motion.div
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full bg-purple-400/30 will-change-transform"
                        />
                    )}
                </div>
            </div>

            {/* Experience Card Container */}
            <div className={cardClassName}>
                {/* Floating Glow - Optimized */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isActive ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl pointer-events-none will-change-opacity"
                />

                {/* Gradient Border Container - Simplified */}
                <div className={`relative p-[1px] rounded-2xl transition-all duration-400 ${isActive
                    ? "bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-pink-500/50"
                    : "bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30"
                    }`}>
                    {/* Card Content */}
                    <div className="relative p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Logo */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 blur-lg opacity-40 rounded-xl" />
                                <div className="relative w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2 border border-white/20 overflow-hidden">
                                    <Image
                                        src={experience.logo}
                                        alt={experience.company}
                                        fill
                                        className="object-contain"
                                        sizes="56px"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3
                                    className={`text-lg sm:text-xl font-semibold mb-1 transition-colors duration-300 ${isActive ? "text-purple-300" : "text-white"
                                        }`}
                                >
                                    {experience.company}
                                </h3>
                                <p className="text-sm sm:text-base bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                                    {experience.role}
                                </p>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-purple-400 to-cyan-400" />
                            <p className="text-xs sm:text-sm text-gray-400 font-mono">
                                <YearCounter year={experience.startYear} />
                                {" – "}
                                {experience.endYear ? (
                                    <YearCounter year={experience.endYear} />
                                ) : (
                                    <span className="text-green-400 font-semibold">
                                        Present
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Description - Always Visible */}
                        <div className="pt-4 border-t border-white/10">
                            <ul className="space-y-3">
                                {experience.description.map((point, i) => (
                                    <motion.li
                                        key={point}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: i * 0.08,
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-3 text-sm sm:text-base text-gray-300"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mt-2 flex-shrink-0" />
                                        <span>{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

ExperienceCard.displayName = "ExperienceCard";

/* ============================= */
/*       Main Component          */
/* ============================= */

export default function Experience() {
    const { experiences, loading } = useExperience();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* Parallax Background - Optimized */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const glow1Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    /* Timeline Progress - Optimized */
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

    /* Viewport Detection - Optimized with useCallback */
    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const index = cardRefs.current.findIndex((ref) => ref === entry.target);
                if (index !== -1) {
                    setActiveIndex(index);
                }
            }
        });
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const observerOptions = {
            threshold: [0.5],
            rootMargin: "-15% 0px -15% 0px",
        };

        cardRefs.current.forEach((cardRef) => {
            if (!cardRef) return;

            const observer = new IntersectionObserver(
                handleIntersection,
                observerOptions
            );

            observer.observe(cardRef);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [handleIntersection]);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
            {/* Optimized Background Glows */}
            <motion.div
                style={{ y: glow1Y }}
                className="absolute top-1/3 left-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none will-change-transform -z-10"
            />

            <motion.div
                style={{ y: glow2Y }}
                className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px] translate-x-1/2 translate-y-1/2 bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none will-change-transform -z-10"
            />

            <div className="max-w-7xl w-full mx-auto relative z-10">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                >
                    Experience
                </motion.h2>

                <div ref={timelineRef} className="relative max-w-5xl mx-auto">
                    {/* Static Background Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />

                    {/* Animated Gradient Line - Optimized */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-400 via-cyan-400 to-pink-400 md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(139,92,246,0.5)] will-change-auto"
                    />

                    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
                        {experiences.map((experience, index) => (
                            <div
                                key={`experience-${index}`}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                            >
                                <ExperienceCard
                                    experience={experience}
                                    index={index}
                                    isActive={activeIndex === index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
