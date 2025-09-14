import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center space-y-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">Page not found</h1>
          <p className="text-neutral-800/80 mt-1">
            The page you’re looking for doesn’t exist or may have moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800"
          >
            Go home
          </Link>
          <Link
            href="/nonprofit"
            className="px-4 py-2 rounded-lg border border-neutral-900/30 hover:bg-neutral-900/5"
          >
            Nonprofit status
          </Link>
        </div>
      </div>
    </div>
  );
}

