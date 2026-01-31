"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 korean-gradient korean-pattern-bg">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 card-hover">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold" style={{ color: "#2D2926" }}>
              Create Account
            </h1>
            <p className="mt-2" style={{ color: "#78716c" }}>
              Join Korean Slang Club today
            </p>
          </div>

          {error && (
            <div
              className="mb-4 p-4 rounded-lg text-sm"
              style={{
                backgroundColor: "#C8102E15",
                color: "#C8102E",
                border: "1px solid #C8102E30",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  border: "1px solid #e7e5e4",
                  backgroundColor: "#FAF9F6",
                }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  border: "1px solid #e7e5e4",
                  backgroundColor: "#FAF9F6",
                }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  border: "1px solid #e7e5e4",
                  backgroundColor: "#FAF9F6",
                }}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  border: "1px solid #e7e5e4",
                  backgroundColor: "#FAF9F6",
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50 hover:scale-[1.02]"
              style={{ backgroundColor: "#C8102E", color: "#ffffff" }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p style={{ color: "#78716c" }}>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium transition-colors hover:underline"
                style={{ color: "#C8102E" }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
