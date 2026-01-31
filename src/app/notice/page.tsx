"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { noticeApi, Notice, Pagination } from "@/lib/api";

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotices() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await noticeApi.getAll(currentPage, 10);
        setNotices(data.notices);
        setPagination(data.pagination);
      } catch (err) {
        setError("Failed to load notices");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotices();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notice
            </h1>
            <p className="text-gray-600">
              Stay updated with the latest news and announcements from Korean Slang Club.
            </p>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
                <p className="mt-4 text-gray-500">Loading notices...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="text-center py-16">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Notices */}
            {!isLoading && !error && (
              <div className="space-y-4">
                {notices.length > 0 ? (
                  notices.map((notice) => (
                    <Link
                      key={notice.id}
                      href={`/notice/${notice.id}`}
                      className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {notice.important && (
                          <span className="flex-shrink-0 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                            Important
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {notice.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                            {notice.content}
                          </p>
                          <span className="text-xs text-gray-400">{formatDate(notice.createdAt)}</span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-500">No notices yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-1">
                  <button
                    className="px-3 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                      className="px-4 py-2 rounded-lg text-sm"
                      style={
                        currentPage === page
                          ? { backgroundColor: '#111827', color: '#ffffff' }
                          : { color: '#4b5563' }
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
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
        </div>
      </section>
    </div>
  );
}
