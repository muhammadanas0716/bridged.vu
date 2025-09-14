"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNotifications } from "@/components/notifications";

type Startup = { id: string; name: string; slug: string };

export default function CreateIssueForm({ startups }: { startups: Startup[] }) {
  const { notify } = useNotifications();
  const [startupId, setStartupId] = useState(startups[0]?.id || "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!startupId || !title.trim() || !content.trim()) {
      setMessage("Please fill all fields");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startup_id: startupId, title, content, publish: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        notify({ title: "Failed to publish update", description: data.error || undefined, type: "error" });
      } else {
        notify({ title: "Update published", description: `#${data.issue.issue_number}`, type: "success" });
        setTitle("");
        setContent("");
        try {
          const confetti = (await import("canvas-confetti")).default;
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        } catch {}
      }
    } catch (err) {
      notify({ title: "Something went wrong", type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Startup</label>
        <select value={startupId} onChange={(e) => setStartupId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70">
          {startups.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" placeholder="Today I shipped..." />
      </div>
      <div>
        <label className="block text-sm mb-1">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" rows={5} placeholder="Short update..." />
      </div>
      <div>
        <motion.button type="submit" className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} disabled={submitting || startups.length === 0}>
          {submitting ? "Publishing..." : "Publish Update"}
        </motion.button>
      </div>
      {startups.length === 0 && (
        <p className="text-sm text-neutral-800/70">Create a startup first.</p>
      )}
      {message && <p className="text-sm text-red-600">{message}</p>}
    </motion.form>
  );
}
