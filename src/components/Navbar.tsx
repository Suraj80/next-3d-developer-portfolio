"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";

const LINKS = ["Home", "Projects", "Skills", "Contact"];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState("Home");
    const [progress, setProgress] = useState(0);

    // scroll progress bar
    useEffect(() => {
        const update = () => {
            const h = document.documentElement;
            const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
            setProgress(scrolled * 100);
        };

        window.addEventListener("scroll", update);
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <>
            {/* SCROLL PROGRESS BAR */}
            <div
                className="fixed top-0 left-0 h-[3px] z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all"
                style={{ width: `${progress}%` }}
            />

            {/* FLOATING NAVBAR */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full px-4 pointer-events-none">
                <nav
                    className="
          pointer-events-auto
          mx-auto max-w-5xl
          flex items-center justify-between
          px-6 py-3

          rounded-full
          border

          backdrop-blur-xl
          bg-white/40 dark:bg-black/40
          border-white/20 dark:border-white/10

          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
          relative overflow-hidden
        "
                >
                    {/* GRADIENT GLOW EDGES */}
                    <div className="absolute inset-0 rounded-full pointer-events-none
              bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20
              blur-xl opacity-60" />

                    {/* LOGO */}
                    <div className="font-bold tracking-tight text-lg relative z-10">
                        Suraj.dev
                    </div>

                    {/* DESKTOP LINKS */}
                    <div className="hidden md:flex gap-8 relative z-10">
                        {LINKS.map((l) => (
                            <MagneticLink
                                key={l}
                                label={l}
                                active={active === l}
                                onClick={() => setActive(l)}
                            />
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 relative z-10">

                        <ThemeToggle inline />

                        {/* MOBILE BUTTON */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden px-3 py-2 rounded-lg bg-white/30 dark:bg-white/10"
                        >
                            ☰
                        </button>
                    </div>
                </nav>

                {/* MOBILE GLASS MENU */}
                {mobileOpen && (
                    <div className="md:hidden mt-3 mx-auto max-w-5xl rounded-2xl border
              backdrop-blur-xl
              bg-white/40 dark:bg-black/40
              border-white/20 dark:border-white/10
              shadow-xl p-4 flex flex-col gap-4">

                        {LINKS.map((l) => (
                            <button
                                key={l}
                                onClick={() => {
                                    setActive(l);
                                    setMobileOpen(false);
                                }}
                                className={`text-left px-3 py-2 rounded-lg transition
                  ${active === l
                                        ? "bg-white/60 dark:bg-white/20 font-semibold"
                                        : "hover:bg-white/40 dark:hover:bg-white/10"
                                    }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                )}
            </header>
        </>
    );
}

/* ===========================
   MAGNETIC HOVER LINK
=========================== */

function MagneticLink({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    function handleMove(e: React.MouseEvent) {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    }

    function reset() {
        if (ref.current) ref.current.style.transform = "";
    }

    return (
        <button
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            onClick={onClick}
            className="relative px-1 py-1 transition-transform duration-150"
        >
            <span className="opacity-90 hover:opacity-100">
                {label}
            </span>

            {/* ACTIVE UNDERLINE ANIMATION */}
            <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-current transition-all duration-300
        ${active ? "w-full" : "w-0 group-hover:w-full"}`}
            />
        </button>
    );
}
