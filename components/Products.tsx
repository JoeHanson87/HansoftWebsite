import Reveal from "./Reveal";

function Dash({ accent }: { accent: string }) {
  return (
    <div className="relative h-52 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4">
      <div className="mb-3 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-white/20" />)}</div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => <div key={i} className="h-10 rounded bg-white/5" />)}
      </div>
      <div className="mt-3 flex h-20 items-end gap-1.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="w-full origin-bottom rounded-t" style={{ background: accent, opacity: 0.8, height: `${25 + ((i * 53) % 75)}%`, animation: `bar ${2.2 + (i % 4) * 0.5}s ease-in-out ${i * 0.12}s infinite` }} />
        ))}
      </div>
      <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent [animation:scan_5s_linear_infinite]" />
    </div>
  );
}

const items = [
  { t: "Your SaaS, launched", d: "Multi-tenant web apps with auth, billing and dashboards, built on a modern, scalable stack.", a: "linear-gradient(to top,#22d3ee,#8b5cf6)" },
  { t: "AI-powered tooling", d: "Assistants, document processing and workflow automation embedded directly into your product or operations.", a: "linear-gradient(to top,#8b5cf6,#e879f9)" },
];

export default function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-neon-cyan">Products</p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">SaaS that <span className="text-gradient">supports business</span></h2>
      </Reveal>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 0.15}>
            <div className="glass rounded-2xl p-6 transition hover:border-neon-violet/50 hover:shadow-[0_0_50px_rgba(139,92,246,0.25)]">
              <Dash accent={it.a} />
              <h3 className="mt-6 text-xl font-semibold">{it.t}</h3>
              <p className="mt-2 text-white/60">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
