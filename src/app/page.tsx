"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import CyberpunkGrid from "@/components/CyberpunkGrid";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

// Dynamic imports for heavy components (contains 3D models and animations)
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-16">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Text skeleton */}
        <div className="space-y-6 animate-pulse">
          <div className="h-16 bg-white/10 rounded-lg w-3/4"></div>
          <div className="h-8 bg-white/10 rounded-lg w-1/2"></div>
          <div className="h-4 bg-white/10 rounded-lg w-full"></div>
          <div className="h-4 bg-white/10 rounded-lg w-5/6"></div>
        </div>
        {/* 3D model skeleton */}
        <div className="w-full h-[400px] bg-white/5 rounded-3xl animate-pulse"></div>
      </div>
    </div>
  ),
});

const About = dynamic(() => import('@/components/About'), {
  loading: () => (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-pulse">
        {/* Image skeleton */}
        <div className="w-96 h-96 bg-white/5 rounded-3xl mx-auto"></div>
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-white/10 rounded-lg w-full"></div>
          <div className="h-6 bg-white/10 rounded-lg w-5/6"></div>
          <div className="h-6 bg-white/10 rounded-lg w-4/5"></div>
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <CyberpunkGrid />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
