"use client";

import Reveal from "./Reveal";

const EMAIL = "info@hansoftindustries.co.uk";

export default function Contact() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\nFrom: ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Website enquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
  };
  const field = "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]";
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="aurora left-1/4 top-10 h-[400px] w-[400px] bg-neon-cyan" />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-neon-cyan">Contact</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Ready to <span className="text-gradient">get started?</span></h2>
          <p className="mt-6 text-lg text-white/65">Tell us about your business and we will suggest where software or AI can help most.</p>
          <ul className="mt-8 space-y-3 text-white/80">
            <li><a href={`mailto:${EMAIL}`} className="hover:text-neon-cyan">{EMAIL}</a></li>
            <li><a href="tel:07738902906" className="hover:text-neon-cyan">07738 902906</a></li>
            <li>Kent, United Kingdom</li>
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-8">
            <input name="name" required placeholder="Your name" className={field} />
            <input name="email" type="email" required placeholder="Email address" className={field} />
            <textarea name="message" required rows={5} placeholder="How can we help?" className={field} />
            <button className="w-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta py-3 font-medium text-black transition hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]">
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
