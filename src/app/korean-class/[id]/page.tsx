"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { notFound } from "next/navigation";

// Course data - same as main page for consistency
const courses = [
  {
    id: 1,
    slug: "super-beginner",
    title: "Super Beginner Class",
    level: "Super Beginner",
    description:
      "This package is suitable for those who are just starting to learn Korean. Focus on learning the basics.",
    notice:
      "Those who have paid for a class will have a 1:1 level test before the class.",
    purchaseNote:
      "When purchasing the course, please make sure to fill in the 'Email time (KST)' option with the time you'd like to receive your lessons by email (Korean Standard Time).",
    duration: "6 weeks",
    lessons: 18,
    originalPrice: 100,
    salePrice: 79.99,
    features: [
      "Learn Hangul from scratch",
      "Basic pronunciation",
      "Simple greetings & phrases",
      "Korean writing practice",
    ],
    popular: true,
    thumbnail: "/course-detail/super-beginner-cover.png",
    detailImages: [
      "/course-detail/001.png",
      "/course-detail/002.png",
      "/course-detail/003.png",
      "/course-detail/004.png",
      "/course-detail/005.png",
      "/course-detail/006.png",
      "/course-detail/007.png",
      "/course-detail/008.png",
      "/course-detail/009.png",
      "/course-detail/010.png",
    ],
    plans: [
      {
        period: "1 month",
        times: 22,
        originalPrice: 100,
        salePrice: 79.99,
        perClass: 3.6,
      },
      {
        period: "3 months",
        times: 66,
        originalPrice: 240,
        salePrice: 199.99,
        perClass: 3.0,
      },
    ],
  },
  {
    id: 2,
    slug: "beginner",
    title: "Beginner Class",
    level: "Beginner",
    description:
      "Build your foundation in Korean. Learn essential grammar patterns, vocabulary, and everyday conversations.",
    notice:
      "Those who have paid for a class will have a 1:1 level test before the class.",
    purchaseNote:
      "When purchasing the course, please make sure to fill in the 'Email time (KST)' option with the time you'd like to receive your lessons by email (Korean Standard Time).",
    duration: "8 weeks",
    lessons: 24,
    originalPrice: 130,
    salePrice: 99.99,
    features: [
      "Essential grammar patterns",
      "Daily vocabulary",
      "Basic conversations",
      "Listening practice",
    ],
    popular: true,
    thumbnail: "/course-detail/001.png",
    detailImages: [
      "/course-detail/001.png",
      "/course-detail/002.png",
      "/course-detail/003.png",
      "/course-detail/004.png",
      "/course-detail/005.png",
      "/course-detail/006.png",
      "/course-detail/007.png",
      "/course-detail/008.png",
      "/course-detail/009.png",
      "/course-detail/010.png",
    ],
    plans: [
      {
        period: "1 month",
        times: 22,
        originalPrice: 130,
        salePrice: 99.99,
        perClass: 4.5,
      },
      {
        period: "3 months",
        times: 66,
        originalPrice: 300,
        salePrice: 249.99,
        perClass: 3.8,
      },
    ],
  },
  {
    id: 3,
    slug: "advanced",
    title: "Advanced Class",
    level: "Advanced",
    description:
      "Master complex Korean expressions. Focus on nuanced grammar, formal language, and natural fluency.",
    notice:
      "Those who have paid for a class will have a 1:1 level test before the class.",
    purchaseNote:
      "When purchasing the course, please make sure to fill in the 'Email time (KST)' option with the time you'd like to receive your lessons by email (Korean Standard Time).",
    duration: "10 weeks",
    lessons: 30,
    originalPrice: 200,
    salePrice: 149.99,
    features: [
      "Complex grammar structures",
      "Formal & informal speech",
      "Natural expressions",
      "Cultural nuances",
    ],
    popular: false,
    thumbnail: "/course-detail/advanced-cover.png",
    detailImages: [
      "/course-detail/001.png",
      "/course-detail/002.png",
      "/course-detail/003.png",
      "/course-detail/004.png",
      "/course-detail/005.png",
      "/course-detail/006.png",
      "/course-detail/007.png",
      "/course-detail/008.png",
      "/course-detail/009.png",
      "/course-detail/010.png",
    ],
    plans: [
      {
        period: "1 month",
        times: 22,
        originalPrice: 200,
        salePrice: 149.99,
        perClass: 6.8,
      },
      {
        period: "3 months",
        times: 66,
        originalPrice: 450,
        salePrice: 349.99,
        perClass: 5.3,
      },
    ],
  },
];

