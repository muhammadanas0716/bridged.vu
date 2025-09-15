export const dynamic = "force-dynamic";
export const metadata = {
  title: "Bridged.vu — Public Feed",
  description: "Latest updates from founders building in public on Bridged.vu.",
  alternates: { canonical: "/" },
};

import Feed from "./ui/Feed";
import HomeHero from "./ui/HomeHeroClient";
import { ensureSchema, sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();
  await ensureSchema();
  let counts = { startups: 0, updates: 0, upvotes: 0 };
  try {
    const [s, i, u] = (await Promise.all([
      sql`SELECT COUNT(*)::int as c FROM startups;`,
      sql`SELECT COUNT(*)::int as c FROM issues;`,
      sql`SELECT COUNT(*)::int as c FROM upvotes;`,
    ])) as any[];
    counts = {
      startups: s[0]?.c || 0,
      updates: i[0]?.c || 0,
      upvotes: u[0]?.c || 0,
    };
  } catch {}

  return (
    <div className="space-y-8">
      <HomeHero isAuthed={!!user} stats={counts} />

      {/* <section
        id="how-it-works"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {howItWorks.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-neutral-900/20 bg-white/70 p-4"
          >
            <div className="text-2xl">{step.icon}</div>
            <div className="mt-2 font-medium">{step.title}</div>
            <div className="mt-1 text-sm text-neutral-800/80">{step.desc}</div>
          </div>
        ))}
      </section>

      <section id="public-feed" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Public Feed</h2>
          <a
            href="#top"
            className="text-sm underline underline-offset-2 opacity-70 hover:opacity-100"
          >
            Back to top
          </a>
        </div>
        <Feed />
      </section> */}
    </div>
  );
}

const howItWorks = [
  {
    title: "Create your startup",
    desc: "Set up your page in seconds with name, logo, and a short description.",
    icon: "🚀",
  },
  {
    title: "Publish concise updates",
    desc: "Share short, frequent progress notes. Keep momentum high.",
    icon: "✍️",
  },
  {
    title: "Grow your following",
    desc: "Collect upvotes, followers, and feedback from early believers.",
    icon: "📈",
  },
] as const;
