import { ensureSchema, sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import UpvoteButton from "./ui/UpvoteButton";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
  let startup = startups[0];
  if (!startup) {
    // Check redirect slugs table and 301 if needed
    const rows = (await sql`SELECT startup_id FROM startup_slug_redirects WHERE slug = ${slug} LIMIT 1;`) as any[];
    if (rows.length) {
      const s = (await sql`SELECT * FROM startups WHERE id = ${rows[0].startup_id} LIMIT 1;`) as any[];
      if (s.length) {
        redirect(`/p/${s[0].slug}`);
      }
    }
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
          <nav className="mt-2 text-xs text-neutral-700" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1">
              <li><a className="hover:underline" href="/">Home</a></li>
              <li aria-hidden>›</li>
              <li><a className="hover:underline" href="/p">Projects</a></li>
              <li aria-hidden>›</li>
              <li aria-current="page">{startup.slug}</li>
            </ol>
          </nav>
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await ensureSchema();
  const rows = (await sql`SELECT name, description, slug, logo_url FROM startups WHERE slug = ${slug} LIMIT 1;`) as any[];
  if (!rows.length) return { title: `Project not found`, description: `The project you are looking for does not exist.`, alternates: { canonical: `/p/${slug}` } };
  const s = rows[0];
  const title = `${s.name}`;
  const desc = (s.description || '').toString().slice(0, 150) || `Updates and progress for ${s.name}`;
  const image = s.logo_url || '/logo.png';
  return {
    title,
    description: desc,
    alternates: { canonical: `/p/${s.slug}` },
    openGraph: {
      title,
      description: desc,
      url: `/p/${s.slug}`,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [image],
    },
  };
}
