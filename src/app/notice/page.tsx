import Link from "next/link";

// Mock notice data (will be replaced with DB later)
const notices = [
  {
    id: 1,
    title: "Welcome to Korean Slang Club!",
    content: "We're excited to launch our new community platform...",
    date: "2024-01-25",
    important: true,
  },
  {
    id: 2,
    title: "New Course: Korean Slang & Expressions Now Available",
    content: "Learn how Koreans really speak with our newest course...",
    date: "2024-01-20",
    important: true,
  },
  {
    id: 3,
    title: "Community Guidelines Update",
    content: "We've updated our community guidelines to ensure a positive experience...",
    date: "2024-01-15",
    important: false,
  },
  {
    id: 4,
    title: "Maintenance Notice: January 10th",
    content: "Our servers will undergo maintenance on January 10th from 2-4 AM KST...",
    date: "2024-01-08",
    important: false,
  },
  {
    id: 5,
    title: "Holiday Schedule",
    content: "Customer support will have limited availability during the Lunar New Year...",
    date: "2024-01-05",
    important: false,
  },
];

export default function NoticePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notice
            </h1>
            <p className="text-gray-600">
              Stay updated with the latest news and announcements from Korean Slang Club.
            </p>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {notices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notice/${notice.id}`}
                  className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {notice.important && (
                      <span className="flex-shrink-0 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                        Important
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {notice.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                        {notice.content}
                      </p>
                      <span className="text-xs text-gray-400">{notice.date}</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <button className="px-3 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#111827', color: '#ffffff' }}>1</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">2</button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
