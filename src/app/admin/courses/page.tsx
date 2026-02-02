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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500">Manage your courses</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors"
          style={{ color: "#ffffff" }}
        >
          Add New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">No courses yet.</p>
          <Link
            href="/admin/courses/new"
            className="inline-block px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors"
            style={{ color: "#ffffff" }}
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.level}</p>
                  </div>
                  <div className="flex gap-2">
                    {course.isOpen && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        Open
                      </span>
                    )}
                    {course.isPopular && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{course.duration}</span>
                  <span>{course.lessons} lessons</span>
                  <span className="font-medium text-gray-900">${course.price}</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="flex-1 px-3 py-2 text-center text-sm border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
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
