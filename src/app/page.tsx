"use client";

import TerminalLoader from "@/components/TerminalLoader";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <TerminalLoader>

      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center">

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl font-bold"
        >
          Suraj
        </motion.h1>

      </main>

    </TerminalLoader>
  );
}
