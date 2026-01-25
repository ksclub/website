import Link from "next/link";

// Mock notice data (will be replaced with DB later)
const notices = [
  {
    id: "1",
    title: "Welcome to Korean Slang Club!",
    content: `We're excited to launch our new community platform!

Korean Slang Club is now officially open. This is a place where you can learn about Korean culture, language, and connect with fellow Korean language enthusiasts from around the world.

What you can do here:
- Explore our community sections: Life Style, Travel, Drama/Movie
- Learn Korean through our comprehensive courses
- Share your experiences and connect with others

We're constantly working to improve your experience. Stay tuned for more updates!

Thank you for being part of our community.

Best regards,
Korean Slang Club Team`,
    date: "2024-01-25",
    important: true,
  },
  {
    id: "2",
    title: "New Course: Korean Slang & Expressions Now Available",
    content: `We're thrilled to announce our newest course: Korean Slang & Expressions!

This course is designed for learners at all levels who want to understand how Koreans really speak in everyday life.

Course Highlights:
- Popular Korean slang used by native speakers
- Expressions from K-dramas and K-pop
- Internet slang and texting abbreviations
- Cultural context for each expression

The course includes 18 lessons over 6 weeks, with video content, practice exercises, and quizzes.

Enroll now and start speaking Korean like a native!`,
    date: "2024-01-20",
    important: true,
  },
  {
    id: "3",
    title: "Community Guidelines Update",
    content: `We've updated our community guidelines to ensure a positive experience for all members.

Key Updates:
1. Be respectful to all community members
2. No spam or promotional content without permission
3. Keep discussions relevant to the topic
4. Report any inappropriate content to moderators

Please review the full guidelines in your account settings.

Thank you for helping us maintain a welcoming community!`,
    date: "2024-01-15",
    important: false,
  },
  {
    id: "4",
    title: "Maintenance Notice: January 10th",
    content: `Our servers will undergo scheduled maintenance on January 10th from 2:00 AM to 4:00 AM KST.

During this time, the website may be temporarily unavailable.

We apologize for any inconvenience and appreciate your patience.`,
    date: "2024-01-08",
    important: false,
  },
  {
    id: "5",
    title: "Holiday Schedule",
    content: `Customer support will have limited availability during the Lunar New Year holiday period.

Holiday Period: February 9-12, 2024

During this time:
- Response times may be longer than usual
- Live chat will be unavailable
- Email support will still be monitored

We'll resume normal operations on February 13th.

Wishing everyone a happy Lunar New Year!`,
    date: "2024-01-05",
    important: false,
  },
];

export function generateStaticParams() {
  return notices.map((notice) => ({
    id: notice.id,
  }));
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Notice not found</h1>
          <Link href="/notice" className="text-blue-600 hover:text-blue-700">
            Back to Notice List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                href="/notice"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Notice
              </Link>
            </div>
            {notice.important && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                  Important
                </span>
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {notice.title}
            </h1>
            <p className="text-gray-500">{notice.date}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10">
              <div className="prose prose-gray max-w-none">
                {notice.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/notice"
                className="px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
              >
                Back to List
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
