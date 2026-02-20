"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SplineRobot from "./SplineRobot";

const roles = [
    "Full Stack Developer",
    "Python Enthusiast",
    "AI Builder",
    "Problem Solver",
];

export default function Hero() {
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);

    // Parallax scroll setup
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const glowY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const robotY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Typing effect logic (unchanged)
    useEffect(() => {
        const currentRole = roles[roleIndex];

        const typing = setTimeout(() => {
            if (charIndex < currentRole.length) {
                setText(currentRole.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else {
                setTimeout(() => {
                    setCharIndex(0);
                    setText("");
                    setRoleIndex((roleIndex + 1) % roles.length);
                }, 1600);
            }
        }, 60);

        return () => clearTimeout(typing);
    }, [charIndex, roleIndex]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-16 overflow-hidden"
        >
            {/* Background glow */}
            <motion.div
                style={{ y: glowY }}
                className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-cyan-500/20 blur-[80px] rounded-full top-1/3 left-1/2 -translate-x-1/2 -z-10 will-change-transform"
            />

            <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center z-10">

                {/* LEFT CONTENT */}
                <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start space-y-4 sm:space-y-6 lg:w-1/2">

                    {/* NAME */}
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight whitespace-nowrap text-zinc-900 dark:text-white"
                    >
                        Suraj Jangavali
                    </motion.h1>

                    {/* ROLE */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-2 sm:mt-4 text-lg sm:text-xl lg:text-2xl text-cyan-400 font-mono min-h-[28px] sm:min-h-[32px]"
                    >
                        {text}
                        <span className="animate-pulse">|</span>
                    </motion.p>

                    {/* SUBTITLE */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed px-4 lg:px-0 text-zinc-600 dark:text-zinc-400"
                    >
                        Building modern web apps, AI tools, and interactive experiences.
                    </motion.p>

                    {/* BUTTONS */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10 w-full sm:w-auto px-4 lg:px-0"
                    >
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition shadow-lg shadow-cyan-500/30 text-sm sm:text-base">
                            View Projects
                        </button>

                        <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-cyan-500/60 hover:bg-cyan-500/10 transition text-sm sm:text-base text-zinc-800 dark:text-white">
                            Download Resume
                        </button>
                    </motion.div>
                </div>

                {/* ✅ ROBOT (TOP ON MOBILE, RIGHT ON DESKTOP) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ y: robotY }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-end -mb-32 sm:-mb-18 lg:mb-0"
                >
                    <div className="w-full max-w-[320px] lg:max-w-none lg:w-full">
                        <SplineRobot />
                    </div>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 2, duration: 1 },
                    y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                }}
                className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 opacity-70"
            >
                <div className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/60 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}