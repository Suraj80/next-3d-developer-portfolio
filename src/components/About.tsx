"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* -----------------------------
   Animated Counter Component
------------------------------ */
function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const increment = end / (duration * 60);

        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);

        return () => clearInterval(counter);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}</span>;
}

/* -----------------------------
   Floating Tech Icon Component
------------------------------ */
interface FloatingIconProps {
    icon: string;
    delay: number;
    position: { top?: string; bottom?: string; left?: string; right?: string };
}

function FloatingIcon({ icon, delay, position }: FloatingIconProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                opacity: { delay: delay + 0.5, duration: 0.5 },
                scale: { delay: delay + 0.5, duration: 0.5 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
            }}
            className="absolute hidden sm:block"
            style={position}
        >
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-2xl lg:text-3xl shadow-lg hover:scale-110 transition-transform">
                {icon}
            </div>
        </motion.div>
    );
}

export default function About() {
    const imageRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax scroll setup
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms - subtle movement
    const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]); // Background glow parallax
    const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]); // Profile image parallax

    /* -----------------------------
       Hover Tilt Effect
    ------------------------------ */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = imageRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * 10;
        const rotateY = ((x - rect.width / 2) / rect.width) * -10;

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (imageRef.current) {
            imageRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
            {/* Background Glow with parallax */}
            <motion.div
                style={{ y: glowY }}
                className="absolute top-1/2 left-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none will-change-transform"
            />

            <div className="max-w-7xl w-full mx-auto relative z-10">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-24 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-28 xl:gap-32 items-center">
                    {/* LEFT SIDE - Profile Image with parallax */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        style={{ y: imageY }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative flex justify-center lg:justify-end perspective-[1000px]"
                    >
                        {/* Animated Glow */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl opacity-30"
                        />

                        {/* Container for image and floating icons */}
                        <div className="relative">
                            {/* Floating Tech Icons */}
                            <FloatingIcon icon="⚛️" delay={0} position={{ top: "-10%", left: "-15%" }} />
                            <FloatingIcon icon="▲" delay={0.5} position={{ top: "5%", right: "-10%" }} />
                            <FloatingIcon icon="📘" delay={1} position={{ bottom: "15%", left: "-20%" }} />
                            <FloatingIcon icon="🐍" delay={1.5} position={{ bottom: "-5%", right: "-15%" }} />
                            <FloatingIcon icon="🟢" delay={2} position={{ top: "40%", left: "-25%" }} />
                            <FloatingIcon icon="🎨" delay={2.5} position={{ top: "50%", right: "-20%" }} />

                            {/* Animated Gradient Border */}
                            <div className="relative p-1 rounded-3xl">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 opacity-75"
                                    style={{
                                        filter: isHovered ? "blur(8px)" : "blur(4px)",
                                    }}
                                />

                                {/* Inner border for sharper edge */}
                                <div className="relative rounded-3xl bg-black p-1">
                                    {/* Tilt Image */}
                                    <div
                                        ref={imageRef}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseOut={() => setIsHovered(false)}
                                        className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden backdrop-blur-lg bg-white/5 transition-all duration-200 ease-out shadow-2xl shadow-purple-500/20"
                                    >
                                        <Image
                                            src="/profile.jpg"
                                            alt="Profile"
                                            fill
                                            sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-6 lg:pl-8 xl:pl-12"
                    >
                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                            I'm a <span className="text-cyan-400 font-semibold">full-stack developer</span> passionate about building scalable,
                            high-performance applications with modern UI and clean architecture.
                        </p>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                            My journey in software development has been driven by curiosity and a love for problem-solving.
                            I specialize in creating <span className="text-purple-400 font-medium">interactive web experiences</span> that
                            combine beautiful design with robust functionality.
                        </p>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                            From <span className="text-pink-400 font-medium">React and Next.js</span> to <span className="text-cyan-400 font-medium">Python and AI tools</span>,
                            I work across the full stack to bring ideas to life. I believe in writing clean, maintainable code
                            and staying up-to-date with the latest technologies.
                        </p>

                        <div className="pt-4 border-t border-white/10">
                            <p className="text-sm sm:text-base text-gray-500 italic">
                                "Code is like humor. When you have to explain it, it's bad." - Cory House
                            </p>
                        </div>

                        {/* Animated Stats */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6">
                            <div className="text-center">
                                <h4 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
                                    <Counter end={12} />+
                                </h4>
                                <p className="text-gray-400 text-xs sm:text-sm">Projects</p>
                            </div>
                            <div className="text-center">
                                <h4 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">
                                    <Counter end={3} />+
                                </h4>
                                <p className="text-gray-400 text-xs sm:text-sm">Years Learning</p>
                            </div>
                            <div className="text-center">
                                <h4 className="text-3xl sm:text-4xl font-bold text-pink-400 mb-2">
                                    <Counter end={8} />+
                                </h4>
                                <p className="text-gray-400 text-xs sm:text-sm">Technologies</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
