"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postApi, Post } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const categoryLabels: Record<string, string> = {
  "our-brand": "Our Brand",
  "life-style": "Life Style",
  "travel": "Travel",
  "drama-movie": "Drama / Movie",
};

export default function PostContent({ category, id }: { category: string; id: string }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isAuthor = user && post && user.id === post.author.id;
  const isAdmin = user && user.role === "ADMIN";
  const canEdit = isAuthor || isAdmin;

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await postApi.getById(id, token || undefined);
        setPost(data.post);
      } catch (err) {
        setError("Post not found");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id, token]);

  const handleLike = async () => {
    if (!token || !post) {
      router.push(`/auth/login?redirect=/community/${category}/post/${id}`);
      return;
    }

    setIsLiking(true);
    try {
      const result = await postApi.toggleLike(token, post.id);
      setPost({
        ...post,
        isLiked: result.liked,
        _count: {
          ...post._count,
          likes: post._count.likes + (result.liked ? 1 : -1),
        },
      });
    } catch (err) {
      console.error("Failed to toggle like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !post) return;

    setIsDeleting(true);
    try {
      await postApi.delete(token, post.id);
      router.push(`/community/${category}`);
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4"
             style={{ borderColor: '#e7e5e4', borderTopColor: '#C8102E' }}></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#2D2926' }}>Post not found</h1>
          <Link href={`/community/${category}`} className="transition-colors hover:underline" style={{ color: '#C8102E' }}>
            Back to {categoryLabels[category] || category}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2" style={{ color: '#2D2926' }}>Delete Post</h3>
            <p className="mb-6" style={{ color: '#57534e' }}>
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border rounded-lg transition-colors"
                style={{ borderColor: '#e7e5e4', color: '#57534e' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#C8102E' }}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="korean-gradient korean-pattern-bg py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link
                href={`/community/${category}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-[#C8102E]"
                style={{ color: '#78716c' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {categoryLabels[category] || category}
              </Link>

              {/* Edit/Delete buttons */}
              {canEdit && (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/community/${category}/post/${id}/edit`}
                    className="px-4 py-2 text-sm rounded-lg transition-colors hover:bg-white/50"
                    style={{ color: '#57534e' }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 text-sm rounded-lg transition-colors"
                    style={{ color: '#C8102E' }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
                  style={{ backgroundColor: '#C8102E15', color: '#C8102E' }}>
              {categoryLabels[category] || category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#2D2926' }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm" style={{ color: '#78716c' }}>
              <span>{post.author.name}</span>
              <span>{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-10 card-hover">
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  post.isLiked
                    ? ""
                    : "hover:scale-105"
                }`}
                style={
                  post.isLiked
                    ? { backgroundColor: '#C8102E15', color: '#C8102E' }
                    : { backgroundColor: '#f5f5f4', color: '#57534e' }
                }
              >
                <svg
                  className="w-5 h-5"
                  fill={post.isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{post._count.likes}</span>
              </button>

              <div className="flex items-center gap-2" style={{ color: '#78716c' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{post._count.comments} comments</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-center">
              <Link
                href={`/community/${category}`}
                className="px-6 py-3 rounded-lg transition-all hover:scale-105"
                style={{ backgroundColor: '#f5f5f4', color: '#57534e' }}
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
