"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <motion.div
        className="mx-auto max-w-5xl px-4 md:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            About Bridged.vu
          </h1>
          <p className="mt-3 text-neutral-800/80 text-base md:text-lg max-w-3xl">
            Bridge the gap between users and founders early on. Share concise updates, grow an audience from day one, and build in public with signal over noise.
          </p>
        </div>

        <hr className="border-neutral-900/20" />

        {/* Overview */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Section
            title="What is Bridged.vu?"
            body={
              <p>
                A lightweight platform for founders to publish short, frequent updates about their startup journey, and for users to discover, follow, and support projects before launch.
              </p>
            }
          />
          <Section
            title="Why it exists"
            body={
              <p>
                Early traction is hard. Bridged.vu focuses on authentic progress over polished launches—helping founders validate ideas and engage early users without the overhead of a full content stack.
              </p>
            }
          />
        </div>

        {/* How it works */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">How it works</h2>
          <ol className="mt-4 space-y-3">
            {[
              {
                k: "Create your startup",
                v: "Add a name, short description, and optional link.",
              },
              {
                k: "Publish concise updates",
                v: "Ship small. Share learnings and progress with issues numbered per startup.",
              },
              {
                k: "Build early supporters",
                v: "Users can follow you and upvote updates—signal compounds over time.",
              },
            ].map((s, i) => (
              <li key={i} className="pl-4 border-l-2 border-neutral-900/20">
                <div className="text-neutral-900 font-medium">
                  {i + 1}. {s.k}
                </div>
                <div className="text-neutral-800/80 text-sm mt-0.5">{s.v}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* Principles */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Section
            title="Principles"
            body={
              <ul className="list-disc pl-5 space-y-2 text-neutral-800/90">
                <li>
                  <span className="font-medium text-neutral-900">Authenticity:</span> honest progress over marketing fluff.
                </li>
                <li>
                  <span className="font-medium text-neutral-900">Signal:</span> small, frequent updates &gt; long, rare posts.
                </li>
                <li>
                  <span className="font-medium text-neutral-900">Ownership:</span> your updates, your audience.
                </li>
                <li>
                  <span className="font-medium text-neutral-900">Openness:</span> follow, upvote, and learn together.
                </li>
              </ul>
            }
          />
          <Section
            title="Built with care"
            body={
              <p>
                Bridged.vu is open-source and thoughtfully minimal. It uses Next.js, TypeScript, Tailwind, and a clean design system to stay fast and approachable.
              </p>
            }
          />
        </div>

        {/* Call to action */}
        <div className="mt-14 flex flex-col sm:flex-row gap-3">
          <CTA href="/signup" primary>
            Get Started
          </CTA>
          <CTA href="/" secondary>
            Explore the Feed
          </CTA>
          <CTA href="https://github.com/your-org/your-repo" secondary external>
            View Source
          </CTA>
        </div>
      </motion.div>
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
      className="rounded-xl border border-neutral-900/20 bg-white/60 p-5"
    >
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <div className="mt-2 text-neutral-800/85 text-sm leading-relaxed">{body}</div>
    </motion.section>
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
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${cls}`}>
      {content}
    </a>
  ) : (
    <Link href={href} className={`${base} ${cls}`}>
      {content}
    </Link>
  );
}

