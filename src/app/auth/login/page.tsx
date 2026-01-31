"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 card-hover">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: '#C8102E15', color: '#C8102E' }}>
          Welcome
        </span>
        <h1 className="text-2xl font-bold" style={{ color: '#2D2926' }}>Welcome Back</h1>
        <p className="mt-2" style={{ color: '#78716c' }}>Sign in to your account</p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg text-sm"
             style={{ backgroundColor: '#C8102E15', color: '#C8102E', border: '1px solid #C8102E30' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#2D2926' }}>
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
              border: '1px solid #e7e5e4',
              backgroundColor: '#FAF9F6'
            }}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#2D2926' }}>
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
              border: '1px solid #e7e5e4',
              backgroundColor: '#FAF9F6'
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
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p style={{ color: '#78716c' }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium transition-colors hover:underline" style={{ color: '#C8102E' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 korean-gradient korean-pattern-bg">
      <div className="max-w-md w-full">
        <Suspense fallback={
          <div className="bg-white rounded-2xl p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4"
                 style={{ borderColor: '#e7e5e4', borderTopColor: '#C8102E' }}></div>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
