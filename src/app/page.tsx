"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import TerminalLoader from "@/components/TerminalLoader";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contributions from "@/components/Contributions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CyberpunkGrid = dynamic(() => import("@/components/CyberpunkGrid"), {
  ssr: false,
});

const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-16">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <div className="space-y-6 animate-pulse">
          <div className="h-16 bg-white/10 rounded-lg w-3/4" />
          <div className="h-8 bg-white/10 rounded-lg w-1/2" />
          <div className="h-4 bg-white/10 rounded-lg w-full" />
          <div className="h-4 bg-white/10 rounded-lg w-5/6" />
        </div>
        <div className="w-full h-[400px] bg-white/5 rounded-3xl animate-pulse" />
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <TerminalLoader>
        <CyberpunkGrid />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contributions />
          <Contact />
          <Footer />
        </main>
      </TerminalLoader>
    </>
  );
}
