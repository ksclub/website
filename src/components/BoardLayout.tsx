"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PostCard from "./PostCard";
import { postApi, Post, Pagination } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface BoardLayoutProps {
  title: string;
  description: string;
  category: string;
}

export default function BoardLayout({ title, description, category }: BoardLayoutProps) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await postApi.getAll(category, currentPage, 9, token || undefined);
        setPosts(data.posts);
        setPagination(data.pagination);
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [category, currentPage, token]);

  const handleWriteClick = () => {
    if (!user) {
      router.push("/auth/login?redirect=/community/write?category=" + category);
      return;
    }
    router.push(`/community/write?category=${category}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <section className="korean-gradient korean-pattern-bg py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                  style={{ backgroundColor: '#C8102E15', color: '#C8102E' }}>
              Community
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2D2926' }}>
              {title}
            </h1>
            <p style={{ color: '#57534e' }}>{description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: '#78716c' }}>
                Total {pagination?.total || 0} posts
              </span>
            </div>
            <button
              className="px-6 py-2.5 rounded-lg transition-all text-sm font-medium hover:scale-105"
              style={{ backgroundColor: '#C8102E', color: '#ffffff' }}
              onClick={handleWriteClick}
            >
              Write Post
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-[#C8102E]"
                   style={{ borderColor: '#e7e5e4', borderTopColor: '#C8102E' }}></div>
              <p className="mt-4" style={{ color: '#78716c' }}>Loading posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-16">
              <p style={{ color: '#C8102E' }}>{error}</p>
              <button
                onClick={() => setCurrentPage(1)}
                className="mt-4 px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: '#C8102E' }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} category={category} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && posts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#C8102E15' }}>
                <svg className="w-8 h-8" style={{ color: '#C8102E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: '#2D2926' }}>No posts yet</h3>
              <p className="text-sm" style={{ color: '#78716c' }}>Be the first to share something!</p>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <button
                  className="px-3 py-2 disabled:opacity-50 transition-colors"
                  style={{ color: '#a8a29e' }}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className="px-4 py-2 rounded-lg text-sm transition-colors"
                    style={
                      currentPage === page
                        ? { backgroundColor: '#C8102E', color: '#ffffff' }
                        : { color: '#57534e' }
                    }
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="px-3 py-2 disabled:opacity-50 transition-colors"
                  style={{ color: '#57534e' }}
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
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
      <section className="py-8 border-t" style={{ borderColor: '#e7e5e4' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/community/our-brand"
              className="px-5 py-2 rounded-full text-sm transition-all hover:scale-105"
              style={category === "our-brand"
                ? { backgroundColor: '#C8102E', color: '#ffffff' }
                : { backgroundColor: '#f5f5f4', color: '#57534e' }
              }
            >
              Our Brand
            </Link>
            <Link
              href="/community/life-style"
              className="px-5 py-2 rounded-full text-sm transition-all hover:scale-105"
              style={category === "life-style"
                ? { backgroundColor: '#C8102E', color: '#ffffff' }
                : { backgroundColor: '#f5f5f4', color: '#57534e' }
              }
            >
              Life Style
            </Link>
            <Link
              href="/community/travel"
              className="px-5 py-2 rounded-full text-sm transition-all hover:scale-105"
              style={category === "travel"
                ? { backgroundColor: '#C8102E', color: '#ffffff' }
                : { backgroundColor: '#f5f5f4', color: '#57534e' }
              }
            >
              Travel
            </Link>
            <Link
              href="/community/drama-movie"
              className="px-5 py-2 rounded-full text-sm transition-all hover:scale-105"
              style={category === "drama-movie"
                ? { backgroundColor: '#C8102E', color: '#ffffff' }
                : { backgroundColor: '#f5f5f4', color: '#57534e' }
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
