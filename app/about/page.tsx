"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-12 md:py-16">
      <motion.div
        className="max-w-5xl mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            className="text-5xl mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            👋
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900 tracking-tight">
            About <span className="text-yellow-600">FounderDiary</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-light">
            A platform for authentic entrepreneurial storytelling, built by{" "}
            <span className="font-medium text-yellow-600">Muhammad Anas</span>
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-neutral-200/50 shadow-lg mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 font-mono">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-700 max-w-4xl mx-auto leading-relaxed">
              FounderDiary exists to democratize entrepreneurial storytelling.
              We believe every founder's journey— with its challenges,
              breakthroughs, and lessons learned—deserves to be shared and
              celebrated.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white/60 rounded-xl p-6 border border-neutral-200/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900 font-mono">
                Documentation
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Comprehensive project documentation, technical decisions, and
                development logs—beyond just success metrics.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/60 rounded-xl p-6 border border-neutral-200/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900 font-mono">
                Community
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                A collaborative network where developers and entrepreneurs share
                code, insights, and build together through open source
                contributions.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/60 rounded-xl p-6 border border-neutral-200/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900 font-mono">
                Knowledge Sharing
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Technical insights, architecture decisions, and practical
                lessons from building scalable applications.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* About the Creator */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                About the Creator
              </h2>
            </div>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Hi, I'm <span className="font-semibold">Muhammad Anas</span>—a
                17-year-old developer passionate about building meaningful
                digital experiences. While my peers focus on typical teenage
                pursuits, I'm dedicated to creating platforms that solve real
                problems.
              </p>
              <p>
                My journey into development began with curiosity and has evolved
                into a commitment to crafting software that empowers others.
                FounderDiary represents my belief that powerful ideas can come
                from anywhere, regardless of age.
              </p>
              <p>
                Every aspect of this platform reflects my dedication to clean
                code, thoughtful design, and meaningful impact in the
                entrepreneurial community.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <h3 className="font-semibold text-lg mb-3 text-neutral-900 flex items-center gap-2">
                <span className="text-xl">⚡</span> Technical Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-neutral-700 border border-neutral-200/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200/50 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <h3 className="font-semibold text-lg mb-2 text-neutral-900 flex items-center gap-2">
                <span className="text-xl">🎯</span> Philosophy
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                "Great software combines technical excellence with
                human-centered design to create meaningful impact."
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200/50 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <h3 className="font-semibold text-lg mb-2 text-neutral-900 flex items-center gap-2">
                <span className="text-xl">🚀</span> Vision
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                To build platforms that empower entrepreneurs to share their
                authentic stories and inspire others.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-neutral-200/50 shadow-lg mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">
            Project Overview
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200/50"
            >
              <div className="text-3xl font-bold mb-2 text-neutral-900">17</div>
              <div className="text-neutral-600 font-medium">Developer Age</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200/50"
            >
              <div className="text-3xl font-bold mb-2 text-neutral-900">
                100%
              </div>
              <div className="text-neutral-600 font-medium">Open Source</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200/50"
            >
              <div className="text-3xl font-bold mb-2 text-neutral-900">
                Modern
              </div>
              <div className="text-neutral-600 font-medium">Tech Stack</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200/50"
            >
              <div className="text-3xl font-bold mb-2 text-neutral-900">
                Global
              </div>
              <div className="text-neutral-600 font-medium">Community</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Open Source Philosophy */}
        <motion.div
          className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 md:p-12 border border-gray-200/50 shadow-lg mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">🔓</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Open Source Commitment
            </h2>
            <p className="text-lg text-neutral-700 max-w-4xl mx-auto leading-relaxed">
              FounderDiary is built with transparency at its core. Every line of
              code, design decision, and feature development is open for the
              community to inspect, contribute to, and learn from.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white/60 rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-semibold text-lg mb-3 text-neutral-900">
                Transparency
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Complete visibility into development processes, decisions, and
                roadmap planning.
              </p>
            </motion.div>
            <motion.div
              className="bg-white/60 rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-semibold text-lg mb-3 text-neutral-900">
                Collaboration
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Welcoming contributions from developers worldwide who share our
                vision.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 border border-yellow-200/50 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
            Join Our Community
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you're an entrepreneur with a story to share, a developer
            interested in contributing, or someone passionate about authentic
            storytelling—we welcome you to be part of this journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-neutral-800 transition-all duration-200 shadow-lg"
              >
                Start Your Story
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="https://github.com/your-org/founderdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-neutral-300 text-neutral-900 px-8 py-4 rounded-xl font-medium hover:bg-neutral-50 transition-all duration-200 shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source Code
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <p className="text-neutral-600 text-lg">
            Crafted with dedication and attention to detail by Muhammad Anas
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
