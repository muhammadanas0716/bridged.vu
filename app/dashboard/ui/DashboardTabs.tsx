"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateStartupForm from "./CreateStartupForm";
import CreateIssueForm from "./CreateIssueForm";
import { useNotifications } from "@/components/notifications";

type Startup = { id: string; name: string; slug: string; description?: string | null; website_url?: string | null; upvotes?: number };
type Issue = { id: string; issue_number: number; title: string; content: string; startup_name: string; startup_slug: string };
type User = { id: string; email: string; name?: string | null; handle?: string | null };

export default function DashboardTabs({ user, startups, issues }: { user: User; startups: Startup[]; issues: Issue[] }) {
  const [tab, setTab] = useState<"overview" | "startups" | "profile">("overview");
  // Local state so newly created startups reflect immediately in the UI
  const [startupsState, setStartupsState] = useState<Startup[]>(startups);
  return (
    <div className="space-y-8">
      <TabBar tab={tab} onChange={setTab} />
      <AnimatePresence mode="wait">
        {tab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Overview
              startups={startupsState}
              issues={issues}
              onStartupCreated={(s) => setStartupsState((prev) => [s, ...prev])}
            />
          </motion.div>
        )}
        {tab === "startups" && (
          <motion.div key="startups" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <StartupsManager
              startups={startupsState}
              onStartupUpdated={(updated) =>
                setStartupsState((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...updated, upvotes: s.upvotes } : s)))
              }
              onStartupDeleted={(deletedId) =>
                setStartupsState((prev) => prev.filter((s) => s.id !== deletedId))
              }
            />
          </motion.div>
        )}
        {tab === "profile" && (
          <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <ProfileForm user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabBar({ tab, onChange }: { tab: string; onChange: (t: any) => void }) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "startups", label: "Startups" },
    { key: "profile", label: "Profile" },
  ] as const;
  return (
    <div className="inline-flex rounded-xl border border-neutral-900/30 bg-white/70 overflow-hidden">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`px-4 py-2 text-sm transition-colors ${tab === t.key ? "bg-neutral-900 text-white" : "hover:bg-neutral-900/5"}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Overview({ startups, issues, onStartupCreated }: { startups: Startup[]; issues: Issue[]; onStartupCreated: (s: Startup) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
        <h2 className="text-lg font-medium mb-3">Create a Startup</h2>
        <CreateStartupForm onCreated={onStartupCreated} />
      </div>
      <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
        <h2 className="text-lg font-medium mb-3">Write an Update</h2>
        <CreateIssueForm startups={startups} />
      </div>
      <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
        <h3 className="text-base font-medium mb-3">Your Startups</h3>
        <ul className="space-y-3">
          {startups.map((s) => (
            <li key={s.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-neutral-800/70">/{s.slug}</div>
              </div>
              <div className="text-sm">⬆️ {s.upvotes || 0}</div>
            </li>
          ))}
          {startups.length === 0 && <li className="text-sm text-neutral-800/70">No startups yet</li>}
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
          {issues.length === 0 && <li className="text-sm text-neutral-800/70">No updates yet</li>}
        </ul>
      </div>
    </div>
  );
}

function StartupsManager({ startups, onStartupUpdated, onStartupDeleted }: { startups: Startup[]; onStartupUpdated: (s: Startup) => void; onStartupDeleted: (id: string) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{ name: string; description: string; website_url: string; logo_url: string }>({ name: "", description: "", website_url: "", logo_url: "" });
  const { notify } = useNotifications();

  function startEdit(s: Startup) {
    setEditingId(s.id);
    setForm({ name: s.name || "", description: s.description || "", website_url: s.website_url || "", logo_url: (s as any).logo_url || "" });
  }
  async function save() {
    if (!editingId) return;
    const res = await fetch('/api/startups', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) });
    const data = await res.json();
    if (!res.ok) notify({ title: 'Failed to update startup', description: data.error || undefined, type: 'error' });
    else {
      notify({ title: 'Startup updated', description: data.startup.name, type: 'success' });
      onStartupUpdated(data.startup);
      setEditingId(null);
    }
  }

  async function remove(id: string) {
    if (!id) return;
    const ok = typeof window !== 'undefined' ? window.confirm('Delete this startup and all its updates? This cannot be undone.') : true;
    if (!ok) return;
    try {
      const res = await fetch('/api/startups', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      const data = await res.json();
      if (!res.ok) notify({ title: 'Failed to delete startup', description: data.error || undefined, type: 'error' });
      else {
        notify({ title: 'Startup deleted', type: 'success' });
        onStartupDeleted(id);
        if (editingId === id) setEditingId(null);
      }
    } catch (e) {
      notify({ title: 'Failed to delete startup', type: 'error' });
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-800/80">Update your startup details. You can also manage issues from the public page.</p>
      <ul className="space-y-3">
        {startups.map((s) => (
          <li key={s.id} className="rounded-xl border border-neutral-900/20 bg-white/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-neutral-800/70">/{s.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/p/${s.slug}`} className="text-sm underline underline-offset-2">Manage issues</a>
                <button className="text-sm rounded-lg border px-3 py-1 hover:bg-neutral-900/5" onClick={() => startEdit(s)}>Edit</button>
                <button className="text-sm rounded-lg border px-3 py-1 hover:bg-red-50 text-red-600 border-red-200" onClick={() => remove(s.id)}>Delete</button>
              </div>
            </div>
            {editingId === s.id && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Name</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs mb-1">Website</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs mb-1">Description</label>
                  <textarea className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800" onClick={save}>Save</button>
                  <button className="px-4 py-2 rounded-lg border hover:bg-neutral-900/5" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            )}
          </li>
        ))}
        {startups.length === 0 && <li className="text-sm text-neutral-800/70">No startups yet</li>}
      </ul>
    </div>
  );
}

