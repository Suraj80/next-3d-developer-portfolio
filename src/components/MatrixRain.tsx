"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // CAP THE PIXEL RATIO (1.5 is visually perfect but much cheaper than 2 or 3)
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.scale(dpr, dpr);

        const letters =
            "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = 16;
        const columns = Math.floor(width / fontSize);

        const drops = Array(columns).fill(1);

        let animationFrameId: number;
        let lastTime = 0;
        const fps = 25; // Define target FPS
        const intervalTime = 1000 / fps;

        function draw(time: number) {
            animationFrameId = requestAnimationFrame(draw);

            const deltaTime = time - lastTime;
            if (deltaTime > intervalTime) {
                lastTime = time - (deltaTime % intervalTime);

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
        }

        animationFrameId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
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
