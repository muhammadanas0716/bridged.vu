"use client";

import { useState } from "react";

export default function AdminTabs({
  recentUsers,
  recentIssues,
  latestStartups,
  topStartups,
}: {
  recentUsers: any[];
  recentIssues: any[];
  latestStartups: any[];
  topStartups: any[];
}) {
  const [tab, setTab] = useState<"signups" | "updates" | "startups" | "top">(
    "signups"
  );

  const tabs = [
    { key: "signups", label: "Recent Signups" },
    { key: "updates", label: "Recent Updates" },
    { key: "startups", label: "Latest Startups" },
    { key: "top", label: "Top Startups (Upvotes)" },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-xl border border-neutral-900/30 bg-white/70 overflow-hidden">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`px-4 py-2 text-sm transition-colors ${
              tab === t.key ? "bg-neutral-900 text-white" : "hover:bg-neutral-900/5"
            }`}
            onClick={() => setTab(t.key as any)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "signups" && <SignupsTable rows={recentUsers} />}
      {tab === "updates" && <UpdatesTable rows={recentIssues} />}
      {tab === "startups" && <StartupsTable rows={latestStartups} />}
      {tab === "top" && <TopStartupsTable rows={topStartups} />}
    </div>
  );
}

function SignupsTable({ rows }: { rows: any[] }) {
  return (
    <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
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
            {rows.map((u) => (
              <tr key={u.id}>
                <td className="py-2 pr-3">{u.name || "—"}</td>
                <td className="py-2 pr-3">
                  {u.handle ? (
                    <a className="underline" href={`/u/${u.handle}`}>
                      @{u.handle}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-2 pr-3">{u.email}</td>
                <td className="py-2 pr-3">{formatDate(u.created_at)}</td>
                <td className="py-2">{u.last_login ? formatDate(u.last_login) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UpdatesTable({ rows }: { rows: any[] }) {
  return (
    <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
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
            {rows.map((i) => (
              <tr key={i.id}>
                <td className="py-2 pr-3">{i.title}</td>
                <td className="py-2 pr-3">
                  <a className="underline" href={`/p/${i.startup_slug}`}>
                    {i.startup_name}
                  </a>{" "}
                  · #{i.issue_number}
                </td>
                <td className="py-2 pr-3">
                  <a className="underline" href={`/u/${i.author_handle}`}>
                    @{i.author_handle}
                  </a>
                </td>
                <td className="py-2">{formatDate(i.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StartupsTable({ rows }: { rows: any[] }) {
  return (
    <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
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
            {rows.map((s) => (
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
  );
}

function TopStartupsTable({ rows }: { rows: any[] }) {
  return (
    <div className="rounded-xl border border-neutral-900/20 bg-white/60 p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-neutral-700">
            <tr>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Slug</th>
              <th className="py-2">Upvotes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900/10">
            {rows.map((s) => (
              <tr key={s.slug}>
                <td className="py-2 pr-3">
                  <a className="underline" href={`/p/${s.slug}`}>
                    {s.name}
                  </a>
                </td>
                <td className="py-2 pr-3">/{s.slug}</td>
                <td className="py-2">{s.upvotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

