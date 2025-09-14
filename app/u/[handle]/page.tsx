import { ensureSchema, sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import FollowButton from "./ui/FollowButton";

export default async function UserPage({ params }: { params: Promise<{ handle: string }> }) {
  await ensureSchema();
  const { handle } = await params;
  const viewer = await getCurrentUser();

  const users = (await sql`SELECT id, email, name, handle, bio, created_at FROM users WHERE handle = ${handle} LIMIT 1;`) as any[];
  const profile = users[0];
  if (!profile) return <div className="py-12">User not found</div>;

  const startups = (await sql`
    SELECT s.*, COALESCE(u_count.cnt, 0) as upvotes
    FROM startups s
    LEFT JOIN (
      SELECT target_id, COUNT(*)::int AS cnt FROM upvotes WHERE target_type = 'startup'::vote_target GROUP BY target_id
    ) u_count ON u_count.target_id = s.id
    WHERE s.user_id = ${profile.id}
    ORDER BY s.created_at DESC;
  `) as any[];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{profile.name || profile.handle}</h1>
          <p className="text-neutral-800/80">@{profile.handle}</p>
        </div>
        <FollowButton profileId={profile.id} disabled={!viewer || viewer.id === profile.id} />
      </div>
      <div>
        <h2 className="text-lg font-medium mb-3">Startups</h2>
        <ul className="space-y-3">
          {startups.map((s) => (
            <li key={s.id} className="flex items-center justify-between p-3 rounded-xl border border-neutral-900/20 bg-white/50">
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
          {startups.length === 0 && <li className="text-sm text-neutral-800/70">No startups yet</li>}
        </ul>
      </div>
    </div>
  );
}