function ProfileForm({ user }: { user: User }) {
  const { notify } = useNotifications();
  const [profile, setProfile] = useState({ name: user.name || "", handle: user.handle || "", email: user.email });
  const [pwd, setPwd] = useState({ current: "", n1: "", n2: "" });

  async function saveProfile() {
    const res = await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    const data = await res.json();
    if (!res.ok) notify({ title: 'Failed to update profile', description: data.error || undefined, type: 'error' });
    else notify({ title: 'Profile updated', type: 'success' });
  }
  async function changePassword() {
    if (!pwd.current || !pwd.n1 || !pwd.n2) return notify({ title: 'Fill all password fields', type: 'error' });
    if (pwd.n1 !== pwd.n2) return notify({ title: 'New passwords do not match', type: 'error' });
    const res = await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current_password: pwd.current, new_password: pwd.n1 }) });
    const data = await res.json();
    if (!res.ok) notify({ title: 'Failed to change password', description: data.error || undefined, type: 'error' });
    else {
      notify({ title: 'Password changed', type: 'success' });
      setPwd({ current: '', n1: '', n2: '' });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
        <h3 className="text-base font-medium mb-3">Profile</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1">Display name</label>
            <input className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs mb-1">Username/handle</label>
            <input className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={profile.handle || ''} onChange={(e) => setProfile({ ...profile, handle: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800" onClick={saveProfile}>Save profile</button>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl border border-neutral-900/20 bg-white/50">
        <h3 className="text-base font-medium mb-3">Change password</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1">Current password</label>
            <input type="password" className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1">New password</label>
              <input type="password" className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={pwd.n1} onChange={(e) => setPwd({ ...pwd, n1: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs mb-1">Confirm new password</label>
              <input type="password" className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" value={pwd.n2} onChange={(e) => setPwd({ ...pwd, n2: e.target.value })} />
            </div>
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800" onClick={changePassword}>Update password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
