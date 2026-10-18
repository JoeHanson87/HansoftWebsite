import Reveal from "./Reveal";

const courses = [
  ["AI for small business", "Practical, jargon-free sessions on using AI tools safely and effectively."],
  ["Cybersecurity awareness", "Equip your team to spot threats and protect your digital assets."],
  ["IT skills training", "Build confidence with the tools and systems your business depends on."],
];

export default function Training() {
  return (
    <section id="training" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-neon-magenta">Training</p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">Upskill <span className="text-gradient">your team</span></h2>
      </Reveal>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {courses.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="group flex flex-col gap-2 py-8 transition hover:pl-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-2xl font-semibold transition group-hover:text-neon-cyan">{t}</h3>
              <p className="max-w-md text-white/60">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
