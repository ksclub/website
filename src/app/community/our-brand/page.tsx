"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { postApi, Post } from "@/lib/api";

export default function OurBrandPage() {
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopPosts() {
      try {
        const data = await postApi.getTopPosts("our-brand", 5);
        setTopPosts(data.posts);
      } catch (err) {
        console.error("Failed to fetch top posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTopPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Brand
            </h1>
            <p className="text-lg text-gray-600">
              Welcome to Korean Slang Club - your gateway to authentic Korean language and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Korean Slang Club is a space where people from around the world can freely share information, ideas, and trends related to Korea.
                </p>
                <p>
                  What began as a vibrant community is now evolving into a cultural hub that connects people, brands, and stories inspired by Korea.
                </p>
                <p>
                  The name Korean Slang Club represents real, living aspects of Korean culture—the language, lifestyle, and creativity that shape today's Korea. Discover what's trending, what people love, and what defines modern Korean culture here.
                </p>
                <p>
                  Brands seeking to collaborate or share their stories through Korean Slang Club are always welcome to reach out.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-sm text-gray-500">Community Members</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-sm text-gray-500">Posts & Articles</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-sm text-gray-500">Korean Courses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Top Posts
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
              </div>
            ) : topPosts.length > 0 ? (
              topPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/our-brand/post/${post.id}`}
                  className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3">{post.excerpt || post.content.slice(0, 100)}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{post.author.name}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post._count.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post._count.comments}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No posts yet. Be the first to share!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore Our Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Dive into our content categories and discover everything about Korean culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/community/life-style"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Life Style
            </Link>
            <Link
              href="/community/travel"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Travel
            </Link>
            <Link
              href="/community/drama-movie"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Drama / Movie
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
