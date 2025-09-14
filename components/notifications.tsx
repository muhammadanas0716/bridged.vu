"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";
type Toast = {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number; // ms
};

type Ctx = {
  notify: (t: Omit<Toast, "id">) => void;
};

const NotificationsCtx = createContext<Ctx | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationsCtx);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}

export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, any>>({});

  const remove = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const notify = useCallback((t: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    const toast: Toast = { id, duration: 3000, type: "info", ...t };
    setToasts((list) => [toast, ...list].slice(0, 5));
    timers.current[id] = setTimeout(() => remove(id), toast.duration);
  }, [remove]);

  useEffect(() => () => {
    Object.values(timers.current).forEach(clearTimeout);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationsCtx.Provider value={value}>
      {children}
      {/* Container in top-right */}
      <div className="pointer-events-none fixed top-4 right-4 z-[1000] flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`pointer-events-auto w-80 max-w-[85vw] rounded-xl border shadow-md backdrop-blur bg-white/95 ${
                t.type === "success"
                  ? "border-green-600/30"
                  : t.type === "error"
                  ? "border-red-600/30"
                  : "border-neutral-900/20"
              }`}
            >
              <div className="p-3">
                <div className="flex items-start gap-2">
                  <div className={`mt-1 size-2 rounded-full ${
                    t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-neutral-700"
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-neutral-900">{t.title}</div>
                    {t.description && (
                      <div className="text-[13px] text-neutral-800/80 mt-0.5">{t.description}</div>
                    )}
                  </div>
                  <button
                    className="ml-2 text-neutral-900/60 hover:text-neutral-900"
                    onClick={() => remove(t.id)}
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationsCtx.Provider>
  );
}

