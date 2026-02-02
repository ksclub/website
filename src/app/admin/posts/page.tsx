"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminApi, Post, Pagination } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

export default function AdminPostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token, currentPage]);

  const fetchPosts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminApi.getPosts(token, currentPage, 20);
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await adminApi.deletePost(token, postId);
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      OUR_BRAND: "Our Brand",
      LIFE_STYLE: "Life Style",
      TRAVEL: "Travel",
      DRAMA_MOVIE: "Drama & Movie",
    };
    return labels[category] || category;
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (post: Post) => (
        <div className="max-w-sm">
          <Link
            href={`/community/${post.category}/post/${post.id}`}
            className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
          <p className="text-sm text-gray-500 truncate">
            {post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 60)}...
          </p>
        </div>
      ),
    },
    {
      key: "author",
      header: "Author",
      render: (post: Post) => (
        <span className="text-sm text-gray-700">{post.author.name}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (post: Post) => (
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
          {getCategoryLabel(post.category)}
        </span>
      ),
    },
    {
      key: "stats",
      header: "Stats",
      render: (post: Post) => (
        <div className="text-sm text-gray-500 space-y-1">
          <p>{post.views} views</p>
          <p>{post._count.likes} likes</p>
          <p>{post._count.comments} comments</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (post: Post) => (
        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (post: Post) => (
        <div className="flex gap-2">
          <Link
            href={`/community/${post.category}/post/${post.id}`}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50 transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => handleDelete(post.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Posts</h1>
        <p className="text-slate-500 mt-1">Manage community posts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/60 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500">Total Posts</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{pagination?.total || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200/60">
          <p className="text-sm font-medium text-blue-700">Total Views</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">
            {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-200/60">
          <p className="text-sm font-medium text-rose-700">Total Likes</p>
          <p className="text-2xl font-bold text-rose-800 mt-1">
            {posts.reduce((sum, p) => sum + p._count.likes, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200/60">
          <p className="text-sm font-medium text-emerald-700">Total Comments</p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">
            {posts.reduce((sum, p) => sum + p._count.comments, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        pagination={pagination || undefined}
        onPageChange={setCurrentPage}
        loading={loading}
        emptyMessage="No posts found"
      />
    </div>
  );
}
