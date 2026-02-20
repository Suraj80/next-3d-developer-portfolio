"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // ⚡ Mobile detection for performance optimization
        const isMobile = width < 768;
        
        // Cap DPR lower on mobile to reduce pixel count
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.scale(dpr, dpr);

        const letters =
            "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = isMobile ? 14 : 16; // Smaller = fewer columns = better performance
        const columns = Math.floor(width / fontSize);

        const drops = Array(columns).fill(1);

        function draw() {
            // fade effect
            ctx.fillStyle = "rgba(0,0,0,0.08)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#00ff9c";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        // ⚡ Slower interval on mobile (50ms vs 40ms = 20fps vs 25fps)
        const interval = setInterval(draw, isMobile ? 50 : 40);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            
            const newIsMobile = width < 768;
            const newDpr = Math.min(window.devicePixelRatio || 1, newIsMobile ? 1 : 1.5);

            canvas.width = width * newDpr;
            canvas.height = height * newDpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.scale(newDpr, newDpr);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-black"
        />
    );
}
