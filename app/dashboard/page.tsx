import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ensureSchema, sql } from "@/lib/db";
import CreateStartupForm from "./ui/CreateStartupForm";
import CreateIssueForm from "./ui/CreateIssueForm";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await ensureSchema();

  const startups = (await sql`
    SELECT s.*, COALESCE(u_count.cnt, 0) as upvotes
    FROM startups s
    LEFT JOIN (
      SELECT target_id, COUNT(*)::int AS cnt FROM upvotes WHERE target_type = 'startup'::vote_target GROUP BY target_id
    ) u_count ON u_count.target_id = s.id
    WHERE s.user_id = ${user.id}
    ORDER BY s.created_at DESC;
  `) as any[];

  const issues = (await sql`
    SELECT i.*, s.name as startup_name, s.slug as startup_slug
    FROM issues i
    JOIN startups s ON s.id = i.startup_id
    WHERE i.user_id = ${user.id}
    ORDER BY i.created_at DESC
    LIMIT 10;
  `) as any[];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Welcome, {user.name || user.email}</h1>
        <p className="text-neutral-800/80">Create your startup and start publishing concise daily updates.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
          <h2 className="text-lg font-medium mb-3">Create a Startup</h2>
          <CreateStartupForm />
        </div>

        <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
          <h2 className="text-lg font-medium mb-3">Write an Update</h2>
          <CreateIssueForm startups={startups} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
          <h3 className="text-base font-medium mb-3">Your Startups</h3>
          <ul className="space-y-3">
            {startups.map((s) => (
              <li key={s.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-neutral-800/70">/{s.slug}</div>
                  {s.website_url && (
                    <a
                      href={s.website_url.startsWith('http') ? s.website_url : `https://${s.website_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-900 underline underline-offset-2 hover:opacity-80"
                    >
                      {s.website_url}
                    </a>
                  )}
                </div>
                <div className="text-sm">⬆️ {s.upvotes}</div>
              </li>
            ))}
            {startups.length === 0 && (
              <li className="text-sm text-neutral-800/70">No startups yet</li>
            )}
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
          <h3 className="text-base font-medium mb-3">Recent Updates</h3>
          <ul className="space-y-3">
            {issues.map((i) => (
              <li key={i.id}>
                <div className="text-sm text-neutral-800/70">{i.startup_name} · #{i.issue_number}</div>
                <div className="font-medium">{i.title}</div>
              </li>
            ))}
            {issues.length === 0 && (
              <li className="text-sm text-neutral-800/70">No updates yet</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
