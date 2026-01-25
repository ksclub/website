"use client";

import Link from "next/link";
import PostCard, { Post } from "./PostCard";

interface BoardLayoutProps {
  title: string;
  description: string;
  category: string;
  posts: Post[];
}

export default function BoardLayout({ title, description, category, posts }: BoardLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Total {posts.length} posts</span>
            </div>
            <button
              className="px-6 py-2.5 rounded-lg transition-colors text-sm font-medium"
              style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              onClick={() => alert("Login required to write a post")}
            >
              Write Post
            </button>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500 text-sm">Be the first to share something!</p>
            </div>
          )}

          {/* Pagination */}
          {posts.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <button className="px-3 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#111827', color: '#ffffff' }}
                >
                  1
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">2</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">3</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/community/our-brand"
              className="px-5 py-2 rounded-full text-sm transition-colors"
              style={category === "our-brand"
                ? { backgroundColor: '#111827', color: '#ffffff' }
                : { backgroundColor: '#f3f4f6', color: '#4b5563' }
              }
            >
              Our Brand
            </Link>
            <Link
              href="/community/life-style"
              className="px-5 py-2 rounded-full text-sm transition-colors"
              style={category === "life-style"
                ? { backgroundColor: '#111827', color: '#ffffff' }
                : { backgroundColor: '#f3f4f6', color: '#4b5563' }
              }
            >
              Life Style
            </Link>
            <Link
              href="/community/travel"
              className="px-5 py-2 rounded-full text-sm transition-colors"
              style={category === "travel"
                ? { backgroundColor: '#111827', color: '#ffffff' }
                : { backgroundColor: '#f3f4f6', color: '#4b5563' }
              }
            >
              Travel
            </Link>
            <Link
              href="/community/drama-movie"
              className="px-5 py-2 rounded-full text-sm transition-colors"
              style={category === "drama-movie"
                ? { backgroundColor: '#111827', color: '#ffffff' }
                : { backgroundColor: '#f3f4f6', color: '#4b5563' }
              }
            >
              Drama / Movie
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