// Sample reviews
const reviews = [
  {
    id: 1,
    author: "Sarah K.",
    rating: 5,
    content:
      "I'm still getting used to speaking mainly in Korean during class. I think there's still a lot of nervousness around saying something wrong or pushing myself out of my comfort zone, but I've realized the teacher won't judge if I say something wrong so I'm really thankful for his patience!",
    date: "2024-01-15",
  },
  {
    id: 2,
    author: "Antonio M.",
    rating: 5,
    content:
      "I like very much going through these books. I want to progress with them all the way to the end. I also very much appreciate you being willing to go over other materials I find to help me with strengthening things even if it is a review of things you already taught me. At my age, repeating is something I do to learn each time getting deeper understanding.",
    date: "2024-01-10",
  },
  {
    id: 3,
    author: "Emily Z.",
    rating: 5,
    content:
      "The class was really interesting. It is good for students/people who are learning Korean for the first time. The class is interactive and the teacher explains everything in detail.",
    date: "2024-01-05",
  },
  {
    id: 4,
    author: "Kapan G.",
    rating: 5,
    content:
      "Thank YOU too for today! Thanks for being patient, and cheering me up as well as customizing the class accordingly. Always grateful :)",
    date: "2023-12-28",
  },
  {
    id: 5,
    author: "Emma L.",
    rating: 5,
    content:
      "Sangho Teacher is attentive and patient. He was immediately easy to talk to and made a point of assessing my level and making recommendations for my needs and goals! The vibe was relaxed and made me feel very comfortable, so I had a lot of fun while learning. :)",
    date: "2023-12-20",
  },
];

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "qna">(
    "details",
  );
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [emailTime, setEmailTime] = useState<string>("");

  // Find course by id or slug
  const course = courses.find((c) => c.id === Number(id) || c.slug === id);

  if (!course) {
    notFound();
  }

  const handleBuyNow = () => {
    if (!emailTime) {
      alert("Please enter your preferred email time (KST).");
      return;
    }
    if (!selectedPlan) {
      alert("Please select a period.");
      return;
    }
    alert(
      `Purchase will be available soon!\nPlan: ${selectedPlan}\nEmail Time: ${emailTime}`,
    );
  };

  const handleAddToCart = () => {
    if (!emailTime) {
      alert("Please enter your preferred email time (KST).");
      return;
    }
    if (!selectedPlan) {
      alert("Please select a period.");
      return;
    }
    alert(`Added to cart!\nPlan: ${selectedPlan}\nEmail Time: ${emailTime}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link
            href="/korean-class"
            className="hover:text-gray-900 transition-colors"
          >
            Class
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-900">{course.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title & Price */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {course.title}
                </h1>
                <span
                  className="px-2 py-1 text-xs font-medium rounded mt-2 shrink-0"
                  style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
                >
                  ON SALE
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  ${course.salePrice}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${course.originalPrice}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-600 mb-4">{course.description}</p>
              <p className="text-gray-700">
                <span className="text-red-500 font-bold">!</span>{" "}
                {course.notice}{" "}
                <span className="text-red-500 font-bold">!</span>
              </p>
            </div>

            {/* Purchase Note */}
            <div className="mb-6">
              <p className="text-gray-700">
                <span className="text-yellow-500">*</span>
                <span className="text-orange-500 font-medium">
                  When purchasing the course
                </span>
                ,{" "}
                {course.purchaseNote.replace(
                  "When purchasing the course, ",
                  "",
                )}
                <span className="text-yellow-500">*</span>
              </p>
            </div>

            {/* Email Time Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email time (KST) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={emailTime}
                onChange={(e) => setEmailTime(e.target.value)}
                placeholder="Required"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Period Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">Period (Required)</option>
                {course.plans.map((plan, index) => (
                  <option key={index} value={plan.period}>
                    {plan.period} - ${plan.salePrice} (${plan.perClass}/class)
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: "#1f2937" }}
              >
                Buy now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Add to cart
              </button>
              <button className="px-4 py-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-gray-500 text-sm">3</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          <div className="flex justify-center border-b border-gray-200">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeTab === "details"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Details
              {activeTab === "details" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <span className="text-gray-300 self-center">/</span>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeTab === "reviews"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Reviews ({reviews.length})
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <span className="text-gray-300 self-center">/</span>
            <button
              onClick={() => setActiveTab("qna")}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeTab === "qna"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Q&A (0)
              {activeTab === "qna" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          {activeTab === "details" && (
            <div className="max-w-3xl mx-auto">
              {course.detailImages.map((image, index) => (
                <div key={index} className="mb-4">
                  <Image
                    src={image}
                    alt={`Course detail ${index + 1}`}
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl mx-auto">
              {/* Review Summary */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Learner Satisfaction
                </h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  4.98 <span className="text-2xl text-gray-500">/5</span>
                </div>
                <div className="flex justify-center gap-1 text-yellow-400 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {review.author}
                      </span>
                      <div className="flex text-orange-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "qna" && (
            <div className="max-w-3xl mx-auto text-center py-12">
              <p className="text-gray-500">No questions yet.</p>
              <button className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Ask a Question
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
