"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UpvoteButton({ targetType, targetId, initialCount, disabled }: { targetType: "startup" | "issue"; targetId: string; initialCount: number; disabled?: boolean }) {
  const [count, setCount] = useState(initialCount);
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
    <motion.button onClick={toggle} disabled={disabled || pending} className="px-3 py-1.5 rounded-lg border border-neutral-900/30 bg-white/70 hover:bg-neutral-900/5 text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      ⬆️ {count}
    </motion.button>
  );
}

