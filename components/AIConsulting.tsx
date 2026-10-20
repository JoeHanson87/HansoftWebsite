"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import ChatDemo from "./ChatDemo";

const steps = [
  { n: "01", t: "Audit", d: "We map how your business runs today and where hours quietly disappear." },
  { n: "02", t: "Identify quick wins", d: "We prioritise the AI opportunities with the clearest payback and lowest risk." },
  { n: "03", t: "Integrate workflows", d: "We build and connect AI tools into the systems your team already uses." },
  { n: "04", t: "Measure the savings", d: "We track time and cost saved so the benefit is visible, not assumed." },
];

const benefits = [
  { t: "Saves time", d: "takes over repetitive tasks like enquiries, bookings, data entry and follow-ups." },
  { t: "Always available", d: "customers get instant replies, even outside office hours." },
  { t: "Cuts costs", d: "get more done without adding headcount." },
  { t: "Fewer mistakes", d: "consistent handling means fewer errors and missed leads." },
  { t: "Scales with you", d: "copes with busy periods without extra effort." },
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
            <h3 className="text-2xl font-semibold">Would you like an <span className="text-gradient">AI agent</span> for your business?</h3>
            <p className="mt-3 text-white/65">
              Contact us and we will help make it a reality. An AI agent is a digital team member that handles routine work for you, around the clock.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {benefits.map((b) => (
                <li key={b.t}><span className="font-semibold text-neon-cyan">{b.t}:</span> {b.d}</li>
              ))}
            </ul>
            <a href="#contact" className="mt-6 inline-block rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta px-6 py-3 text-sm font-medium text-black transition hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]">
              Talk to us about an AI agent
            </a>
          </div>
          <div className="glass mt-6 rounded-2xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/50">Example AI chat</p>
            <ChatDemo />
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
