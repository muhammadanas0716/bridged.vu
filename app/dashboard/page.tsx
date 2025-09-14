import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ensureSchema, sql } from "@/lib/db";
import DashboardTabs from "./ui/DashboardTabs";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Welcome, {user.name || user.email}</h1>
        <p className="text-neutral-800/80">Create your startup, publish concise updates, and manage your profile.</p>
      </div>
      <DashboardTabs user={user} startups={startups} issues={issues} />
    </div>
  );
}
