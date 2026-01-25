import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-8">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              Korean Slang Club
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Discover Korean culture, language, and lifestyle through our
              community.
            </p>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Community</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/community/our-brand"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Our Brand
                </Link>
              </li>
              <li>
                <Link
                  href="/community/life-style"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Life Style
                </Link>
              </li>
              <li>
                <Link
                  href="/community/travel"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/community/drama-movie"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Drama / Movie
                </Link>
              </li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Korean Language Class</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/korean-class"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  View Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/korean-class#beginner"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Beginner
                </Link>
              </li>
              <li>
                <Link
                  href="/korean-class#intermediate"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Intermediate
                </Link>
              </li>
              <li>
                <Link
                  href="/korean-class#advanced"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Advanced
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/notice"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-10 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Korean Slang Club. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
