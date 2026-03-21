"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TERMINAL_LINES as LINES } from "@/data/terminal";

export default function TerminalLoader({
    children,
}: {
    children: ReactNode;
}) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    const [skipBoot, setSkipBoot] = useState(false);
    const [bootReady, setBootReady] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("bootSequenceComplete")) {
            setSkipBoot(true);
            setFinished(true);
            setHeroVisible(true);
        }
        setBootReady(true);
    }, []);

    useEffect(() => {
        if (!bootReady || skipBoot) return;

        if (lineIndex >= LINES.length) {
            setTimeout(() => {
                setFinished(true);
                sessionStorage.setItem("bootSequenceComplete", "true");
                setHeroVisible(true);
            }, 300);
            return;
        }

        const line = LINES[lineIndex];
        let charIndex = 0;

        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const baseDelay = isMobile ? 15 : 10;
        const randomDelay = isMobile ? 10 : 15;

        const typing = setInterval(() => {
            if (charIndex < line.length) {
                setCurrentText(line.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typing);

                setTimeout(() => {
                    setVisibleLines((prev) => [...prev, line]);
                    setCurrentText("");
                    setLineIndex((prev) => prev + 1);
                }, 100);
            }
        }, baseDelay + Math.random() * randomDelay);

        return () => clearInterval(typing);
    }, [lineIndex, skipBoot, bootReady]);

    return (
        <>
            <div className="fixed inset-0 -z-50 bg-black pointer-events-none" />

            {(finished || skipBoot || lineIndex >= LINES.length - 1) && (
                <motion.div
                    initial={skipBoot ? {} : { opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    animate={
                        heroVisible
                            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                            : { opacity: 0, scale: 1.05, filter: "blur(10px)" }
                    }
                    transition={{ duration: 1, ease: "easeOut" }}
                    onAnimationComplete={() => {
                        if (heroVisible) {
                            const el = document.getElementById("terminal-content-wrapper");
                            if (el) {
                                el.style.transform = "none";
                                el.style.filter = "none";
                            }
                        }
                    }}
                    id="terminal-content-wrapper"
                    className={heroVisible ? "relative z-10" : "fixed inset-0 overflow-hidden pointer-events-none"}
                >
                    {children}
                </motion.div>
            )}

            <AnimatePresence>
                {bootReady && !finished && !skipBoot && (
                    <motion.div
                        key="terminal"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="fixed inset-0 z-50 bg-black text-green-400 font-mono flex items-center justify-center"
                    >
                        <div className="w-full max-w-2xl px-6">
                            <div className="bg-zinc-900 rounded-t-lg px-4 py-2 flex gap-2 shadow-lg">
                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                            </div>

                            <div className="bg-black border border-zinc-800 rounded-b-lg p-5 text-sm sm:text-base shadow-2xl">
                                {visibleLines.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}

                                <div>
                                    {currentText}
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        █
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
