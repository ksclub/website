"use client";

import Link from "next/link";

// Open courses (currently available)
const openCourses = [
  {
    id: 1,
    title: "Super Beginner Korean",
    level: "Super Beginner",
    description: "Perfect for absolute beginners! Start from zero and learn Hangul, basic pronunciation, and simple greetings.",
    duration: "6 weeks",
    lessons: 18,
    price: 149,
    features: ["Learn Hangul from scratch", "Basic pronunciation", "Simple greetings & phrases", "Korean writing practice"],
    popular: true,
  },
  {
    id: 2,
    title: "Beginner Korean",
    level: "Beginner",
    description: "Build your foundation in Korean. Learn essential grammar patterns, vocabulary, and everyday conversations.",
    duration: "8 weeks",
    lessons: 24,
    price: 199,
    features: ["Essential grammar patterns", "Daily vocabulary", "Basic conversations", "Listening practice"],
    popular: true,
  },
  {
    id: 3,
    title: "Advanced Korean",
    level: "Advanced",
    description: "Master complex Korean expressions. Focus on nuanced grammar, formal language, and natural fluency.",
    duration: "10 weeks",
    lessons: 30,
    price: 299,
    features: ["Complex grammar structures", "Formal & informal speech", "Natural expressions", "Cultural nuances"],
    popular: false,
  },
];

// Upcoming courses (coming soon)
const upcomingCourses = [
  {
    id: 4,
    title: "Intermediate Korean",
    level: "Intermediate",
    description: "Take your Korean to the next level. Bridge the gap between beginner and advanced with expanded vocabulary and grammar.",
    duration: "10 weeks",
    lessons: 30,
    price: 249,
    features: ["Intermediate grammar", "Expanded vocabulary", "Reading comprehension", "Writing practice"],
  },
];

export default function KoreanClassPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Korean Language Class
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Learn Korean<br />
              <span className="text-blue-600">The Right Way</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              From complete beginners to advanced learners, our courses are designed to help you
              speak Korean naturally and confidently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#courses"
                className="px-8 py-4 rounded-full text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                View Courses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Why Learn With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Korean</h3>
              <p className="text-gray-500 text-sm">
                Learn how Koreans actually speak, not just textbook Korean
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-500 text-sm">
                Join a community of Korean learners and native speakers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical</h3>
              <p className="text-gray-500 text-sm">
                Focus on practical skills you can use immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              Now Open
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
              Available Courses
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the course that fits your level and goals. All courses include lifetime access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {openCourses.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border ${
                  course.popular ? "border-blue-200 ring-2 ring-blue-100" : "border-gray-100"
                } p-6 relative`}
              >
                {course.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#2563eb', color: '#ffffff' }}>
                    Popular
                  </span>
                )}
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                    {course.level}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-2">${course.price}</div>
                </div>
                <p className="text-gray-500 text-sm mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {course.lessons} lessons
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/korean-class/${course.id}`}
                  className="block w-full py-3 rounded-xl font-medium transition-colors text-center"
                  style={course.popular
                    ? { backgroundColor: '#2563eb', color: '#ffffff' }
                    : { backgroundColor: '#f3f4f6', color: '#374151' }
                  }
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
              Coming Soon
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
              Upcoming Courses
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            More courses are on the way! Stay tuned for our upcoming classes.
          </p>

          <div className="max-w-xl mx-auto">
            {upcomingCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 relative opacity-90"
              >
                <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}>
                  Coming Soon
                </span>
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                    {course.level}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-2">${course.price}</div>
                </div>
                <p className="text-gray-500 text-sm mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {course.lessons} lessons
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-xl font-medium transition-colors cursor-not-allowed"
                  style={{ backgroundColor: '#e5e7eb', color: '#9ca3af' }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Ready to Start Learning?
            </h2>
            <p className="mb-8" style={{ color: '#bfdbfe' }}>
              Join thousands of students who are already speaking Korean with confidence.
            </p>
            <a
              href="#courses"
              className="inline-block px-8 py-4 rounded-full font-medium transition-colors"
              style={{ backgroundColor: '#ffffff', color: '#2563eb' }}
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
