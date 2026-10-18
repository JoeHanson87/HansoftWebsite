const items = ["Web SaaS", "AI Workflows", "Automation", "Custom Software", "Integration", "Cybersecurity Training", "Cost Savings", "Time Savings"];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="marquee-track flex gap-12 font-mono text-sm uppercase tracking-[0.3em] text-white/40">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">{t}<span className="text-neon-violet">✦</span></span>
        ))}
      </div>
    </div>
  );
}
