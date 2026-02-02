"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminApi, Notice, Pagination } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

export default function AdminNoticesPage() {
  const { token } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (token) {
      fetchNotices();
    }
  }, [token, currentPage]);

  const fetchNotices = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminApi.getNotices(token, currentPage, 20);
      setNotices(data.notices);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noticeId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      await adminApi.deleteNotice(token, noticeId);
      fetchNotices();
    } catch (error) {
      console.error("Failed to delete notice:", error);
      alert("Failed to delete notice");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (notice: Notice) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{notice.title}</span>
          {notice.important && (
            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
              Important
            </span>
          )}
        </div>
      ),
    },
    {
      key: "content",
      header: "Content",
      render: (notice: Notice) => (
        <p className="text-sm text-gray-500 truncate max-w-md">
          {notice.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
        </p>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (notice: Notice) => (
        <span className="text-sm text-gray-500">{formatDate(notice.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (notice: Notice) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/notices/${notice.id}/edit`}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(notice.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-500">Manage announcements and notices</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Notice
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={notices}
        pagination={pagination || undefined}
        onPageChange={setCurrentPage}
        loading={loading}
        emptyMessage="No notices found"
      />
    </div>
  );
}
