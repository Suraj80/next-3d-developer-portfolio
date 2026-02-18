"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiMail, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useRef } from "react";

export default function Footer() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const glow1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            ref={sectionRef}
            className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden border-t border-white/10"
        >
            {/* Parallax Background Glows */}
            <motion.div
                style={{ y: glow1Y }}
                className="absolute top-1/2 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none"
            />
            <motion.div
                style={{ y: glow2Y }}
                className="absolute bottom-1/2 right-1/4 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Top Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 mb-12"
                >
                    {/* Brand */}
                    <div className="max-w-md">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                            ItsSuraj.dev
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                            Building scalable systems, interactive experiences, and
                            performance-focused web applications with modern technologies.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <SocialLink
                            href="https://github.com/Suraj80"
                            label="GitHub"
                            icon={<FiGithub />}
                        />
                        <SocialLink
                            href="https://linkedin.com/in/suraj-j-/"
                            label="LinkedIn"
                            icon={<FiLinkedin />}
                        />
                        <SocialLink
                            href="https://twitter.com/SurajJ326311"
                            label="Twitter"
                            icon={<FiTwitter />}
                        />
                    </div>
                </motion.div>

                {/* Divider with Gradient */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center">
                        <div className="px-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 blur-xl h-[1px]" />
                    </div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500"
                >
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} Suraj. All rights reserved. Built
                        with Next.js & Framer Motion.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                    >
                        <span className="text-gray-400 group-hover:text-white transition-colors">
                            Back to Top
                        </span>
                        <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-purple-400 group-hover:-translate-y-1 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
}

/* ============================= */
/*       Social Link Component   */
/* ============================= */

function SocialLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            aria-label={label}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />

            {/* Icon */}
            <div className="relative text-gray-400 group-hover:text-white transition-colors duration-300 text-xl">
                {icon}
            </div>
        </motion.a>
    );
}
