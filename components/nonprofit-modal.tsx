"use client";

import { useEffect, useRef, useState } from "react";
import { NONPROFIT } from "@/content/nonprofit";

export default function NonprofitModalTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-neutral-900/40 px-3 py-1.5 text-sm hover:bg-neutral-900/5 hover:border-neutral-900/60 transition-all duration-200"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Our Non profit Status
      </button>
      {open && <NonprofitModal onClose={() => setOpen(false)} />}
    </>
  );
}

function NonprofitModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);
  const lastRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            (last as HTMLElement).focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            (first as HTMLElement).focus();
            e.preventDefault();
          }
        }
      }
    }
    document.addEventListener('keydown', onKey);
    firstRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const n = NONPROFIT;

  function printModal() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" aria-labelledby="np-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div ref={dialogRef} className="relative w-[92vw] max-w-2xl rounded-2xl bg-white p-5 border border-neutral-900/20 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <h2 id="np-title" className="text-lg md:text-xl font-semibold">bridged.vu nonprofit status</h2>
          <button ref={firstRef} className="rounded-lg border px-2 py-1 text-sm hover:bg-neutral-900/5" onClick={onClose} aria-label="Close">Close</button>
        </div>
        <div className="mt-3 space-y-3 text-sm text-neutral-900/90">
          <p>bridged.vu is fiscally sponsored by The Hack Foundation (dba Hack Club), a 501(c)(3) public charity.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>EIN:</strong> {n.ein}</li>
            <li><strong>Legal address:</strong> {n.addressLine1}, {n.addressLocality}, {n.addressRegion} {n.postalCode}</li>
            <li><strong>Phone:</strong> 855-625-4225</li>
            <li>Learn more at <a className="underline" href={n.website} target="_blank" rel="noopener noreferrer">hackclub.com</a></li>
          </ul>
          <details className="rounded-lg border border-neutral-900/20 p-3">
            <summary className="cursor-pointer font-medium">What does fiscally sponsored mean?</summary>
            <p className="mt-2">bridged.vu is not its own standalone 501(c)(3). Instead, The Hack Foundation (dba Hack Club), a 501(c)(3) public charity, serves as our sponsor, extending its nonprofit status to our project and handling compliance and back-office support.</p>
          </details>
          <details className="rounded-lg border border-neutral-900/20 p-3">
            <summary className="cursor-pointer font-medium">Are donations tax-deductible?</summary>
            <p className="mt-2">Donations made to bridged.vu through our fiscal sponsor are generally tax-deductible in the U.S., subject to donor circumstances. Please consult a tax advisor.</p>
          </details>
          <details className="rounded-lg border border-neutral-900/20 p-3">
            <summary className="cursor-pointer font-medium">Where can I verify this information?</summary>
            <p className="mt-2">See Hack Club’s official site and nonprofit directories for The Hack Foundation (EIN 81-2908499).</p>
          </details>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <a href="/nonprofit" className="px-3 py-1.5 rounded-lg border border-neutral-900/20 hover:bg-neutral-900/5 text-sm">Open full page</a>
          <button ref={lastRef} onClick={printModal} className="px-3 py-1.5 rounded-lg border border-neutral-900/20 hover:bg-neutral-900/5 text-sm">Print</button>
        </div>
      </div>
    </div>
  );
}
