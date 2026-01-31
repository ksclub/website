"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { noticeApi, Notice } from "@/lib/api";

export default function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotice() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await noticeApi.getById(id);
        setNotice(data.notice);
      } catch (err) {
        setError("Notice not found");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotice();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Notice not found</h1>
          <Link href="/notice" className="text-blue-600 hover:text-blue-700">
            Back to Notice List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                href="/notice"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Notice
              </Link>
            </div>
            {notice.important && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                  Important
                </span>
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {notice.title}
            </h1>
            <p className="text-gray-500">{formatDate(notice.createdAt)}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10">
              <div className="prose prose-gray max-w-none">
                {notice.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/notice"
                className="px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
              >
                Back to List
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
