"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const steps = [
  { n: "01", t: "Audit", d: "We map how your business runs today and where hours quietly disappear." },
  { n: "02", t: "Identify quick wins", d: "We prioritise the AI opportunities with the clearest payback and lowest risk." },
  { n: "03", t: "Integrate workflows", d: "We build and connect AI tools into the systems your team already uses." },
  { n: "04", t: "Measure the savings", d: "We track time and cost saved so the benefit is visible, not assumed." },
];

export default function AIConsulting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="ai" className="relative overflow-hidden py-32">
      <div className="aurora right-0 top-20 h-[400px] w-[400px] bg-neon-violet" />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-neon-magenta">AI consulting</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Put AI to work <span className="text-gradient">in your business</span></h2>
          <p className="mt-6 text-lg text-white/65">
            AI should not be a buzzword. We help small businesses cut through the noise, adopt the tools that matter and turn them into measurable savings in time and money.
          </p>
          <div className="glass mt-10 rounded-2xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/50">Illustrative workflow</p>
            <div className="flex h-24 items-end gap-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="w-full origin-bottom rounded-t bg-gradient-to-t from-neon-violet to-neon-cyan" style={{ height: `${30 + ((i * 37) % 70)}%`, animation: `bar ${2 + (i % 5) * 0.4}s ease-in-out ${i * 0.1}s infinite` }} />
              ))}
            </div>
            <p className="mt-4 text-sm text-white/50">Less manual effort, more time for the work that grows your business.</p>
          </div>
        </Reveal>
        <div ref={ref} className="relative pl-10">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-white/10" />
          <motion.div style={{ height: h }} className="absolute left-3 top-0 w-px bg-gradient-to-b from-neon-cyan to-neon-magenta shadow-[0_0_12px_#22d3ee]" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[34px] top-1 flex h-4 w-4 rounded-full border-2 border-neon-cyan bg-background shadow-[0_0_14px_#22d3ee]" />
              <p className="font-mono text-sm text-neon-cyan">{s.n}</p>
              <h3 className="text-2xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-white/60">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
