"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CreateStartupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!name.trim()) {
      setMessage("Name is required");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, website_url: website, logo_url: logo }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to create startup");
      } else {
        setMessage(`Created ${data.startup.name}`);
        setName("");
        setDescription("");
        setWebsite("");
        setLogo("");
        try {
          const confetti = (await import("canvas-confetti")).default;
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" placeholder="Acme Inc." />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" rows={3} placeholder="What are you building?" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Website</label>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm mb-1">Logo URL</label>
          <input value={logo} onChange={(e) => setLogo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70" placeholder="https://.../logo.png" />
        </div>
      </div>
      <div>
        <motion.button type="submit" className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} disabled={submitting}>
          {submitting ? "Creating..." : "Create Startup"}
        </motion.button>
      </div>
      {message && <p className="text-sm text-neutral-800/80">{message}</p>}
    </motion.form>
  );
}
