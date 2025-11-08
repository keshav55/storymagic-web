"use client";

import { useState } from "react";
import InfiniteGallery from "@/components/InfiniteGallery";
import FeaturedStories from "@/components/FeaturedStories";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleImages = [
    { src: "/placeholder1.jpg", alt: "Story 1" },
    { src: "/placeholder2.jpg", alt: "Story 2" },
    { src: "/placeholder3.jpg", alt: "Story 3" },
    { src: "/placeholder4.jpg", alt: "Story 4" },
    { src: "/placeholder5.jpg", alt: "Story 5" },
    { src: "/placeholder6.jpg", alt: "Story 6" },
    { src: "/placeholder7.jpg", alt: "Story 7" },
    { src: "/placeholder8.jpg", alt: "Story 8" },
  ];

  const handleLogin = async (provider: "google" | "github" | "apple") => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed");
        setIsLoading(false);
        return;
      }

      const loginUrl =
        data.login_url ||
        data.url ||
        data.authorize_url ||
        data.auth_url ||
        (data.redirect && data.redirect.url);

      if (loginUrl) {
        window.location.href = loginUrl;
      } else {
        setError(
          `No login URL received. Response: ${JSON.stringify(data).substring(0, 100)}`
        );
        setIsLoading(false);
      }
    } catch (err) {
      setError(`Connection error: ${err instanceof Error ? err.message : "Unknown error"}`);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* 3D Gallery Hero */}
      <InfiniteGallery
        images={sampleImages}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full overflow-hidden"
      />

      {/* Overlay: Hero Text */}
      <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion">
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight text-white">
          <span className="italic">I create;</span> therefore I am
        </h1>
      </div>

      {/* Overlay: Auth Section */}
      <div className="pointer-events-auto fixed inset-0 z-20 flex flex-col items-center justify-end pb-20 px-4">
        <div className="max-w-md w-full space-y-4 bg-black/70 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-serif italic text-white">StoryMagic</h2>
            <p className="text-sm text-gray-400">
              Create compelling stories with AI-powered assistance
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleLogin("google")}
              disabled={isLoading}
              className="px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm"
              title="Sign in with Google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>

            <button
              onClick={() => handleLogin("github")}
              disabled={isLoading}
              className="px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm"
              title="Sign in with GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.002.07 1.527 1.031 1.527 1.031.89 1.529 2.341 1.546 2.914 1.194.092-.927.351-1.546.639-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.191 20 14.433 20 10.017 20 4.484 15.522 0 10 0z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </button>

            <button
              onClick={() => handleLogin("apple")}
              disabled={isLoading}
              className="px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 text-sm"
              title="Sign in with Apple"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 13.5c-.02-1.75.73-3.35 2.04-4.49-1.3-.95-2.96-1.5-4.77-1.5-3.9 0-7.08 2.54-7.08 5.68s3.18 5.68 7.08 5.68c1.81 0 3.47-.55 4.77-1.5-1.31-1.14-2.06-2.74-2.04-4.37z" />
              </svg>
              <span className="hidden sm:inline">Apple</span>
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <span className="text-sm">Signing in...</span>
            </div>
          )}

          <a
            href="/dashboard"
            className="block text-center text-xs text-gray-400 hover:text-gray-300 transition-colors pt-2 border-t border-white/10"
          >
            Skip to dashboard →
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="pointer-events-none fixed bottom-6 left-0 right-0 font-mono uppercase text-[11px] font-semibold text-center text-gray-500">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
      </div>

      {/* Featured Stories Section */}
      <FeaturedStories />
    </main>
  );
}
