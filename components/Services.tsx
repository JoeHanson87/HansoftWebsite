"use client";

import { useRef } from "react";
import Reveal from "./Reveal";

const items = [
  { icon: "◈", title: "Web SaaS products", body: "We design, build and run subscription web applications that help businesses operate smarter, from idea to launch and beyond.", c: "34,211,238" },
  { icon: "✦", title: "AI consulting & integration", body: "Hands-on help for small businesses to find where AI fits, wire it into existing workflows and realise genuine time and cost savings.", c: "139,92,246" },
  { icon: "⬡", title: "Custom software & support", body: "Bespoke websites and apps tailored to your needs, with dependable ongoing support for the software you already rely on.", c: "232,121,249" },
];

function Card({ icon, title, body, c }: (typeof items)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 10}deg)`;
    el.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(${c},0.22), rgba(255,255,255,0.02) 60%)`;
  };
  const leave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.background = "";
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="glass h-full rounded-2xl p-8 transition-transform duration-200">
      <div className="mb-6 text-4xl" style={{ color: `rgb(${c})`, textShadow: `0 0 24px rgb(${c})` }}>{icon}</div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-white/60">{body}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-neon-cyan">What we do</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">Software and AI, <span className="text-gradient">built around you</span></h2>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.12}><Card {...it} /></Reveal>
        ))}
      </div>
    </section>
  );
}
