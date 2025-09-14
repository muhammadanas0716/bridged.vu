"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Mode = "all" | "following";

type FeedItem = {
  id: string;
  title: string;
  content: string;
  issue_number: number;
  created_at: string;
  startup_name: string;
  startup_slug: string;
  author_id: string;
  author_handle: string;
  author_name: string | null;
  is_following: boolean;
};

export default function Feed() {
  const [mode, setMode] = useState<Mode>("all");
  const [items, setItems] = useState<FeedItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [init, setInit] = useState(false);

  const limit = 10;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (mounted) setIsAuthed(!!data.user);
      } catch {
        if (mounted) setIsAuthed(false);
      } finally {
        if (mounted) setInit(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function load(reset = false) {
    setLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const res = await fetch(`/api/feed?mode=${mode}&limit=${limit}&offset=${currentOffset}`);
      const data = await res.json();
      const newItems: FeedItem[] = data.items || [];
      if (reset) {
        setItems(newItems);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
      setHasMore(newItems.length === limit);
      setOffset(currentOffset + newItems.length);
    } catch (e) {
      // noop; could set an error state
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!init) return;
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, init]);

  const canUseFollowing = isAuthed;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Public Feed</h1>
        <div className="inline-flex rounded-xl border border-neutral-900/30 bg-white/70 overflow-hidden">
          <button
            className={`px-3 py-1.5 text-sm ${mode === "all" ? "bg-neutral-900 text-white" : "hover:bg-neutral-900/5"}`}
            onClick={() => setMode("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1.5 text-sm ${mode === "following" ? "bg-neutral-900 text-white" : "hover:bg-neutral-900/5"} ${!canUseFollowing ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => canUseFollowing && setMode("following")}
            title={canUseFollowing ? "Show updates from creators you follow" : "Sign in to view Following"}
          >
            Following
          </button>
        </div>
      </div>
      <p className="text-neutral-800/80 text-sm">
        {mode === "all" ? "Latest updates from founders." : canUseFollowing ? "Updates from founders you follow." : "Sign in to see followed creators."}
      </p>

      <ul className="space-y-4">
        {items.map((i) => (
          <motion.li key={i.id} className="p-4 rounded-xl border border-neutral-900/20 bg-white/50" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-sm text-neutral-800/70">
              <Link href={`/u/${i.author_handle}`} className="hover:underline">@{i.author_handle}</Link>
              {i.is_following && (
                <span className="px-2 py-0.5 text-xs rounded-full border border-neutral-900/20 bg-neutral-900/5">Following</span>
              )}
              <span>·</span>
              <Link href={`/p/${i.startup_slug}`} className="hover:underline">{i.startup_name}</Link>
              <span>·</span>
              <span>#{i.issue_number}</span>
            </div>
            <div className="mt-1 font-medium">{i.title}</div>
            <p className="text-sm mt-1 whitespace-pre-wrap text-neutral-900/90">{i.content}</p>
          </motion.li>
        ))}
        {!loading && items.length === 0 && (
          <li className="text-sm text-neutral-800/70">No updates yet.</li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        <motion.button
          className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => load(false)}
          disabled={loading || !hasMore}
        >
          {loading ? "Loading..." : hasMore ? "Load more" : "No more"}
        </motion.button>
      </div>
    </div>
  );
}

