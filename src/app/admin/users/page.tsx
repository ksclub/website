"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminApi, AdminUser, Pagination } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

export default function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, currentPage, search]);

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getUsers(token, currentPage, 20, search || undefined);
      console.log("Users data:", data);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (userId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to block this user?")) return;

    try {
      await adminApi.blockUser(token, userId);
      fetchUsers();
    } catch (error) {
      console.error("Failed to block user:", error);
      alert("Failed to block user");
    }
  };

  const handleUnblock = async (userId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to unblock this user?")) return;

    try {
      await adminApi.unblockUser(token, userId);
      fetchUsers();
    } catch (error) {
      console.error("Failed to unblock user:", error);
      alert("Failed to unblock user");
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
      key: "name",
      header: "Name",
      render: (user: AdminUser) => (
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user: AdminUser) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            user.role === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user: AdminUser) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            user.isBlocked
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {user.isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      key: "stats",
      header: "Activity",
      render: (user: AdminUser) => (
        <div className="text-sm text-gray-500">
          <p>{user._count?.posts || 0} posts</p>
          <p>{user._count?.enrollments || 0} enrollments</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Joined",
      render: (user: AdminUser) => (
        <span className="text-sm text-gray-500">{formatDate(user.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: AdminUser) => (
        <div className="flex gap-2">
          {user.role !== "ADMIN" && (
            user.isBlocked ? (
              <button
                onClick={() => handleUnblock(user.id)}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => handleBlock(user.id)}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Block
              </button>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Users</h1>
          <p className="text-slate-500 mt-1">Manage registered users</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
        />
      </div>

      <DataTable
        columns={columns}
        data={users}
        pagination={pagination || undefined}
        onPageChange={setCurrentPage}
        loading={loading}
        emptyMessage="No users found"
      />
    </div>
  );
}
