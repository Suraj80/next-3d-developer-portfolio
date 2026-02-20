"use client";

import { useEffect, useState } from "react";

export default function useAudioUnlock() {
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const unlock = () => {
            setUnlocked(true);
            // Remove ALL event listeners
            window.removeEventListener("click", unlock);
            window.removeEventListener("touchstart", unlock);
            window.removeEventListener("touchend", unlock);
            window.removeEventListener("keydown", unlock);
        };

        window.addEventListener("click", unlock);
        window.addEventListener("touchstart", unlock, { passive: true }); // ✅ Mobile support
        window.addEventListener("touchend", unlock, { passive: true });   // ✅ Mobile support
        window.addEventListener("keydown", unlock);
        
        // Auto-unlock after 100ms as fallback (important for mobile)
        const timeout = setTimeout(() => unlock(), 100);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("click", unlock);
            window.removeEventListener("touchstart", unlock);
            window.removeEventListener("touchend", unlock);
            window.removeEventListener("keydown", unlock);
        };
    }, []);

    return unlocked;
}
