"use client";

import { useEffect, useRef } from "react";

export default function CyberpunkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationId: number;

    // Throttle helper — fires at most once per `limit` ms
    const throttle = <T extends unknown[]>(
      fn: (...args: T) => void,
      limit: number
    ) => {
      let lastCall = 0;
      return (...args: T) => {
        const now = Date.now();
        if (now - lastCall >= limit) {
          lastCall = now;
          fn(...args);
        }
      };
    };

    // ✅ Throttled to ~60fps — no longer fires on every pixel of movement
    const move = throttle((e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 50;
      mouseY = (e.clientY - window.innerHeight / 2) / 50;
    }, 16);

    window.addEventListener("mousemove", move);

    // ✅ Set will-change once so the browser promotes the layer upfront
    if (gridRef.current) {
      gridRef.current.style.willChange = "transform";
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      // ✅ translate3d triggers GPU compositing instead of CPU repaints
      if (gridRef.current) {
        gridRef.current.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // ✅ Cancel both the rAF loop and the event listener on unmount
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">

      {/* BASE CYBER GRID */}
      <div
        ref={gridRef}
        className="absolute inset-[-150px] [background-size:60px_60px] opacity-70"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)",
          filter: "drop-shadow(0 0 6px rgba(0,255,255,0.4))",
        }}
      />

      {/* MOVING HORIZONTAL LIGHT SWEEP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-[2px] bg-cyan-400/70 blur-[2px]"
          style={{
            animation: "cyberpunkScan 6s linear infinite",
          }}
        />
      </div>

      {/* VERTICAL LIGHT SWEEP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute h-full w-[2px] bg-purple-400/70 blur-[2px]"
          style={{
            animation: "cyberpunkScanV 9s linear infinite",
          }}
        />
      </div>

      {/* CYBER GLOW FOG */}
      <div
        className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-3xl"
        style={{
          animation: "cyberpunkFloat 18s linear infinite",
        }}
      />

      <div
        className="absolute bottom-[-200px] right-[-200px] w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl"
        style={{
          animation: "cyberpunkFloat2 22s linear infinite",
        }}
      />

      {/* GRADIENT FADE */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

      {/* Global Styles for Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes cyberpunkScan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }

          @keyframes cyberpunkScanV {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }

          @keyframes cyberpunkFloat {
            0% { transform: translate(0,0); }
            50% { transform: translate(140px,80px); }
            100% { transform: translate(0,0); }
          }

          @keyframes cyberpunkFloat2 {
            0% { transform: translate(0,0); }
            50% { transform: translate(-140px,-80px); }
            100% { transform: translate(0,0); }
          }
        `
      }} />

    </div>
  );
}
