"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UpvoteButton({ targetType, targetId, initialCount, disabled }: { targetType: "startup" | "issue"; targetId: string; initialCount: number; disabled?: boolean }) {
  const [count, setCount] = useState(initialCount || 0);
  const [pending, setPending] = useState(false);

  async function toggle() {
    if (disabled) return;
    try {
      setPending(true);
      const res = await fetch("/api/upvotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_type: targetType, target_id: targetId }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setCount((c) => (data.upvoted ? c + 1 : Math.max(0, c - 1)));
    } finally {
      setPending(false);
    }
  }

  return (
    <motion.button
      onClick={toggle}
      disabled={disabled || pending}
      className="flex flex-col items-center justify-center gap-1 rounded-xl border border-neutral-900/20 bg-white/80 hover:bg-white px-2.5 py-2 text-[12px] leading-none"
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-neutral-900">⬆️</span>
      <span className="text-neutral-900/80">{count}</span>
    </motion.button>
  );
}

