"use client";

import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

type ExperienceItem = {
    role: string;
    company: string;
    logo: string;
    startYear: number;
    endYear?: number; // undefined = currently working
    description: string[];
};

const experiences: ExperienceItem[] = [
    {
        role: "Full Stack Developer",
        company: "Freelance / Personal Projects",
        logo: "/logos/freelance.png",
        startYear: 2023,
        description: [
            "Built enterprise-level CRM system with RBAC.",
            "Integrated Keycloak SSO with secure session management.",
            "Optimized 3D portfolio with dynamic imports.",
            "Designed scalable MySQL architecture.",
        ],
    },
    {
        role: "Frontend Developer",
        company: "Self Learning & Projects",
        logo: "/logos/self.png",
        startYear: 2022,
        endYear: 2023,
        description: [
            "Built modern UI systems with React & Next.js.",
            "Implemented advanced animations with Framer Motion.",
            "Focused on performance-first architecture.",
        ],
    },
    {
        role: "Frontend Developer",
        company: "Self Learning & Projects",
        logo: "/logos/self.png",
        startYear: 2022,
        endYear: 2023,
        description: [
            "Built modern UI systems with React & Next.js.",
            "Implemented advanced animations with Framer Motion.",
            "Focused on performance-first architecture.",
        ],
    },
];

/* ============================= */
/*       Animated Year Counter   */
/* ============================= */

function YearCounter({ year }: { year: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 2000;
        const interval = setInterval(() => {
            start += 1;
            if (start >= year) {
                setCount(year);
                clearInterval(interval);
            } else {
                setCount(start);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [inView, year]);

    return <span ref={ref}>{count}</span>;
}

/* ============================= */
/*       Experience Card         */
/* ============================= */

function ExperienceCard({
    exp,
    index,
    isExpanded,
}: {
    exp: ExperienceItem;
    index: number;
    isExpanded: boolean;
}) {
    const isCurrent = !exp.endYear;
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"
                }`}
        >
            {/* Timeline Dot with Glow */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-8">
                <div className="relative group">
                    {/* Outer Glow Ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 w-6 h-6 -translate-x-[2px] -translate-y-[2px] rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 blur-md"
                    />

                    {/* Main Dot */}
                    <div className="relative w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/80 transition-all duration-300 group-hover:scale-110">
                        <div className="absolute inset-[3px] rounded-full bg-black" />
                        <div className="absolute inset-[5px] rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                    </div>

                    {/* Pulse for Current Role */}
                    {isCurrent && (
                        <motion.div
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="absolute inset-0 rounded-full bg-purple-400/40"
                        />
                    )}
                </div>
            </div>

            {/* Experience Card */}
            <motion.div
                animate={{
                    scale: isExpanded ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] group ${isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
            >
                {/* Floating Glow */}
                <motion.div
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl"
                />

                {/* Gradient Border Container */}
                <motion.div
                    animate={{
                        background: isExpanded
                            ? "linear-gradient(to right, rgba(168, 85, 247, 0.5), rgba(34, 211, 238, 0.5), rgba(236, 72, 153, 0.5))"
                            : "linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(34, 211, 238, 0.3), rgba(236, 72, 153, 0.3))",
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative p-[1px] rounded-2xl"
                >
                    {/* Card Content */}
                    <div className="relative p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Logo with Glow */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 blur-lg opacity-50 rounded-xl" />
                                <div className="relative w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm p-2 border border-white/20">
                                    <Image
                                        src={exp.logo}
                                        alt={exp.company}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <motion.h3
                                    animate={{
                                        color: isExpanded
                                            ? "rgb(192, 132, 252)"
                                            : "rgb(255, 255, 255)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-lg sm:text-xl font-semibold mb-1"
                                >
                                    {exp.role}
                                </motion.h3>
                                <p className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-medium">
                                    {exp.company}
                                </p>
                            </div>

                            {/* Expand Icon */}
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-400 group-hover:text-white transition-colors"
                            >
                                <FiChevronDown size={20} />
                            </motion.div>
                        </div>

                        {/* Duration with Gradient */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-purple-400 to-cyan-400" />
                            <p className="text-xs sm:text-sm text-gray-400 font-mono">
                                <YearCounter year={exp.startYear} />
                                {" – "}
                                {exp.endYear ? (
                                    <YearCounter year={exp.endYear} />
                                ) : (
                                    <span className="text-green-400 font-semibold">
                                        Present
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Expandable Description */}
                        <AnimatePresence mode="wait">
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 border-t border-white/10">
                                        <ul className="space-y-3">
                                            {exp.description.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-start gap-3 text-sm sm:text-base text-gray-300"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mt-2 flex-shrink-0" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Subtle hint text when collapsed */}
                        {!isExpanded && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-gray-500 italic mt-2"
                            >
                                Scroll to expand details
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* ============================= */
    /*       Parallax Background     */
    /* ============================= */

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const glow1Y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    // Timeline scroll progress
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

    /* ============================= */
    /*   Viewport Detection Logic    */
    /* ============================= */

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardRefs.current.forEach((cardRef, index) => {
            if (!cardRef) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        // Card is in view and centered
                        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                            setActiveIndex(index);
                        }
                    });
                },
                {
                    threshold: [0, 0.5, 1],
                    rootMargin: "-20% 0px -20% 0px", // Center detection zone
                }
            );

            observer.observe(cardRef);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
            {/* Background Glow 1 - Purple */}
            <motion.div
                style={{ y: glow1Y }}
                className="absolute top-1/3 left-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"
            />

            {/* Background Glow 2 - Cyan */}
            <motion.div
                style={{ y: glow2Y }}
                className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] translate-x-1/2 translate-y-1/2 bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"
            />

            <div className="max-w-7xl w-full mx-auto relative z-10">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                >
                    Experience
                </motion.h2>

                <div ref={timelineRef} className="relative max-w-5xl mx-auto">
                    {/* Static Background Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />

                    {/* Animated Gradient Line */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-400 via-cyan-400 to-pink-400 md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    />

                    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                            >
                                <ExperienceCard
                                    exp={exp}
                                    index={index}
                                    isExpanded={activeIndex === index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
