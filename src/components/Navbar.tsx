"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { NAV_SECTIONS as SECTIONS } from "@/data/navigation";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const scrollBarRef = useRef<HTMLDivElement>(null);

    // Progress bar: update DOM directly — avoids React re-render on every scroll tick
    useEffect(() => {
        const bar = scrollBarRef.current;
        const updateProgress = () => {
            const h = document.documentElement;
            const denom = h.scrollHeight - h.clientHeight;
            const pct = denom > 0 ? (h.scrollTop / denom) * 100 : 0;
            if (bar) bar.style.width = `${pct}%`;
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress, { passive: true });
        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    // Active section detection
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Smooth scroll to section
    const scrollToSection = (id: string) => {
        setMobileOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            {/* SCROLL PROGRESS BAR */}
            <div
                ref={scrollBarRef}
                className="fixed top-0 left-0 h-[3px] z-50 w-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"
            />

            {/* FLOATING NAVBAR */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full px-4 pointer-events-none">
                <nav className="pointer-events-auto mx-auto max-w-6xl flex items-center justify-between px-6 py-3.5 rounded-full border backdrop-blur-xl bg-black/40 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    {/* GRADIENT GLOW */}
                    <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 blur-xl opacity-60" />

                    {/* LOGO */}
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="font-bold tracking-tight text-lg relative z-10 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
                    >
                        ItsSuraj.dev
                    </button>

                    {/* DESKTOP LINKS */}
                    <div className="hidden lg:flex gap-1 relative z-10">
                        {SECTIONS.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === id
                                    ? "text-white bg-white/10"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {activeSection === id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden px-3 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition relative z-10"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* MOBILE MENU */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="lg:hidden mt-3 mx-auto max-w-6xl rounded-2xl border backdrop-blur-xl bg-black/40 border-white/10 shadow-xl p-4 flex flex-col gap-2 pointer-events-auto"
                        >
                            {SECTIONS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={`text-left px-4 py-3 rounded-xl transition-all ${activeSection === id
                                        ? "bg-white/10 text-white font-semibold border border-white/10"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
