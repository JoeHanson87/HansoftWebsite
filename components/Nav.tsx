"use client";

import { useEffect, useState } from "react";

const links = [
  ["Services", "#services"],
  ["AI Consulting", "#ai"],
  ["Products", "#products"],
  ["Training", "#training"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-x-0 border-t-0" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-lg font-semibold tracking-tight">
          <span className="text-neon-cyan">&lt;</span>Hansoft<span className="text-neon-magenta"> Industries</span><span className="text-neon-cyan">/&gt;</span>
        </a>
        <ul className="hidden gap-8 text-sm text-white/70 md:flex">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className="transition hover:text-neon-cyan">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="rounded-full border border-neon-violet/60 px-5 py-2 text-sm transition hover:bg-neon-violet/20 hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]">
          Get in touch
        </a>
      </nav>
    </header>
  );
}
