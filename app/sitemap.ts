import type { MetadataRoute } from 'next';
import { ensureSchema, sql } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  await ensureSchema();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'hourly' as const, priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${base}/login`, changeFrequency: 'yearly' as const, priority: 0.1 },
    { url: `${base}/signup`, changeFrequency: 'yearly' as const, priority: 0.1 },
  ];

  const startups = (await sql`SELECT slug, created_at FROM startups ORDER BY created_at DESC LIMIT 5000;`) as any[];
  const users = (await sql`SELECT handle, created_at FROM users WHERE handle IS NOT NULL LIMIT 5000;`) as any[];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...startups.map((s) => ({
      url: `${base}/p/${s.slug}`,
      lastModified: new Date(s.created_at),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...users.map((u) => ({
      url: `${base}/u/${u.handle}`,
      lastModified: new Date(u.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
