import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section - Custom Background Image */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/hero-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              color: "#ffffff",
              textShadow:
                "0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Welcome to
            <br />
            <span style={{ color: "#ffffff" }}>Korean Slang Club</span>
          </h1>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{
              color: "#ffffff",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            Discover Korean culture, lifestyle, and language through our vibrant
            community. Join us to explore everything Korean!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community/our-brand"
              className="px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "#C8102E", color: "#ffffff" }}
            >
              Explore Community
            </Link>
            <Link
              href="/korean-class"
              className="px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "#2B4F81", color: "#ffffff" }}
            >
              Start Learning Korean
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: "#FAF9F6" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: "#7BA05B20", color: "#5B8C5A" }}
            >
              What We Offer
            </span>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#2D2926" }}
            >
              Discover Korean Culture
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#57534e" }}>
              From language courses to cultural insights, we have everything you
              need to immerse yourself in Korean culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Life Style */}
            <Link href="/community/life-style" className="group">
              <div className="bg-white rounded-2xl p-6 card-hover">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#7BA05B20" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#5B8C5A" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2 transition-colors group-hover:text-[#C8102E]"
                  style={{ color: "#2D2926" }}
                >
                  Life Style
                </h3>
                <p className="text-sm" style={{ color: "#78716c" }}>
                  Tips and insights for living in Korea
                </p>
              </div>
            </Link>

            {/* Travel */}
            <Link href="/community/travel" className="group">
              <div className="bg-white rounded-2xl p-6 card-hover">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#2B4F8120" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#2B4F81" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2 transition-colors group-hover:text-[#C8102E]"
                  style={{ color: "#2D2926" }}
                >
                  Travel
                </h3>
                <p className="text-sm" style={{ color: "#78716c" }}>
                  Explore Korea&apos;s hidden gems
                </p>
              </div>
            </Link>

            {/* Drama / Movie */}
            <Link href="/community/drama-movie" className="group">
              <div className="bg-white rounded-2xl p-6 card-hover">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#6B4C7A20" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#6B4C7A" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2 transition-colors group-hover:text-[#C8102E]"
                  style={{ color: "#2D2926" }}
                >
                  Drama / Movie
                </h3>
                <p className="text-sm" style={{ color: "#78716c" }}>
                  Discussions on Korean entertainment
                </p>
              </div>
            </Link>

            {/* Korean Language Class */}
            <Link href="/korean-class" className="group">
              <div className="bg-white rounded-2xl p-6 card-hover">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#E07C3E20" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#E07C3E" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2 transition-colors group-hover:text-[#C8102E]"
                  style={{ color: "#2D2926" }}
                >
                  Korean Language Class
                </h3>
                <p className="text-sm" style={{ color: "#78716c" }}>
                  Learn Korean with our courses
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "#FDF2F4" }}>
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#2D2926" }}
          >
            Ready to Learn Korean?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#57534e" }}>
            Start your Korean language journey today with our comprehensive
            courses designed for all levels.
          </p>
          <Link
            href="/korean-class"
            className="inline-block px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
            style={{ backgroundColor: "#C8102E", color: "#ffffff" }}
          >
            View Courses
          </Link>
        </div>
      </section>
    </div>
  );
}
