"use client";

import { useEffect, useState } from "react";

export default function useAudioUnlock() {
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const unlock = () => {
            setUnlocked(true);
            window.removeEventListener("click", unlock);
            window.removeEventListener("keydown", unlock);
        };

        window.addEventListener("click", unlock);
        window.addEventListener("keydown", unlock);

        return () => {
            window.removeEventListener("click", unlock);
            window.removeEventListener("keydown", unlock);
        };
    }, []);

    return unlocked;
}
