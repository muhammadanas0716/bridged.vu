"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toHtml } from "@/lib/markdown";

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  function surround(withStart: string, withEnd = withStart) {
    const ta = taRef.current;
    if (!ta) return;
    const { selectionStart, selectionEnd } = ta;
    const before = value.slice(0, selectionStart);
    const selected = value.slice(selectionStart, selectionEnd);
    const after = value.slice(selectionEnd);
    const newVal = `${before}${withStart}${selected || ""}${withEnd}${after}`;
    onChange(newVal);
    // restore selection around the inserted tokens
    requestAnimationFrame(() => {
      ta.focus();
      const start = selectionStart + withStart.length;
      const end = start + selected.length;
      ta.setSelectionRange(start, end);
    });
  }

  function toggleHeading(level: number) {
    const ta = taRef.current;
    if (!ta) return;
    const { selectionStart, selectionEnd } = ta;
    const lines = value.split("\n");
    // find start line index
    let startIdx = 0, endIdx = lines.length - 1, acc = 0;
    for (let i = 0; i < lines.length; i++) {
      const len = (lines[i]?.length ?? 0) + 1; // include newline
      if (acc + len > selectionStart) { startIdx = i; break; }
      acc += len;
    }
    // find end line index
    acc = 0;
    for (let i = 0; i < lines.length; i++) {
      const len = (lines[i]?.length ?? 0) + 1;
      if (acc + len > selectionEnd) { endIdx = i; break; }
      acc += len;
    }
    const prefix = "#".repeat(Math.max(1, Math.min(6, level))) + " ";
    for (let i = startIdx; i <= endIdx; i++) {
      const l = lines[i] ?? "";
      // remove existing heading markers first
      const stripped = l.replace(/^#{1,6}\s+/, "");
      lines[i] = prefix + stripped;
    }
    onChange(lines.join("\n"));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
      if (e.key.toLowerCase() === 'b') { e.preventDefault(); surround('**'); }
      if (e.key.toLowerCase() === 'i') { e.preventDefault(); surround('_'); }
      if (e.key.toLowerCase() === 'u') { e.preventDefault(); surround('++'); }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <ToolbarButton label="B" title="Bold (Ctrl/Cmd+B)" onClick={() => surround('**')} className="font-bold" />
        <ToolbarButton label="I" title="Italic (Ctrl/Cmd+I)" onClick={() => surround('_')} className="italic" />
        <ToolbarButton label="U" title="Underline (Ctrl/Cmd+U)" onClick={() => surround('++')} className="underline" />
        <span className="mx-1 text-neutral-800/30">·</span>
        <ToolbarButton label="H1" title="Heading 1" onClick={() => toggleHeading(1)} />
        <ToolbarButton label="H2" title="Heading 2" onClick={() => toggleHeading(2)} />
        <ToolbarButton label="H3" title="Heading 3" onClick={() => toggleHeading(3)} />
        <div className="ml-auto" />
        <ToolbarToggle
          active={showPreview}
          label={showPreview ? "Editing" : "Preview"}
          onClick={() => setShowPreview((v) => !v)}
        />
      </div>

      <AnimatePresence initial={false} mode="wait">
        {!showPreview ? (
          <motion.textarea
            key="editor"
            ref={taRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            rows={6}
            className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70 font-mono text-sm"
            placeholder="Short update... Use **bold**, _italic_, ++underline++, and # Headings"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          />
        ) : (
          <motion.div
            key="preview"
            className="w-full px-3 py-2 rounded-lg border border-neutral-900/30 bg-white/70 text-sm prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: toHtml(value) }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolbarButton({ label, onClick, title, className = "" }: { label: string; onClick: () => void; title?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded-lg border border-neutral-900/30 bg-white/70 hover:bg-neutral-900/5 text-sm ${className}`}
    >
      {label}
    </button>
  );
}

function ToolbarToggle({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 rounded-lg border text-sm ${active ? 'border-neutral-900 bg-white' : 'border-neutral-900/30 bg-white/70 hover:bg-neutral-900/5'}`}
    >
      {label}
    </button>
  );
}
