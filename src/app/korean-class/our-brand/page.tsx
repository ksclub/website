import Link from "next/link";

export default function KoreanClassOurBrandPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Korean Language Class
            </h1>
            <p className="text-lg text-gray-600">
              Your gateway to mastering the Korean language
            </p>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                About Our Korean Class
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Korean Slang Club's Korean Language Class is designed to help learners at all levels achieve fluency through practical, real-world Korean.
                </p>
                <p>
                  Our courses go beyond traditional textbook learning. We focus on the Korean that's actually spoken in everyday conversations, workplaces, and social settings.
                </p>
                <p>
                  Whether you're a complete beginner or looking to refine your skills, our curriculum adapts to your needs and learning pace.
                </p>
                <p>
                  Join our community of Korean learners and experience the difference of learning Korean the authentic way.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
                  <div className="text-sm text-gray-500">Courses Available</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">96+</div>
                  <div className="text-sm text-gray-500">Video Lessons</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">All</div>
                  <div className="text-sm text-gray-500">Skill Levels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Explore our courses and find the perfect fit for your Korean learning journey.
          </p>
          <Link
            href="/korean-class"
            className="inline-block px-8 py-4 rounded-full font-medium transition-colors"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          >
            View All Courses
          </Link>
        </div>
      </section>
    </div>
  );
}
