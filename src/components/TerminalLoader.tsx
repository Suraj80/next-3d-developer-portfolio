"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAudioUnlock from "@/hooks/useAudioUnlock";

import { TERMINAL_LINES as LINES } from "@/data/terminal";
import dynamic from 'next/dynamic';

const MatrixRain = dynamic(() => import('@/components/MatrixRain'), { ssr: false });

export default function TerminalLoader({
    children,
}: {
    children: ReactNode;
}) {
    const audioUnlocked = useAudioUnlock();

    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    const [skipBoot, setSkipBoot] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const typeSound = useRef<HTMLAudioElement | null>(null);
    const bootSound = useRef<HTMLAudioElement | null>(null);

    // preload sounds once, and check session storage
    useEffect(() => {
        typeSound.current = new Audio("/sounds/type.wav");
        bootSound.current = new Audio("/sounds/boot.mp3");

        if (typeSound.current) typeSound.current.volume = 0.25;
        if (bootSound.current) bootSound.current.volume = 0.4;

        // Check if boot sequence was already completed in this session
        if (sessionStorage.getItem("bootSequenceComplete")) {
            setSkipBoot(true);
            setFinished(true); // INSTANTLY allow Hero section to mount
            setHeroVisible(true);
        }

        setIsMounted(true);
    }, []);

    // typing logic
    useEffect(() => {
        if (!audioUnlocked || skipBoot) return;

        if (lineIndex >= LINES.length) {
            if (bootSound.current) {
                bootSound.current.play().catch(() => { });
            }
            setTimeout(() => {
                setFinished(true);
                sessionStorage.setItem("bootSequenceComplete", "true");
                setTimeout(() => setHeroVisible(true), 1200); // Wait for Matrix rain to be visible
            }, 900);
            return;
        }

        const line = LINES[lineIndex];
        let charIndex = 0;

        const typing = setInterval(() => {
            if (charIndex < line.length) {
                setCurrentText(line.slice(0, charIndex + 1));

                if (typeSound.current) {
                    typeSound.current.currentTime = 0;
                    typeSound.current.play().catch(() => { });
                }

                charIndex++;
            } else {
                clearInterval(typing);

                setTimeout(() => {
                    setVisibleLines(prev => [...prev, line]);
                    setCurrentText("");
                    setLineIndex(prev => prev + 1);
                }, 250);
            }
        }, 25 + Math.random() * 30);

        return () => clearInterval(typing);
    }, [lineIndex, audioUnlocked, skipBoot]);

    return (
        <>
            {/* Run MatrixRain immediately so it's 100% loaded and running, but keep it hidden until finished */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={finished || skipBoot ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="fixed inset-0 z-0 pointer-events-none"
            >
                <MatrixRain />
            </motion.div>

            {/* Render children ALWAYS so they preload in the background. */}
            <motion.div
                initial={skipBoot ? {} : { opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                animate={
                    heroVisible
                        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                        : { opacity: 0, scale: 1.05, filter: "blur(10px)" }
                }
                transition={{ duration: 1, ease: "easeOut" }}
                className={heroVisible ? "relative z-10" : "fixed inset-0 overflow-hidden pointer-events-none"}
            >
                {children}
            </motion.div>

            {/* 🔒 WAIT FOR USER INTERACTION Overlay */}
            {!audioUnlocked && !skipBoot && isMounted && (
                <div className="fixed inset-0 z-[60] bg-black text-green-400 flex items-center justify-center font-mono cursor-pointer">
                    <p className="animate-pulse text-lg text-center px-4">
                        Click anywhere to start boot sequence...
                    </p>
                </div>
            )}

            {/* Terminal Animation Overlay */}
            <AnimatePresence>
                {audioUnlocked && !finished && !skipBoot && (
                    <motion.div
                        key="terminal"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="fixed inset-0 z-50 bg-black text-green-400 font-mono flex items-center justify-center"
                    >
                        <div className="w-full max-w-2xl px-6">
                            {/* header */}
                            <div className="bg-zinc-900 rounded-t-lg px-4 py-2 flex gap-2 shadow-lg">
                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                            </div>

                            {/* terminal */}
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
