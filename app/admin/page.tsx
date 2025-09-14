import { ensureSchema, sql } from '@/lib/db';
import AdminTabs from './ui/AdminTabs';

type CountRow = { c: string };

export default async function AdminPage() {
  await ensureSchema();

  const usersCount = ((await sql`SELECT COUNT(*)::text AS c FROM users;`) as any[])[0]?.c || '0';
  const startupsCount = ((await sql`SELECT COUNT(*)::text AS c FROM startups;`) as any[])[0]?.c || '0';
  const issuesCount = ((await sql`SELECT COUNT(*)::text AS c FROM issues;`) as any[])[0]?.c || '0';
  const upvotesCount = ((await sql`SELECT COUNT(*)::text AS c FROM upvotes;`) as any[])[0]?.c || '0';
  const followsCount = ((await sql`SELECT COUNT(*)::text AS c FROM follows;`) as any[])[0]?.c || '0';

  const recentUsers = (await sql`
    SELECT u.id, u.email, u.name, u.handle, u.created_at,
           (
             SELECT MAX(created_at) FROM sessions s WHERE s.user_id = u.id
           ) AS last_login
    FROM users u
    ORDER BY u.created_at DESC
    LIMIT 200;
  `) as any[];

  const recentIssues = (await sql`
    SELECT i.id, i.title, i.issue_number, i.created_at,
           s.name AS startup_name, s.slug AS startup_slug,
           u.handle AS author_handle
    FROM issues i
    JOIN startups s ON s.id = i.startup_id
    JOIN users u ON u.id = i.user_id
    ORDER BY i.created_at DESC
    LIMIT 200;
  `) as any[];

  const latestStartups = (await sql`
    SELECT s.id, s.name, s.slug, s.created_at,
      (SELECT COUNT(*)::int FROM issues i WHERE i.startup_id = s.id) as issue_count,
      (SELECT COUNT(*)::int FROM upvotes u WHERE u.target_type = 'startup'::vote_target AND u.target_id = s.id) as upvotes
    FROM startups s
    ORDER BY s.created_at DESC
    LIMIT 500;
  `) as any[];

  const topStartups = (await sql`
    SELECT s.name, s.slug, COALESCE(u_count.cnt, 0)::int AS upvotes
    FROM startups s
    LEFT JOIN (
      SELECT target_id, COUNT(*)::int AS cnt
      FROM upvotes WHERE target_type = 'startup'::vote_target GROUP BY target_id
    ) u_count ON u_count.target_id = s.id
    ORDER BY upvotes DESC NULLS LAST
    LIMIT 500;
  `) as any[];

  const topUsers = (await sql`
    SELECT u.name, u.handle, COALESCE(f_count.cnt, 0)::int AS followers
    FROM users u
    LEFT JOIN (
      SELECT following_user_id, COUNT(*)::int AS cnt FROM follows GROUP BY following_user_id
    ) f_count ON f_count.following_user_id = u.id
    ORDER BY followers DESC NULLS LAST
    LIMIT 5;
  `) as any[];

  return (
    <div className="space-y-8" role="main">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Admin Dashboard</h1>
        <p className="text-neutral-800/80 text-sm">Read-only overview of users, startups, and activity.</p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Users" value={usersCount} />
        <StatCard label="Startups" value={startupsCount} />
        <StatCard label="Issues" value={issuesCount} />
        <StatCard label="Upvotes" value={upvotesCount} />
        <StatCard label="Follows" value={followsCount} />
      </section>

      <AdminTabs
        recentUsers={recentUsers}
        recentIssues={recentIssues}
        latestStartups={latestStartups}
        topStartups={topStartups}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
      <div className="text-xs text-neutral-700 mb-1">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}
