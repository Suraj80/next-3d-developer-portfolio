"use client";

import TerminalLoader from "@/components/TerminalLoader";
import Navbar from "@/components/Navbar";
import BackgroundGrid from "@/components/BackgroundGrid";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <TerminalLoader>
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10">
        <Hero />
      </main>

    </TerminalLoader>
  );
}
