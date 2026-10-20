"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const script = [
  { from: "user", text: "Hi, do you have any availability this Thursday?" },
  { from: "agent", text: "Yes! I have 10:00 and 14:30 free. Which suits you?" },
  { from: "user", text: "14:30 please." },
  { from: "agent", text: "Booked ✓ I've sent a confirmation to your email. Anything else I can help with?" },
] as const;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(script.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        setShown(0);
        setTyping(false);
        await sleep(800);
        for (let i = 0; i < script.length; i++) {
          if (cancelled) return;
          if (script[i].from === "agent") {
            setTyping(true);
            await sleep(1200);
            if (cancelled) return;
            setTyping(false);
          } else {
            await sleep(900);
            if (cancelled) return;
          }
          setShown(i + 1);
          await sleep(1000);
        }
        await sleep(3500);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, reduced]);

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet text-xs font-bold text-black">AI</span>
        <div>
          <p className="text-sm font-medium">Hansoft Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" /> Online
          </p>
        </div>
      </div>
      <div className="flex h-64 flex-col justify-end gap-3 overflow-hidden px-4 py-4">
        <AnimatePresence initial={false}>
          {script.slice(0, shown).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, x: m.from === "user" ? 16 : -16 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                m.from === "user"
                  ? "self-end rounded-br-sm bg-gradient-to-r from-neon-cyan to-neon-violet text-black"
                  : "self-start rounded-bl-sm bg-white/10 text-white/85"
              }`}
            >
              {m.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-white/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-sm text-white/30">Type a message…</div>
    </div>
  );
}
