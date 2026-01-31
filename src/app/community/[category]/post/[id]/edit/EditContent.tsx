"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { postApi, uploadApi, Post } from "@/lib/api";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded-lg p-4" style={{ borderColor: "#e7e5e4" }}>
        <div
          className="animate-pulse h-[300px] rounded"
          style={{ backgroundColor: "#f5f5f4" }}
        ></div>
      </div>
    ),
  },
);

const categoryLabels: Record<string, string> = {
  "our-brand": "Our Brand",
  "life-style": "Life Style",
  travel: "Travel",
  "drama-movie": "Drama / Movie",
};

export default function EditContent({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  const router = useRouter();
  const { user, token, isLoading: authLoading } = useAuth();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load post data
  useEffect(() => {
    async function fetchPost() {
      setIsLoadingPost(true);
      try {
        const data = await postApi.getById(id, token || undefined);
        setPost(data.post);
        setTitle(data.post.title);
        setContent(data.post.content);
        setThumbnail(data.post.thumbnail || null);
      } catch (err) {
        setError("Post not found");
        console.error(err);
      } finally {
        setIsLoadingPost(false);
      }
    }
    fetchPost();
  }, [id, token]);

  // Check authorization
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(
        `/auth/login?redirect=/community/${category}/post/${id}/edit`,
      );
    }
  }, [user, authLoading, router, category, id]);

  // Check if user can edit this post
  useEffect(() => {
    if (post && user) {
      const isAuthor = user.id === post.author.id;
      const isAdmin = user.role === "ADMIN";
      if (!isAuthor && !isAdmin) {
        router.push(`/community/${category}/post/${id}`);
      }
    }
  }, [post, user, router, category, id]);

  const handleImageUpload = useCallback(
    async (file: File): Promise<string> => {
      if (!token) {
        throw new Error("Please login to upload images");
      }
      return uploadApi.uploadImage(token, file);
    },
    [token],
  );

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

    if (!token || !post) {
      setError("Please login to edit post");
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
      await postApi.update(token, post.id, {
        title: title.trim(),
        content: content,
        excerpt: textContent.slice(0, 150),
        thumbnail: thumbnail || undefined,
      });

      router.push(`/community/${category}/post/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoadingPost) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FAF9F6" }}
      >
        <div
          className="inline-block animate-spin rounded-full h-8 w-8 border-4"
          style={{ borderColor: "#e7e5e4", borderTopColor: "#C8102E" }}
        ></div>
      </div>
    );
  }

  if (error === "Post not found" || !post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FAF9F6" }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#2D2926" }}>
            Post not found
          </h1>
          <Link
            href={`/community/${category}`}
            className="transition-colors hover:underline"
            style={{ color: "#C8102E" }}
          >
            Back to {categoryLabels[category] || category}
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#FAF9F6" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#2D2926" }}>
                Edit Post
              </h1>
            </div>
            <Link
              href={`/community/${category}/post/${id}`}
              className="transition-colors"
              style={{ color: "#78716c" }}
            >
              Cancel
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 card-hover"
          >
            {error && error !== "Post not found" && (
              <div
                className="mb-6 p-4 rounded-lg text-sm"
                style={{
                  backgroundColor: "#C8102E15",
                  color: "#C8102E",
                  border: "1px solid #C8102E30",
                }}
              >
                {error}
              </div>
            )}

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Cover Image (Optional)
              </label>
              <div className="relative">
                {thumbnail ? (
                  <div
                    className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden"
                    style={{ border: "1px solid #e7e5e4" }}
                  >
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
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => thumbnailInputRef.current?.click()}
                    disabled={isUploadingThumbnail}
                    className="w-full max-w-md aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    style={{ borderColor: "#d6d3d1", color: "#78716c" }}
                  >
                    {isUploadingThumbnail ? (
                      <div
                        className="inline-block animate-spin rounded-full h-6 w-6 border-2"
                        style={{
                          borderColor: "#e7e5e4",
                          borderTopColor: "#C8102E",
                        }}
                      ></div>
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm">
                          Click to upload cover image
                        </span>
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
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Category
              </label>
              <div
                className="px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: "#f5f5f4",
                  border: "1px solid #e7e5e4",
                  color: "#57534e",
                }}
              >
                {categoryLabels[category] || category}
              </div>
              <p className="mt-1 text-xs" style={{ color: "#a8a29e" }}>
                Category cannot be changed
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  border: "1px solid #e7e5e4",
                  backgroundColor: "#FAF9F6",
                }}
                maxLength={200}
              />
            </div>

            <div className="mb-8">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#2D2926" }}
              >
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
              <Link
                href={`/community/${category}/post/${id}`}
                className="px-6 py-3 transition-colors"
                style={{ color: "#57534e" }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="px-8 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                style={{ backgroundColor: "#C8102E", color: "#ffffff" }}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
