"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle({ inline = false }: { inline?: boolean }) {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button
            onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
            }
            className={inline
                ? "px-3 py-2 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
                : "fixed top-6 right-6 z-50 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white shadow-lg hover:scale-105 transition"
            }
            aria-label="Toggle theme"
        >
            {currentTheme === "dark" ? "☀️" : "🌙"}
        </button>
    );
}
