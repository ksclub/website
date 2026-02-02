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

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, currentPage, search]);

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminApi.getUsers(token, currentPage, 20, search || undefined);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch users:", error);
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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500">Manage registered users</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
