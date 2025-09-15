"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeHero({
  isAuthed,
  stats,
}: {
  isAuthed: boolean;
  stats: { startups: number; updates: number; upvotes: number };
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-neutral-900/20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm">
            <span>Open source</span>
            <span aria-hidden>•</span>
            <span>Build in public</span>
          </span>
        </motion.div>

        <motion.h1
          className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Share concise updates. Grow an audience. Build in public.
        </motion.h1>

        <motion.p
          className="mt-3 md:mt-4 max-w-2xl text-sm md:text-base text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Bridged.vu is a lightweight platform for founders to post short updates, get feedback, and rally early believers from day one.
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isAuthed ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-white/90 transition-colors"
              >
                Open Dashboard
              </Link>
              <a
                href="#public-feed"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 font-medium hover:bg-white/10 transition-colors"
              >
                Explore Feed
              </a>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-white/90 transition-colors"
              >
                Start Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 font-medium hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
              <a
                href="#public-feed"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 font-medium hover:bg-white/10 transition-colors"
              >
                Explore Feed
              </a>
            </>
          )}
        </motion.div>

        <motion.div
          className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3 md:p-4 max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Stat label="Startups" value={stats.startups} />
          <Stat label="Updates" value={stats.updates} />
          <Stat label="Upvotes" value={stats.upvotes} />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-semibold tabular-nums">{Intl.NumberFormat().format(value)}</div>
      <div className="mt-0.5 text-xs md:text-sm text-white/70">{label}</div>
    </div>
  );
}

