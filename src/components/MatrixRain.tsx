"use client";


import { useEffect, useRef } from "react";
// @ts-ignore
import MatrixRainWorker from "../workers/matrixRainWorker.js?worker";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let width = window.innerWidth;
        let height = window.innerHeight;
        const isMobile = width < 768;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
        const fontSize = isMobile ? 14 : 16;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.scale(dpr, dpr);

        // Set up the worker
        const worker = new MatrixRainWorker();
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
                animationId = window.setTimeout(step, isMobile ? 50 : 40);
            }
        };

        step();

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
            worker.postMessage({ type: "init", width, height, fontSize: newIsMobile ? 14 : 16 });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            running = false;
            window.removeEventListener("resize", handleResize);
            if (animationId) clearTimeout(animationId);
            worker.terminate();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-black"
        />
    );
}
