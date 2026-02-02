"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50" style={{ borderColor: '#e7e5e4' }}>
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
                className="py-4 transition-colors hover:text-[#C8102E]"
                style={{ color: '#57534e' }}
              >
                Community
              </Link>
              {/* Dropdown - shows on hover */}
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg py-2" style={{ border: '1px solid #e7e5e4' }}>
                  <Link
                    href="/community/our-brand"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
                  >
                    Our Brand
                  </Link>
                  <Link
                    href="/community/life-style"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
                  >
                    Life Style
                  </Link>
                  <Link
                    href="/community/travel"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
                  >
                    Travel
                  </Link>
                  <Link
                    href="/community/drama-movie"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
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
                className="py-4 transition-colors hover:text-[#C8102E]"
                style={{ color: '#57534e' }}
              >
                Korean Language Class
              </Link>
              {/* Dropdown - shows on hover */}
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg py-2" style={{ border: '1px solid #e7e5e4' }}>
                  <Link
                    href="/korean-class/our-brand"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
                  >
                    Our Brand
                  </Link>
                  <Link
                    href="/korean-class"
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
                  >
                    Class
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/notice"
              className="transition-colors hover:text-[#C8102E]"
              style={{ color: '#57534e' }}
            >
              Notice
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: '#C8102E', color: '#ffffff' }}
            >
              Contact Us
            </Link>

            {/* Auth Buttons */}
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2 py-4 transition-colors" style={{ color: '#57534e' }}>
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                            style={{ backgroundColor: '#2B4F81' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </button>
                    <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-lg shadow-lg py-2" style={{ border: '1px solid #e7e5e4' }}>
                        <div className="px-4 py-2 border-b" style={{ borderColor: '#e7e5e4' }}>
                          <p className="text-sm font-medium" style={{ color: '#2D2926' }}>{user.name}</p>
                          <p className="text-xs" style={{ color: '#78716c' }}>{user.email}</p>
                        </div>
                        <Link
                          href="/mypage"
                          className="block px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                          style={{ color: '#57534e' }}
                        >
                          My Page
                        </Link>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors hover:text-[#C8102E]"
                          style={{ color: '#57534e' }}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="transition-colors hover:text-[#C8102E]"
                    style={{ color: '#57534e' }}
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
              style={{ color: '#2D2926' }}
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
          <div className="md:hidden py-4 border-t" style={{ borderColor: '#e7e5e4' }}>
            <nav className="flex flex-col gap-2">
              <div className="py-2">
                <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                  Community
                </p>
                <Link
                  href="/community/our-brand"
                  className="block py-2 pl-4 hover:text-[#C8102E] transition-colors"
                  style={{ color: '#57534e' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Brand
                </Link>
                <Link
                  href="/community/life-style"
                  className="block py-2 pl-4 hover:text-[#C8102E] transition-colors"
                  style={{ color: '#57534e' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Life Style
                </Link>
                <Link
                  href="/community/travel"
                  className="block py-2 pl-4 hover:text-[#C8102E] transition-colors"
                  style={{ color: '#57534e' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel
                </Link>
                <Link
                  href="/community/drama-movie"
                  className="block py-2 pl-4 hover:text-[#C8102E] transition-colors"
                  style={{ color: '#57534e' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Drama / Movie
                </Link>
              </div>
              <div className="py-2">
                <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                  Korean Language Class
                </p>
                <Link
                  href="/korean-class/our-brand"
                  className="block py-2 pl-4 hover:text-[#C8102E] transition-colors"
                  style={{ color: '#57534e' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Brand
                </Link>
                <Link
                  href="/korean-class"
                  className="block py-2 pl-4 hover:text-[#C8102E] transition-colors"
                  style={{ color: '#57534e' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Class
                </Link>
              </div>
              <Link
                href="/notice"
                className="py-2 hover:text-[#C8102E] transition-colors"
                style={{ color: '#57534e' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notice
              </Link>
              <Link
                href="/contact"
                className="mt-2 px-5 py-2 rounded-full transition-colors text-center"
                style={{ backgroundColor: '#C8102E', color: '#ffffff' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Auth */}
              {!isLoading && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#e7e5e4' }}>
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 py-2">
                        <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
                              style={{ backgroundColor: '#2B4F81' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#2D2926' }}>{user.name}</p>
                          <p className="text-xs" style={{ color: '#78716c' }}>{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/mypage"
                        className="block mt-2 py-2 hover:text-[#C8102E] transition-colors"
                        style={{ color: '#57534e' }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Page
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-2 text-left hover:text-[#C8102E] transition-colors"
                        style={{ color: '#57534e' }}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="block py-2 hover:text-[#C8102E] transition-colors"
                      style={{ color: '#57534e' }}
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
