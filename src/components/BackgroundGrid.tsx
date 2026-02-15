"use client";

import { useEffect, useRef } from "react";

export default function BackgroundGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const glow1 = useRef<HTMLDivElement>(null);
    const glow2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMove = (e: MouseEvent) => {
            mouseX = (e.clientX - window.innerWidth / 2) / 40;
            mouseY = (e.clientY - window.innerHeight / 2) / 40;
        };

        window.addEventListener("mousemove", handleMove);

        const animate = () => {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            if (gridRef.current) {
                gridRef.current.style.transform =
                    `translate(${currentX}px, ${currentY}px)`;
            }

            if (glow1.current) {
                glow1.current.style.transform =
                    `translate(${currentX * 2}px, ${currentY * 2}px)`;
            }

            if (glow2.current) {
                glow2.current.style.transform =
                    `translate(${-currentX * 2}px, ${-currentY * 2}px)`;
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">

            {/* GRID */}
            <div
                ref={gridRef}
                className="
          absolute inset-[-100px]
          [background-size:40px_40px]
          [background-image:
            linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)
          ]
          dark:[background-image:
            linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)
          ]
          transition-transform
        "
            />

            {/* GLOW 1 */}
            <div
                ref={glow1}
                className="
          absolute -top-40 -left-40 w-[650px] h-[650px]
          bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20
          rounded-full blur-3xl
        "
            />

            {/* GLOW 2 */}
            <div
                ref={glow2}
                className="
          absolute -bottom-40 -right-40 w-[650px] h-[650px]
          bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20
          rounded-full blur-3xl
        "
            />

            {/* FADE MASK */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:to-black/70" />

        </div>
    );
}
