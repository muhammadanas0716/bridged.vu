import { ensureSchema, sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import UpvoteButton from "./ui/UpvoteButton";

export default async function StartupPage({ params }: { params: Promise<{ slug: string }> }) {
  await ensureSchema();
  const { slug } = await params;
  const user = await getCurrentUser();

  const startups = (await sql`
    SELECT s.*, COALESCE(u_count.cnt, 0) as upvotes
    FROM startups s
    LEFT JOIN (
      SELECT target_id, COUNT(*)::int AS cnt FROM upvotes WHERE target_type = 'startup'::vote_target GROUP BY target_id
    ) u_count ON u_count.target_id = s.id
    WHERE s.slug = ${slug}
    LIMIT 1;
  `) as any[];
  const startup = startups[0];
  if (!startup) {
    return <div className="py-12">Startup not found</div>;
  }

  const issues = (await sql`SELECT * FROM issues WHERE startup_id = ${startup.id} ORDER BY created_at DESC;`) as any[];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{startup.name}</h1>
          <p className="text-neutral-800/80">{startup.description}</p>
          {startup.website_url && (
            <p className="mt-1 text-sm">
              <a href={startup.website_url.startsWith('http') ? startup.website_url : `https://${startup.website_url}`}
                 target="_blank" rel="noopener noreferrer"
                 className="text-neutral-900 underline underline-offset-2 hover:opacity-80">
                {startup.website_url}
              </a>
            </p>
          )}
        </div>
        <UpvoteButton targetType="startup" targetId={startup.id} initialCount={startup.upvotes} disabled={!user} />
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Updates</h2>
        <ul className="space-y-4">
          {issues.map((i) => (
            <li key={i.id} className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
              <div className="text-sm text-neutral-800/70">#{i.issue_number}</div>
              <div className="font-medium">{i.title}</div>
              <p className="text-sm mt-1 whitespace-pre-wrap">{i.content}</p>
            </li>
          ))}
          {issues.length === 0 && (
            <li className="text-sm text-neutral-800/70">No updates published yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
