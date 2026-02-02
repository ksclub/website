"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminApi, Enrollment, Pagination } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

const statusOptions = [
  { value: "PENDING", label: "Pending", color: "amber", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "ACTIVE", label: "Active", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "COMPLETED", label: "Completed", color: "blue", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { value: "CANCELLED", label: "Cancelled", color: "red", icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "REFUNDED", label: "Refunded", color: "purple", icon: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" },
];

function StatusDropdown({
  enrollmentId,
  currentStatus,
  onStatusChange
}: {
  enrollmentId: string;
  currentStatus: string;
  onStatusChange: (id: string, status: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getColorClasses = (color: string, isBackground = false) => {
    const colors: Record<string, { bg: string; text: string; hover: string; border: string }> = {
      amber: { bg: "bg-amber-50", text: "text-amber-700", hover: "hover:bg-amber-100", border: "border-amber-200" },
      emerald: { bg: "bg-emerald-50", text: "text-emerald-700", hover: "hover:bg-emerald-100", border: "border-emerald-200" },
      blue: { bg: "bg-blue-50", text: "text-blue-700", hover: "hover:bg-blue-100", border: "border-blue-200" },
      red: { bg: "bg-red-50", text: "text-red-700", hover: "hover:bg-red-100", border: "border-red-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", hover: "hover:bg-purple-100", border: "border-purple-200" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Update
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Change Status</p>
          </div>
          <div className="py-1">
            {statusOptions.map((option) => {
              const colors = getColorClasses(option.color);
              const isCurrentStatus = currentStatus === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (!isCurrentStatus) {
                      onStatusChange(enrollmentId, option.value);
                    }
                    setIsOpen(false);
                  }}
                  disabled={isCurrentStatus}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    isCurrentStatus
                      ? `${colors.bg} ${colors.text} cursor-default`
                      : `hover:bg-slate-50 text-slate-700`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors.bg}`}>
                    <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={option.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{option.label}</p>
                  </div>
                  {isCurrentStatus && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                      Current
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      case "REFUNDED":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const columns = [
    {
      key: "user",
      header: "User",
      render: (enrollment: Enrollment) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {(enrollment.user?.name || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-slate-800">{enrollment.user?.name || "Unknown"}</p>
            <p className="text-sm text-slate-500">{enrollment.user?.email || ""}</p>
          </div>
        </div>
      ),
    },
    {
      key: "course",
      header: "Course",
      render: (enrollment: Enrollment) => (
        <div>
          <p className="font-medium text-slate-800">
            {enrollment.course?.title || "Unknown Course"}
          </p>
          <p className="text-sm text-slate-500">{enrollment.period}</p>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (enrollment: Enrollment) => (
        <span className="font-semibold text-slate-800">${enrollment.price.toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (enrollment: Enrollment) => (
        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(enrollment.status)}`}>
          {enrollment.status}
        </span>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      render: (enrollment: Enrollment) => (
        <span
          className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg border ${
            enrollment.payment?.status === "COMPLETED"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : enrollment.payment?.status === "PENDING"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-slate-50 text-slate-500 border-slate-200"
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
        <div className="text-sm text-slate-500">
          {enrollment.startDate ? (
            <>
              <p className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(enrollment.startDate)}
              </p>
              {enrollment.endDate && (
                <p className="flex items-center gap-1 mt-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {formatDate(enrollment.endDate)}
                </p>
              )}
            </>
          ) : (
            <span className="text-slate-400 italic">Not started</span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (enrollment: Enrollment) => (
        <span className="text-sm text-slate-500">{formatDate(enrollment.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (enrollment: Enrollment) => (
        <StatusDropdown
          enrollmentId={enrollment.id}
          currentStatus={enrollment.status}
          onStatusChange={handleStatusChange}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Enrollments</h1>
        <p className="text-slate-500 mt-1">Manage course enrollments and payments</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/60 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{pagination?.total || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200/60">
          <p className="text-sm font-medium text-emerald-700">Active</p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">
            {enrollments.filter((e) => e.status === "ACTIVE").length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/60">
          <p className="text-sm font-medium text-amber-700">Pending</p>
          <p className="text-2xl font-bold text-amber-800 mt-1">
            {enrollments.filter((e) => e.status === "PENDING").length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200/60">
          <p className="text-sm font-medium text-blue-700">Revenue (This Page)</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">
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
