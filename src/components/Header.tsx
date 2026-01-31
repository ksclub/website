"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-26">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo1.png"
              alt="Korean Slang Club"
              width={140}
              height={140}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Community Dropdown - Hover */}
            <div className="relative group">
              <Link
                href="/community/our-brand"
                className="text-gray-600 hover:text-gray-900 transition-colors py-4"
              >
                Community
              </Link>
              {/* Dropdown - shows on hover */}
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link
                    href="/community/our-brand"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Our Brand
                  </Link>
                  <Link
                    href="/community/life-style"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Life Style
                  </Link>
                  <Link
                    href="/community/travel"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Travel
                  </Link>
                  <Link
                    href="/community/drama-movie"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Drama / Movie
                  </Link>
                </div>
              </div>
            </div>

            {/* Korean Language Class Dropdown - Hover */}
            <div className="relative group">
              <Link
                href="/korean-class"
                className="text-gray-600 hover:text-gray-900 transition-colors py-4"
              >
                Korean Language Class
              </Link>
              {/* Dropdown - shows on hover */}
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link
                    href="/korean-class/our-brand"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Our Brand
                  </Link>
                  <Link
                    href="/korean-class"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Class
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/notice"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Notice
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full transition-colors"
              style={{ backgroundColor: "#111827", color: "#ffffff" }}
            >
              Contact Us
            </Link>

            {/* Auth Buttons */}
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-4">
                      <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </button>
                    <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <div className="py-2">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                  Community
                </p>
                <Link
                  href="/community/our-brand"
                  className="block py-2 text-gray-600 hover:text-gray-900 pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Brand
                </Link>
                <Link
                  href="/community/life-style"
                  className="block py-2 text-gray-600 hover:text-gray-900 pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Life Style
                </Link>
                <Link
                  href="/community/travel"
                  className="block py-2 text-gray-600 hover:text-gray-900 pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel
                </Link>
                <Link
                  href="/community/drama-movie"
                  className="block py-2 text-gray-600 hover:text-gray-900 pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Drama / Movie
                </Link>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                  Korean Language Class
                </p>
                <Link
                  href="/korean-class/our-brand"
                  className="block py-2 text-gray-600 hover:text-gray-900 pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Brand
                </Link>
                <Link
                  href="/korean-class"
                  className="block py-2 text-gray-600 hover:text-gray-900 pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Class
                </Link>
              </div>
              <Link
                href="/notice"
                className="py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notice
              </Link>
              <Link
                href="/contact"
                className="mt-2 px-5 py-2 rounded-full transition-colors text-center"
                style={{ backgroundColor: "#111827", color: "#ffffff" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Auth */}
              {!isLoading && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 py-2">
                        <span className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full mt-2 py-2 text-gray-600 hover:text-gray-900 text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="block py-2 text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
