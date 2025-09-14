"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import UpvoteButton from "./UpvoteButton";

type Mode = "all" | "following";

type FeedItem = {
  id: string;
  title: string;
  content: string;
  issue_number: number;
  created_at: string;
  startup_name: string;
  startup_slug: string;
  startup_website_url?: string | null;
  author_id: string;
  author_handle: string;
  author_name: string | null;
  is_following: boolean;
  upvotes: number;
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((i) => (
          <motion.div key={i.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-2xl border border-neutral-900/15 bg-white/70 hover:bg-white/90 transition-colors">
            <div className="p-4 md:p-5 h-full flex flex-col">
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <UpvoteButton targetType="issue" targetId={i.id} initialCount={i.upvotes || 0} disabled={!isAuthed} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-neutral-900 truncate">{i.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-800/70">
                    <Link href={`/u/${i.author_handle}`} className="hover:underline">@{i.author_handle}</Link>
                    <FollowInline
                      following={i.is_following}
                      disabled={!isAuthed}
                      onToggle={async () => {
                        const ok = await toggleFollow(i.author_id);
                        if (ok) {
                          setItems((prev) => prev.map((it) => it.author_id === i.author_id ? { ...it, is_following: !it.is_following } : it));
                        }
                      }}
                    />
                    <span>·</span>
                    <Link href={`/p/${i.startup_slug}`} className="hover:underline">{i.startup_name}</Link>
                    <span>·</span>
                    <span>#{i.issue_number}</span>
                    <span>·</span>
                    <span>{timeAgo(i.created_at)}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-3 text-neutral-900/90 line-clamp-3">{i.content}</p>
              <div className="mt-4 flex items-center gap-2">
                {i.startup_website_url && (
                  <a
                    href={normUrl(i.startup_website_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-neutral-900/20 hover:bg-neutral-900/5 text-sm"
                  >
                    Visit website
                  </a>
                )}
                <Link href={`/p/${i.startup_slug}`} className="px-3 py-1.5 rounded-lg border border-neutral-900/20 hover:bg-neutral-900/5 text-sm">View</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {!loading && items.length === 0 && (
        <div className="text-sm text-neutral-800/70">No updates yet.</div>
      )}

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

function timeAgo(iso: string) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}

async function toggleFollow(authorId: string) {
  try {
    const res = await fetch('/api/follow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ following_user_id: authorId }) });
    if (!res.ok) return false;
    return true;
  } catch {
    return false;
  }
}

function normUrl(url?: string | null) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function FollowInline({ following, onToggle, disabled }: { following: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`ml-1 px-2 py-0.5 rounded-full border text-[11px] ${following ? 'border-neutral-900/20 bg-neutral-900/5' : 'border-neutral-900/30 hover:bg-neutral-900/5'}`}
      title={following ? 'Unfollow' : 'Follow'}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
}
