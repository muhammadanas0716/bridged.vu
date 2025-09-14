"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#faf3e0] text-neutral-900 antialiased">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-xl text-center space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">Something went wrong</h1>
              <p className="text-neutral-800/80 mt-1">
                An unexpected error occurred. Please try again.
              </p>
              {process.env.NODE_ENV !== 'production' && error?.digest && (
                <p className="text-xs text-neutral-700 mt-2">Error ID: {error.digest}</p>
              )}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Try again
              </button>
              <Link
                href="/"
                className="px-4 py-2 rounded-lg border border-neutral-900/30 hover:bg-neutral-900/5"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

