"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { postApi, uploadApi } from "@/lib/api";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import to avoid SSR issues with TipTap
const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="animate-pulse h-[300px] bg-gray-100 rounded"></div>
      </div>
    ),
  }
);

const categories = [
  { value: "our-brand", label: "Our Brand" },
  { value: "life-style", label: "Life Style" },
  { value: "travel", label: "Travel" },
  { value: "drama-movie", label: "Drama / Movie" },
];

export default function WritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token, isLoading: authLoading } = useAuth();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "life-style");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login?redirect=/community/write");
    }
  }, [user, authLoading, router]);

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    if (!token) {
      throw new Error("Please login to upload images");
    }
    return uploadApi.uploadImage(token, file);
  }, [token]);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploadingThumbnail(true);
    try {
      const url = await uploadApi.uploadImage(token, file);
      setThumbnail(url);
    } catch (err) {
      setError("Failed to upload thumbnail");
      console.error(err);
    } finally {
      setIsUploadingThumbnail(false);
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = "";
      }
    }
  };

  const extractTextFromHtml = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Please login to write a post");
      return;
    }

    const textContent = extractTextFromHtml(content);
    if (!title.trim() || !textContent.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const data = await postApi.create(token, {
        title: title.trim(),
        content: content,
        category,
        excerpt: textContent.slice(0, 150),
        thumbnail: thumbnail || undefined,
      });

      router.push(`/community/${category}/post/${data.post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Write a Post</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image (Optional)
              </label>
              <div className="relative">
                {thumbnail ? (
                  <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnail(null)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => thumbnailInputRef.current?.click()}
                    disabled={isUploadingThumbnail}
                    className="w-full max-w-md aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors disabled:opacity-50"
                  >
                    {isUploadingThumbnail ? (
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
                    ) : (
                      <>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">Click to upload cover image</span>
                      </>
                    )}
                  </button>
                )}
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={200}
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                onImageUpload={handleImageUpload}
                placeholder="Write your post content here..."
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
