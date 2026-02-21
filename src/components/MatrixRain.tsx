"use client";

import { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        // Run once on mount to establish true width
        const checkScreen = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        if (!isLargeScreen || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        let width = window.innerWidth;
        let height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const fontSize = 16;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.scale(dpr, dpr);

        // Set up the worker using URL pattern for Next.js compatibility
        const worker = new Worker(
            new URL("../workers/matrixRainWorker.js", import.meta.url)
        );
        worker.postMessage({ type: "init", width, height, fontSize });

        ctx.font = fontSize + "px monospace";

        function drawFrame(frame: { x: number; y: number; text: string }[]) {
            ctx.fillStyle = "rgba(0,0,0,0.08)";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#00ff9c";
            for (const { x, y, text } of frame) {
                ctx.fillText(text, x, y);
            }
        }

        let animationId: number;
        let running = true;

        function step() {
            if (!running) return;
            worker.postMessage({ type: "step" });
        }

        worker.onmessage = (e: MessageEvent) => {
            if (e.data.type === "frame") {
                drawFrame(e.data.frame);
                animationId = window.setTimeout(step, 30);
            }
        };

        step();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const newDpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = width * newDpr;
            canvas.height = height * newDpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.scale(newDpr, newDpr);
            worker.postMessage({ type: "init", width, height, fontSize });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            running = false;
            window.removeEventListener("resize", handleResize);
            if (animationId) clearTimeout(animationId);
            worker.terminate();
        };
    }, [isLargeScreen]);

    return isLargeScreen ? (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-black"
        />
    ) : (
        <div className="fixed inset-0 -z-10 bg-black" />
    );
}
