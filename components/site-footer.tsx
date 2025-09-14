"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SiteFooter() {
  return (
    <motion.footer
      className="w-full mt-auto py-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
    >
      {/* Top horizontal line */}
      <div className="w-full border-t border-neutral-300/60 mb-2" />

      <div className="container mx-auto max-w-5xl px-2 sm:px-3">
        {/* Backed by nobody */}
        <motion.div
          className="text-center mb-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <p className="text-neutral-700/80 text-[10px] sm:text-xs font-medium">
            backed by nobody
          </p>
        </motion.div>

        {/* Links section */}
        <motion.nav
          className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-1.5 text-[10px] sm:text-xs"
          aria-label="Footer"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          <Link
            href="/terms"
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer transition-colors"
          >
            terms & conditions
          </Link>
          <span className="text-neutral-400 select-none">·</span>
          <Link
            href="/privacy"
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer transition-colors"
          >
            privacy policy
          </Link>
          <span className="text-neutral-400 select-none">·</span>
          <Link
            href="/llms.txt"
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            llms.txt
          </Link>
        </motion.nav>

        {/* Signature */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <p className="text-neutral-600 text-[10px] sm:text-xs">
            made with <span className="text-red-500">❤️</span>{" "}
            <span className="font-medium text-neutral-900">anas</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
