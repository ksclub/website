"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login?redirect=/admin");
      } else if (user.role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  // Hide the main site header and footer for admin pages
  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("body > div > main");

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    if (main) main.classList.remove("flex-1");

    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      if (main) main.classList.add("flex-1");
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <AdminSidebar />
      <main className="ml-72 p-8">{children}</main>
    </div>
  );
}
