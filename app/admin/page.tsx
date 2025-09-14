import { ensureSchema, sql } from '@/lib/db';

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
    LIMIT 10;
  `) as any[];

  const recentIssues = (await sql`
    SELECT i.id, i.title, i.issue_number, i.created_at,
           s.name AS startup_name, s.slug AS startup_slug,
           u.handle AS author_handle
    FROM issues i
    JOIN startups s ON s.id = i.startup_id
    JOIN users u ON u.id = i.user_id
    ORDER BY i.created_at DESC
    LIMIT 10;
  `) as any[];

  const startups = (await sql`
    SELECT s.id, s.name, s.slug, s.created_at,
      (SELECT COUNT(*)::int FROM issues i WHERE i.startup_id = s.id) as issue_count,
      (SELECT COUNT(*)::int FROM upvotes u WHERE u.target_type = 'startup'::vote_target AND u.target_id = s.id) as upvotes
    FROM startups s
    ORDER BY s.created_at DESC
    LIMIT 20;
  `) as any[];

  const topStartups = (await sql`
    SELECT s.name, s.slug, COALESCE(u_count.cnt, 0)::int AS upvotes
    FROM startups s
    LEFT JOIN (
      SELECT target_id, COUNT(*)::int AS cnt
      FROM upvotes WHERE target_type = 'startup'::vote_target GROUP BY target_id
    ) u_count ON u_count.target_id = s.id
    ORDER BY upvotes DESC NULLS LAST
    LIMIT 5;
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

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
          <h2 className="text-lg font-medium mb-3">Recent Signups</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-neutral-700">
                <tr>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Handle</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Joined</th>
                  <th className="py-2">Last login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/10">
                {recentUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="py-2 pr-3">{u.name || '—'}</td>
                    <td className="py-2 pr-3">{u.handle ? <a className="underline" href={`/u/${u.handle}`}>@{u.handle}</a> : '—'}</td>
                    <td className="py-2 pr-3">{u.email}</td>
                    <td className="py-2 pr-3">{formatDate(u.created_at)}</td>
                    <td className="py-2">{u.last_login ? formatDate(u.last_login) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Issues */}
        <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
          <h2 className="text-lg font-medium mb-3">Recent Updates</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-neutral-700">
                <tr>
                  <th className="py-2 pr-3">Title</th>
                  <th className="py-2 pr-3">Project</th>
                  <th className="py-2 pr-3">Author</th>
                  <th className="py-2">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/10">
                {recentIssues.map((i) => (
                  <tr key={i.id}>
                    <td className="py-2 pr-3">{i.title}</td>
                    <td className="py-2 pr-3"><a className="underline" href={`/p/${i.startup_slug}`}>{i.startup_name}</a> · #{i.issue_number}</td>
                    <td className="py-2 pr-3"><a className="underline" href={`/u/${i.author_handle}`}>@{i.author_handle}</a></td>
                    <td className="py-2">{formatDate(i.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Startups snapshot */}
        <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
          <h2 className="text-lg font-medium mb-3">Latest Startups</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-neutral-700">
                <tr>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Slug</th>
                  <th className="py-2 pr-3">Issues</th>
                  <th className="py-2 pr-3">Upvotes</th>
                  <th className="py-2">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/10">
                {startups.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-3">{s.name}</td>
                    <td className="py-2 pr-3">/{s.slug}</td>
                    <td className="py-2 pr-3">{s.issue_count}</td>
                    <td className="py-2 pr-3">{s.upvotes}</td>
                    <td className="py-2">{formatDate(s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">Top Startups (Upvotes)</h2>
            <ul className="space-y-2 text-sm">
              {topStartups.map((s: any) => (
                <li key={s.slug} className="flex items-center justify-between">
                  <a className="underline" href={`/p/${s.slug}`}>{s.name}</a>
                  <span className="text-neutral-800/80">⬆️ {s.upvotes}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-3">Top Profiles (Followers)</h2>
            <ul className="space-y-2 text-sm">
              {topUsers.map((u: any) => (
                <li key={u.handle} className="flex items-center justify-between">
                  <a className="underline" href={`/u/${u.handle}`}>{u.name || `@${u.handle}`}</a>
                  <span className="text-neutral-800/80">👥 {u.followers}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
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
