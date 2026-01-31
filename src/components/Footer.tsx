import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#FAF9F6", borderTop: "1px solid #e7e5e4" }}
      className="pt-8"
    >
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <Image
                src="/logo2.png"
                alt="Korean Slang Club"
                width={40}
                height={40}
              />
              <h3 className="text-xl font-bold" style={{ color: "#2D2926" }}>
                Korean Slang Club
              </h3>
            </div>
            <p className="leading-relaxed" style={{ color: "#78716c" }}>
              Discover Korean culture, language, and lifestyle through our
              community.
            </p>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: "#2D2926" }}>
              Community
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/community/our-brand"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  Our Brand
                </Link>
              </li>
              <li>
                <Link
                  href="/community/life-style"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  Life Style
                </Link>
              </li>
              <li>
                <Link
                  href="/community/travel"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/community/drama-movie"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  Drama / Movie
                </Link>
              </li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: "#2D2926" }}>
              Korean Language Class
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/korean-class"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  View Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: "#2D2926" }}>
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/notice"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[#C8102E]"
                  style={{ color: "#78716c" }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-10 text-center pb-4"
          style={{ borderTop: "1px solid #e7e5e4" }}
        >
          <p style={{ color: "#a8a29e" }}>
            &copy; {new Date().getFullYear()} Korean Slang Club. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
