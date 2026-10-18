"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const words = ["Web", "SaaS", "products", "&", "practical", "AI", "that", "works", "for", "your", "business."];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="aurora -left-40 top-10 h-[480px] w-[480px] bg-neon-violet" />
      <div className="aurora -right-32 bottom-0 h-[420px] w-[420px] bg-neon-cyan [animation-delay:-6s]" />
      <div className="aurora left-1/3 top-1/2 h-[300px] w-[300px] bg-neon-magenta [animation-delay:-11s]" />
      <div className="grid-bg absolute inset-0" />
      <div className="absolute inset-0"><ParticleField /></div>
      <div className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent [animation:scan_6s_linear_infinite]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-block rounded-full border border-neon-cyan/40 bg-neon-cyan/5 px-4 py-1 font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
          Hansoft Industries · Kent, UK
        </motion.p>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.7 }}
              className={`mr-3 inline-block ${["SaaS", "AI"].includes(w) ? "text-gradient" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mx-auto mt-8 max-w-2xl text-lg text-white/65">
          We build software that scales, and we help small businesses weave AI into everyday workflows to save time and cut costs.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#ai" className="rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta px-8 py-3 font-medium text-black shadow-[0_0_40px_rgba(139,92,246,0.5)] transition hover:scale-105">
            Explore AI consulting
          </a>
          <a href="#products" className="glass rounded-full px-8 py-3 transition hover:border-neon-cyan/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            Our products
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 h-10 w-6 -translate-x-1/2 rounded-full border border-white/30">
        <motion.div animate={{ y: [6, 18, 6] }} transition={{ repeat: Infinity, duration: 1.8 }} className="mx-auto h-1.5 w-1.5 rounded-full bg-neon-cyan" />
      </div>
    </section>
  );
}
