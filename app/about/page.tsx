"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-200px)] py-12">

      <motion.div
        className="mx-auto max-w-5xl px-4 md:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Hero (dark gradient like home) */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-neutral-900/20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
          {/* Ambient orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative p-6 md:p-10">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm">
                <span>Open‑source</span>
                <span aria-hidden>•</span>
                <span>Nonprofit‑backed</span>
                <span aria-hidden>•</span>
                <span>Built for early‑stage</span>
              </span>
            </motion.div>
            <motion.h1
              className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About Bridged.vu
            </motion.h1>
            <motion.p
              className="mt-3 md:mt-4 max-w-3xl text-sm md:text-base text-white/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Bridge the gap between users and founders early on. Share concise updates, grow an audience from day one, and build in public with signal over noise.
            </motion.p>

            <motion.div
              className="mt-5 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-white/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 font-medium hover:bg-white/10 transition-colors"
              >
                Explore the Feed
              </Link>
              <a
                href="https://github.com/muhammadanas0716/bridged.vu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 font-medium hover:bg-white/10 transition-colors"
              >
                View Source
              </a>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((h, i) => (
            <Card key={i}>
              <div className="text-2xl" aria-hidden>
                {h.icon}
              </div>
              <div className="mt-2 font-medium text-neutral-900">{h.title}</div>
              <p className="mt-1 text-sm text-neutral-800/80">{h.desc}</p>
            </Card>
          ))}
        </section>

        {/* What & Why */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Section
            title="What is Bridged.vu?"
            body={
              <p>
                A lightweight platform for founders to publish short, frequent
                updates about their startup journey, and for users to discover,
                follow, and support projects before launch.
              </p>
            }
          />
          <Section
            title="Why it exists"
            body={
              <p>
                Early traction is hard. Bridged.vu focuses on authentic progress
                over polished launches—helping founders validate ideas and
                engage early users without the overhead of a full content stack.
              </p>
            }
          />
        </section>

        {/* How it works */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
            How it works
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {howItWorks.map((s, i) => (
              <Card key={i}>
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-7 items-center justify-center rounded-full border border-neutral-900/20 bg-white text-xs font-semibold text-neutral-900">
                    {i + 1}
                  </span>
                  <span className="text-lg" aria-hidden>
                    {s.icon}
                  </span>
                </div>
                <div className="mt-2 font-medium text-neutral-900">{s.k}</div>
                <div className="mt-1 text-sm text-neutral-800/80">{s.v}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* About Me */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">About Me</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 items-center">
            <div className="rounded-2xl overflow-hidden border border-neutral-900/15 bg-white/70">
              <Image
                src="/profile.png"
                alt="Muhammad Anas"
                width={900}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="rounded-2xl border border-neutral-900/15 bg-white/70 p-5">
              <div className="space-y-3 text-sm text-neutral-800/90">
                <p className="text-base text-neutral-900">
                  Hi, I’m <span className="font-medium">Muhammad Anas</span> — a 16‑year‑old developer based in Abu Dhabi.
                </p>
                <p>
                  I’ve been building since I was 12. I love ML, open‑source tools, dev‑productivity things, and I’m super into finance and quant.
                  I absolutely love math and, well, physics and I have an "it’s complicated" relationship.
                </p>
                <p className="italic text-neutral-700">
                  Little joke break: If my code compiles on the first try, I get suspicious. If it’s physics, I get flashbacks.
                </p>
                <p>
                  I’m shipping small, learning fast, and building tools I wish existed. If you’ve got feedback or ideas, I’m all ears.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <CTA href="https://github.com/muhammadanas0716" secondary external>
                    GitHub
                  </CTA>
                  <CTA href="https://www.linkedin.com/in/muhammadanas0716/" secondary external>
                    LinkedIn
                  </CTA>
                  <CTA href="https://x.com/MuhammadAnas707" secondary external>
                    X
                  </CTA>
                  <CTA href="https://bridged.vu" secondary external>
                    Bridged.vu
                  </CTA>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nonprofit status */}
        <section className="mt-10">
          <div className="rounded-2xl border border-neutral-900/15 bg-white/70 p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden>🏛️</span>
              <div>
                <h3 className="font-semibold text-neutral-900">Nonprofit status</h3>
                <p className="mt-1 text-sm text-neutral-800/85">
                  bridged.vu operates under fiscal sponsorship by The Hack Foundation (dba Hack Club), a 501(c)(3) public charity. This means we receive the benefits of nonprofit status while Hack Club provides the legal and financial umbrella. EIN 81-2908499. See details on our <a href="/nonprofit" className="underline">nonprofit</a> page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who's building this */}
        <section className="mt-10">
          <div className="rounded-2xl border border-neutral-900/15 bg-white/70 p-5">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full border border-neutral-900/15 bg-white overflow-hidden">
                <Image src="/logo.png" alt="Bridged.vu logo" width={48} height={48} className="object-contain" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-900">Bridged.vu</div>
                <p className="text-sm text-neutral-800/80">
                  Built by an indie maker to help founders share momentum early. Open to feedback and contributions.
                </p>
              </div>
              <div className="flex gap-2">
                <CTA href="https://github.com/muhammadanas0716/bridged.vu" secondary external>
                  GitHub
                </CTA>
                <CTA href="/signup" primary>
                  Join
                </CTA>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <CTA href="/signup" primary>
            Get Started
          </CTA>
          <CTA href="/" secondary>
            Explore the Feed
          </CTA>
          <CTA
            href="https://github.com/muhammadanas0716/bridged.vu"
            secondary
            external
          >
            View Source
          </CTA>
        </div>
      </motion.div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-900/15 bg-white/70 p-4">
      {children}
    </div>
  );
}

function Section({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-neutral-900/15 bg-white/70 p-5"
    >
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <div className="mt-2 text-neutral-800/85 text-sm leading-relaxed">
        {body}
      </div>
    </motion.section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-900/15 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}

function CTA({
  href,
  children,
  primary,
  secondary,
  external,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  external?: boolean;
}) {
  const cls = primary
    ? "bg-neutral-900 text-white hover:bg-neutral-800"
    : "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-50";
  const base =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium transition-colors";
  const content = <span>{children}</span>;
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${cls}`}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={`${base} ${cls}`}>
      {content}
    </Link>
  );
}

const highlights = [
  {
    title: "Build in public",
    desc: "Share short, frequent progress updates that compound over time.",
    icon: "📢",
  },
  {
    title: "Grow early believers",
    desc: "Collect followers and upvotes to validate direction early.",
    icon: "🌱",
  },
  {
    title: "Lightweight by design",
    desc: "Minimal surface area so you can focus on shipping.",
    icon: "🧭",
  },
] as const;

const howItWorks = [
  {
    k: "Create your startup",
    v: "Add a name, short description, and optional link.",
    icon: "🚀",
  },
  {
    k: "Publish concise updates",
    v: "Ship small. Share learnings with numbered updates per startup.",
    icon: "✍️",
  },
  {
    k: "Build early supporters",
    v: "Users follow and upvote—signal compounds over time.",
    icon: "📈",
  },
] as const;

// (Principles removed per request; replaced with personal About Me section)
