"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminApi, Enrollment, Pagination } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

export default function AdminEnrollmentsPage() {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (token) {
      fetchEnrollments();
    }
  }, [token, currentPage]);

  const fetchEnrollments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminApi.getEnrollments(token, currentPage, 20);
      setEnrollments(data.enrollments);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (enrollmentId: string, status: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to change the status to ${status}?`)) return;

    try {
      await adminApi.updateEnrollmentStatus(token, enrollmentId, status);
      fetchEnrollments();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
      case "REFUNDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      key: "user",
      header: "User",
      render: (enrollment: Enrollment) => (
        <div>
          <p className="font-medium text-gray-900">{enrollment.user?.name || "Unknown"}</p>
          <p className="text-sm text-gray-500">{enrollment.user?.email || ""}</p>
        </div>
      ),
    },
    {
      key: "course",
      header: "Course",
      render: (enrollment: Enrollment) => (
        <div>
          <p className="font-medium text-gray-900">
            {enrollment.course?.title || "Unknown Course"}
          </p>
          <p className="text-sm text-gray-500">{enrollment.period}</p>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (enrollment: Enrollment) => (
        <span className="font-medium">${enrollment.price.toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (enrollment: Enrollment) => (
        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(enrollment.status)}`}>
          {enrollment.status}
        </span>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      render: (enrollment: Enrollment) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            enrollment.payment?.status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : enrollment.payment?.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {enrollment.payment?.status || "No Payment"}
        </span>
      ),
    },
    {
      key: "dates",
      header: "Period",
      render: (enrollment: Enrollment) => (
        <div className="text-sm text-gray-500">
          {enrollment.startDate && (
            <p>Start: {formatDate(enrollment.startDate)}</p>
          )}
          {enrollment.endDate && (
            <p>End: {formatDate(enrollment.endDate)}</p>
          )}
          {!enrollment.startDate && <p>Not started</p>}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (enrollment: Enrollment) => (
        <span className="text-sm text-gray-500">{formatDate(enrollment.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (enrollment: Enrollment) => (
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              handleStatusChange(enrollment.id, e.target.value);
              e.target.value = "";
            }
          }}
          className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Change Status</option>
          <option value="PENDING">Pending</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Enrollments</h1>
        <p className="text-gray-500">Manage course enrollments and payments</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">{pagination?.total || 0}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {enrollments.filter((e) => e.status === "ACTIVE").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {enrollments.filter((e) => e.status === "PENDING").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Revenue (This Page)</p>
          <p className="text-2xl font-bold text-blue-600">
            ${enrollments
              .filter((e) => e.payment?.status === "COMPLETED")
              .reduce((sum, e) => sum + e.price, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={enrollments}
        pagination={pagination || undefined}
        onPageChange={setCurrentPage}
        loading={loading}
        emptyMessage="No enrollments found"
      />
    </div>
  );
}
