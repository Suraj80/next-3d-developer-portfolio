"use client";

import { useEffect, useState } from "react";

export default function HeroSpotlight() {
    const [pos, setPos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setPos({ x, y });
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div
            className="pointer-events-none absolute inset-0 z-0 transition-all duration-200"
            style={{
                background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(124,58,237,0.25), transparent 40%)`,
            }}
        />
    );
}
