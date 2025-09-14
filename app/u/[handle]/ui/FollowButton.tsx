"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FollowButton({ profileId, disabled }: { profileId: string; disabled?: boolean }) {
  const [following, setFollowing] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);

  async function toggle() {
    if (disabled) return;
    try {
      setPending(true);
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ following_user_id: profileId }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setFollowing(data.following);
    } finally {
      setPending(false);
    }
  }

  return (
    <motion.button onClick={toggle} disabled={disabled || pending} className="px-3 py-1.5 rounded-lg border border-neutral-900/30 bg-white/70 hover:bg-neutral-900/5 text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      {following ? "Following" : "Follow"}
    </motion.button>
  );
}

