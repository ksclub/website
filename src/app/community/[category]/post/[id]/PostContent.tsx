"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postApi, commentApi, Post, Comment } from "@/lib/api";
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
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Comment states
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [showDeleteCommentConfirm, setShowDeleteCommentConfirm] = useState<string | null>(null);
  const [isCommentFocused, setIsCommentFocused] = useState(false);

  const isAuthor = user && post && user.id === post.author.id;
  const isAdmin = user && user.role === "ADMIN";
  const canEdit = isAuthor || isAdmin;

  const fetchComments = useCallback(async () => {
    try {
      const data = await commentApi.getByPostId(id);
      setComments(data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }, [id]);

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
    fetchComments();
  }, [id, token, fetchComments]);

  const handleLike = async () => {
    if (!token || !post) {
      router.push(`/auth/login?redirect=/community/${category}/post/${id}`);
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    // Optimistic update
    const wasLiked = post.isLiked;
    const prevLikes = post._count.likes;
    setPost({
      ...post,
      isLiked: !wasLiked,
      _count: {
        ...post._count,
        likes: prevLikes + (!wasLiked ? 1 : -1),
      },
    });
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 400);

    try {
      const result = await postApi.toggleLike(token, post.id);
      // Sync with server response
      setPost((prev) => prev ? {
        ...prev,
        isLiked: result.liked,
        _count: {
          ...prev._count,
          likes: prevLikes + (result.liked ? 1 : -1),
        },
      } : prev);
    } catch (err) {
      // Rollback on error
      console.error("Failed to toggle like:", err);
      setPost((prev) => prev ? {
        ...prev,
        isLiked: wasLiked,
        _count: { ...prev._count, likes: prevLikes },
      } : prev);
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

  const handleSubmitComment = async () => {
    if (!token || !post || !commentText.trim()) {
      if (!token) {
        router.push(`/auth/login?redirect=/community/${category}/post/${id}`);
      }
      return;
    }

    setIsSubmittingComment(true);
    try {
      await commentApi.create(token, post.id, commentText.trim());
      setCommentText("");
      await fetchComments();
      setPost({
        ...post,
        _count: { ...post._count, comments: post._count.comments + 1 },
      });
    } catch (err) {
      console.error("Failed to create comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!token || !post || !editingCommentText.trim()) return;

    try {
      await commentApi.update(token, post.id, commentId, editingCommentText.trim());
      setEditingCommentId(null);
      setEditingCommentText("");
      await fetchComments();
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!token || !post) return;

    setDeletingCommentId(commentId);
    setShowDeleteCommentConfirm(null);
    try {
      await commentApi.delete(token, post.id, commentId);
      await fetchComments();
      setPost({
        ...post,
        _count: { ...post._count, comments: post._count.comments - 1 },
      });
    } catch (err) {
      console.error("Failed to delete comment:", err);
    } finally {
      setDeletingCommentId(null);
    }
  };

  const avatarColors = ['#C8102E', '#2B4F81', '#7BA05B', '#6B4C7A', '#E07C3E', '#D4AF37'];
  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCommentDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

              {post.sourceUrl && (
                <div className="mt-8 pt-4 border-t" style={{ borderColor: '#e7e5e4' }}>
                  <p className="text-sm" style={{ color: '#78716c' }}>
                    Source:{" "}
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-[#C8102E]"
                      style={{ color: '#78716c' }}
                    >
                      Haps Magazine
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all cursor-pointer select-none active:scale-95"
                style={
                  post.isLiked
                    ? { backgroundColor: '#C8102E', color: '#ffffff' }
                    : { backgroundColor: '#ffffff', color: '#57534e', border: '1px solid #e7e5e4' }
                }
              >
                <svg
                  className="w-5 h-5 transition-transform"
                  style={{
                    transform: likeAnimation ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
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
                <span className="text-sm font-medium">{post._count.likes}</span>
              </button>

              <div className="flex items-center gap-2 text-sm" style={{ color: '#78716c' }}>
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

            {/* Comments Section */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-lg font-bold" style={{ color: '#2D2926' }}>
                  Comments
                </h3>
                {post._count.comments > 0 && (
                  <span
                    className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: '#C8102E', color: '#ffffff' }}
                  >
                    {post._count.comments}
                  </span>
                )}
              </div>

              {/* Comment Input */}
              {token ? (
                <div
                  className="bg-white rounded-2xl p-5 mb-4 transition-all"
                  style={{
                    border: isCommentFocused ? '1px solid #C8102E' : '1px solid #e7e5e4',
                    boxShadow: isCommentFocused ? '0 0 0 3px #C8102E10' : 'none',
                  }}
                >
                  <div className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: getAvatarColor(user?.name || '') }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onFocus={() => setIsCommentFocused(true)}
                        onBlur={() => setIsCommentFocused(false)}
                        placeholder="Share your thoughts..."
                        rows={isCommentFocused || commentText ? 3 : 1}
                        className="w-full text-sm resize-none focus:outline-none bg-transparent"
                        style={{ color: '#2D2926', lineHeight: '1.6' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && commentText.trim()) {
                            handleSubmitComment();
                          }
                        }}
                      />
                      {(isCommentFocused || commentText) && (
                        <div className="flex items-center justify-between pt-3 mt-2" style={{ borderTop: '1px solid #f5f5f4' }}>
                          <span className="text-xs" style={{ color: '#a8a29e' }}>
                            Press Cmd+Enter to submit
                          </span>
                          <div className="flex gap-2">
                            {commentText && (
                              <button
                                onClick={() => setCommentText("")}
                                onMouseDown={(e) => e.preventDefault()}
                                className="px-3 py-1.5 text-xs rounded-lg transition-all hover:bg-gray-50"
                                style={{ color: '#78716c' }}
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={handleSubmitComment}
                              onMouseDown={(e) => e.preventDefault()}
                              disabled={isSubmittingComment || !commentText.trim()}
                              className="px-4 py-1.5 text-xs font-medium text-white rounded-lg transition-all disabled:opacity-40"
                              style={{ backgroundColor: '#C8102E' }}
                            >
                              {isSubmittingComment ? (
                                <span className="flex items-center gap-1.5">
                                  <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  Posting
                                </span>
                              ) : "Comment"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-5 mb-4 text-center"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4' }}
                >
                  <svg className="w-8 h-8 mx-auto mb-2" style={{ color: '#d6d3d1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm" style={{ color: '#78716c' }}>
                    <Link
                      href={`/auth/login?redirect=/community/${category}/post/${id}`}
                      className="font-medium transition-colors hover:underline"
                      style={{ color: '#C8102E' }}
                    >
                      Log in
                    </Link>
                    {" "}to join the conversation.
                  </p>
                </div>
              )}

              {/* Delete Comment Confirmation Modal */}
              {showDeleteCommentConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                  <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#2D2926' }}>Delete Comment</h3>
                    <p className="mb-6 text-sm" style={{ color: '#57534e' }}>
                      Are you sure you want to delete this comment?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteCommentConfirm(null)}
                        className="flex-1 px-4 py-2 text-sm border rounded-lg transition-colors hover:bg-gray-50"
                        style={{ borderColor: '#e7e5e4', color: '#57534e' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeleteComment(showDeleteCommentConfirm)}
                        disabled={!!deletingCommentId}
                        className="flex-1 px-4 py-2 text-sm text-white rounded-lg transition-colors disabled:opacity-50"
                        style={{ backgroundColor: '#C8102E' }}
                      >
                        {deletingCommentId ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              {comments.length === 0 ? (
                <div className="py-10 text-center">
                  <svg className="w-12 h-12 mx-auto mb-3" style={{ color: '#e7e5e4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-sm font-medium mb-1" style={{ color: '#78716c' }}>
                    No comments yet
                  </p>
                  <p className="text-xs" style={{ color: '#a8a29e' }}>
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => {
                    const isCommentAuthor = user && user.id === comment.authorId;
                    const canModify = isCommentAuthor || isAdmin;
                    const isEditing = editingCommentId === comment.id;
                    const color = getAvatarColor(comment.author.name);

                    return (
                      <div
                        key={comment.id}
                        className="bg-white rounded-2xl p-5 group transition-all"
                        style={{ border: '1px solid #e7e5e4' }}
                      >
                        <div className="flex gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            {comment.author.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-sm font-semibold truncate" style={{ color: '#2D2926' }}>
                                  {comment.author.name}
                                </span>
                                <span className="text-xs shrink-0" style={{ color: '#a8a29e' }}>
                                  {formatCommentDate(comment.createdAt)}
                                </span>
                                {comment.createdAt !== comment.updatedAt && (
                                  <span className="text-xs italic shrink-0" style={{ color: '#d6d3d1' }}>
                                    (edited)
                                  </span>
                                )}
                              </div>

                              {canModify && !isEditing && (
                                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                  <button
                                    onClick={() => {
                                      setEditingCommentId(comment.id);
                                      setEditingCommentText(comment.content);
                                    }}
                                    className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                    title="Edit"
                                  >
                                    <svg className="w-3.5 h-3.5" style={{ color: '#78716c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => setShowDeleteCommentConfirm(comment.id)}
                                    disabled={deletingCommentId === comment.id}
                                    className="p-1.5 rounded-lg transition-colors hover:bg-red-50 disabled:opacity-50"
                                    title="Delete"
                                  >
                                    <svg className="w-3.5 h-3.5" style={{ color: '#C8102E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>

                            {isEditing ? (
                              <div className="mt-2">
                                <textarea
                                  value={editingCommentText}
                                  onChange={(e) => setEditingCommentText(e.target.value)}
                                  rows={3}
                                  autoFocus
                                  className="w-full px-3 py-2.5 rounded-lg border text-sm resize-none focus:outline-none transition-colors"
                                  style={{ borderColor: '#C8102E', color: '#2D2926', boxShadow: '0 0 0 3px #C8102E10' }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && editingCommentText.trim()) {
                                      handleUpdateComment(comment.id);
                                    }
                                    if (e.key === 'Escape') {
                                      setEditingCommentId(null);
                                      setEditingCommentText("");
                                    }
                                  }}
                                />
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs" style={{ color: '#a8a29e' }}>
                                    Esc to cancel
                                  </span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        setEditingCommentId(null);
                                        setEditingCommentText("");
                                      }}
                                      className="px-3 py-1.5 text-xs rounded-lg border transition-all hover:bg-gray-50"
                                      style={{ borderColor: '#e7e5e4', color: '#57534e' }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleUpdateComment(comment.id)}
                                      disabled={!editingCommentText.trim() || editingCommentText === comment.content}
                                      className="px-4 py-1.5 text-xs font-medium text-white rounded-lg transition-all disabled:opacity-40"
                                      style={{ backgroundColor: '#C8102E' }}
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="mt-1.5 text-sm whitespace-pre-wrap" style={{ color: '#44403c', lineHeight: '1.7' }}>
                                {comment.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
