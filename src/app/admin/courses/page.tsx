"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { courseApi, adminApi, Course } from "@/lib/api";

export default function AdminCoursesPage() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseApi.getAll();
      setCourses(data.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await adminApi.deleteCourse(token, courseId);
      fetchCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Courses</h1>
          <p className="text-slate-500 mt-1">Manage your courses</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          style={{ color: "#ffffff" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200/60">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium mb-2">No courses yet</p>
          <p className="text-slate-400 text-sm mb-6">Get started by creating your first course</p>
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
            style={{ color: "#ffffff" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md hover:border-slate-300/60 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                    <p className="text-sm text-slate-500">{course.level}</p>
                  </div>
                  <div className="flex gap-2">
                    {course.isOpen && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                        Open
                      </span>
                    )}
                    {course.isPopular && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4 py-3 border-y border-slate-100">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {course.lessons} lessons
                  </span>
                  <span className="font-semibold text-slate-800">${course.price}</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="flex-1 px-4 py-2.5 text-center text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="px-4 py-2.5 text-sm font-medium bg-red-50 text-red-600 rounded-xl hover:bg-red-100 border border-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
