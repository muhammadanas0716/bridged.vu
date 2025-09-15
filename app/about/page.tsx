"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-200px)] py-12">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-900/10 to-transparent blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-5xl px-4 md:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Hero */}
        <div className="mb-10 rounded-2xl border border-neutral-900/15 bg-white/70 p-6">
          <div className="flex flex-wrap gap-2">
            <Chip>Open‑source</Chip>
            <Chip>Nonprofit‑backed</Chip>
            <Chip>Built for early‑stage</Chip>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            About Bridged.vu
          </h1>
          <p className="mt-3 text-neutral-800/85 text-base md:text-lg max-w-3xl">
            Bridge the gap between users and founders early on. Share concise
            updates, grow an audience from day one, and build in public with
            signal over noise.
          </p>
        </div>

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

        {/* Principles */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
            Principles
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Card key={i}>
                <div className="text-xl" aria-hidden>
                  {p.icon}
                </div>
                <div className="mt-2 font-medium text-neutral-900">{p.title}</div>
                <p className="mt-1 text-sm text-neutral-800/85">{p.desc}</p>
              </Card>
            ))}
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
              <div className="flex size-10 items-center justify-center rounded-full border border-neutral-900/15 bg-white text-base font-semibold">
                B
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

const principles = [
  {
    title: "Authenticity",
    desc: "Honest progress over marketing fluff.",
    icon: "🪞",
  },
  { title: "Signal", desc: "Small, frequent updates > long, rare posts.", icon: "🔎" },
  { title: "Ownership", desc: "Your updates, your audience.", icon: "🔑" },
  { title: "Openness", desc: "Follow, upvote, and learn together.", icon: "🤝" },
] as const;
