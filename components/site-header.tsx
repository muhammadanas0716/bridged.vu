"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SiteHeader() {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  return (
    <motion.header
      className="min-h-[20vh] text-neutral-900"
      aria-label="FounderDiary header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Spacer to give the nav margin from the top while staying within the 70% section */}
      <div className="h-8 md:h-10" />

      {/* Nav container centered and constrained. Using ~70% width for the bar itself */}
      <div className="mx-auto w-[90vw] max-w-6xl">
        <motion.nav
          className="
            mx-auto w-full max-w-5xl
            flex items-center justify-between gap-4
            pb-3 md:pb-4
            border-b-2 border-neutral-800/40
            font-[family-name:var(--fd-nav-font)]
          "
          aria-label="Primary"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {/* Left: Logo image (rounded) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="FounderDiary home"
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/logo.png"
                  alt="FounderDiary logo"
                  width={40}
                  height={40}
                  className="rounded-md md:rounded-lg"
                  priority
                />
              </motion.div>
              <motion.span
                className="text-base md:text-lg tracking-tight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                FounderDiary
              </motion.span>
            </Link>
          </motion.div>

          {/* Middle: Slash-separated links */}
          <motion.div
            className="
              flex items-center gap-3 lg:gap-4
              text-sm lg:text-base
            "
            aria-label="Main navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="relative hover:opacity-80 transition-opacity duration-200 group"
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
            <span aria-hidden>/</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="relative hover:opacity-80 transition-opacity duration-200 group"
              >
                About
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
            <span aria-hidden>/</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/pricing"
                className="relative hover:opacity-80 transition-opacity duration-200 group"
              >
                Pricing
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Account Dropdown + Support (GitHub) */}
          <motion.div
            className="flex items-center gap-2 lg:gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Account Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="
                  inline-flex items-center gap-2
                  rounded-xl border border-neutral-900/40
                  px-3 py-1.5 text-sm lg:text-[0.95rem]
                  hover:bg-neutral-900/5 hover:border-neutral-900/60
                  transition-all duration-200
                "
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Account menu"
              >
                <UserIcon className="size-4 lg:size-5" />
                <span>Account</span>
                <motion.div
                  animate={{ rotate: isAccountDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="size-3 lg:size-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isAccountDropdownOpen && (
                  <motion.div
                    className="
                      absolute right-0 top-full mt-2 w-48
                      bg-white/95 backdrop-blur-md
                      border border-neutral-900/20
                      rounded-xl shadow-lg
                      py-2
                      z-50
                    "
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="/signup"
                        className="
                          block px-4 py-2 text-sm text-neutral-900
                          hover:bg-neutral-900/5 transition-colors duration-200
                        "
                        onClick={() => setIsAccountDropdownOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="/login"
                        className="
                          block px-4 py-2 text-sm text-neutral-900
                          hover:bg-neutral-900/5 transition-colors duration-200
                        "
                        onClick={() => setIsAccountDropdownOpen(false)}
                      >
                        Sign In
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="https://github.com/your-org/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  rounded-xl border border-neutral-900/40
                  px-3 py-1.5 text-sm lg:text-[0.95rem]
                  hover:bg-neutral-900/5 hover:border-neutral-900/60
                  transition-all duration-200
                "
                aria-label="Support on GitHub"
                title="Support (GitHub)"
              >
                <GitHubIcon className="size-4 lg:size-5" />
                <span>Support</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
}

/** Simple GitHub icon (no extra deps) */
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="GitHub"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="currentColor"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.8 2.72 1.28 3.38.98.11-.76.41-1.28.74-1.58-2.57-.29-5.28-1.29-5.28-5.77 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.51.12-3.14 0 0 .99-.32 3.25 1.2a11.3 11.3 0 0 1 5.92 0c2.26-1.52 3.25-1.2 3.25-1.2.65 1.63.24 2.84.12 3.14.76.82 1.22 1.87 1.22 3.15 0 4.5-2.72 5.47-5.31 5.76.42.36.8 1.07.8 2.16v3.2c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** User icon for account dropdown */
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="User"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="currentColor"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

/** Chevron down icon for dropdown indicator */
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Chevron down"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="currentColor"
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}
