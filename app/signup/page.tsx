"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setSubmitting(true);
        setServerError(null);
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setServerError(data.error || "Signup failed");
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        setServerError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-start justify-center px-4 pt-8" role="main">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="inline-flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/logo.png"
                  alt="Bridged.vu logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
            Join Bridged.vu
          </h1>
          <p className="text-neutral-800/80 text-sm md:text-base">
            Bridge the gap between users and founders early on
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-900 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`
                w-full px-4 py-3 rounded-xl border transition-all duration-200
                bg-white/50 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-neutral-900/20
                ${
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-neutral-900/40 focus:border-neutral-900/60 hover:border-neutral-900/60"
                }
              `}
              placeholder="Enter your email"
            />
            {errors.email && (
              <motion.p
                className="mt-1 text-sm text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-900 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`
                w-full px-4 py-3 rounded-xl border transition-all duration-200
                bg-white/50 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-neutral-900/20
                ${
                  errors.password
                    ? "border-red-400 focus:border-red-500"
                    : "border-neutral-900/40 focus:border-neutral-900/60 hover:border-neutral-900/60"
                }
              `}
              placeholder="Create a password"
            />
            {errors.password && (
              <motion.p
                className="mt-1 text-sm text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutral-900 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`
                w-full px-4 py-3 rounded-xl border transition-all duration-200
                bg-white/50 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-neutral-900/20
                ${
                  errors.confirmPassword
                    ? "border-red-400 focus:border-red-500"
                    : "border-neutral-900/40 focus:border-neutral-900/60 hover:border-neutral-900/60"
                }
              `}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <motion.p
                className="mt-1 text-sm text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              type="submit"
              className="
                w-full px-6 py-3 rounded-xl
                bg-neutral-900 text-white
                hover:bg-neutral-800 
                transition-all duration-200
                font-medium
              "
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Account"}
            </motion.button>
            {serverError && (
              <motion.p className="mt-3 text-sm text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {serverError}
              </motion.p>
            )}
          </motion.div>
        </motion.form>

        {/* Login Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-neutral-800/80 text-sm">
            Already have an account?{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/login"
                className="
                  text-neutral-900 hover:opacity-80 transition-opacity duration-200
                  font-medium relative group
                "
              >
                Sign in
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.span>
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-8 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-900/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#faf3e0] text-neutral-800/60">
                or continue with
              </span>
            </div>
          </div>
        </motion.div>

        {/* Social Login Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <motion.button
            className="
              w-full px-4 py-3 rounded-xl border border-neutral-900/40
              bg-white/50 backdrop-blur-sm
              hover:bg-neutral-900/5 hover:border-neutral-900/60
              transition-all duration-200
              flex items-center justify-center gap-3
              font-medium text-neutral-900
            "
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </motion.button>

          <motion.button
            className="
              w-full px-4 py-3 rounded-xl border border-neutral-900/40
              bg-white/50 backdrop-blur-sm
              hover:bg-neutral-900/5 hover:border-neutral-900/60
              transition-all duration-200
              flex items-center justify-center gap-3
              font-medium text-neutral-900
            "
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <GitHubIcon className="w-5 h-5" />
            Continue with GitHub
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Google"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="currentColor"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

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
