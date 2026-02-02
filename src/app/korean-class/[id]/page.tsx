"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect, useCallback } from "react";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { enrollmentApi, paymentApi, courseApi, Course } from "@/lib/api";
import PayPalButton from "@/components/PayPalButton";

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
  const router = useRouter();
  const { user, token } = useAuth();
  const [activeSection, setActiveSection] = useState<"details" | "reviews" | "qna">("details");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [emailTime, setEmailTime] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentEnrollmentId, setCurrentEnrollmentId] = useState<string | null>(null);
  const [dbCourse, setDbCourse] = useState<Course | null>(null);
  const [dbCoursesLoaded, setDbCoursesLoaded] = useState(false);

  // Fetch DB courses to get real course ID
  useEffect(() => {
    const fetchDbCourses = async () => {
      try {
        const { courses: dbCourses } = await courseApi.getAll();
        // Find matching course by title
        const course = courses.find((c) => c.id === Number(id) || c.slug === id);
        if (course) {
          const matched = dbCourses.find(
            (dc) => dc.title.toLowerCase() === course.title.toLowerCase() ||
                    dc.level.toLowerCase() === course.level.toLowerCase()
          );
          if (matched) {
            setDbCourse(matched);
          }
        }
      } catch (error) {
        console.error("Failed to fetch DB courses:", error);
      } finally {
        setDbCoursesLoaded(true);
      }
    };
    fetchDbCourses();
  }, [id]);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 160; // header + sticky tabs height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["details", "reviews", "qna"];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section as "details" | "reviews" | "qna");
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find course by id or slug
  const course = courses.find((c) => c.id === Number(id) || c.slug === id);

  if (!course) {
    notFound();
  }

  const selectedPlanData = course.plans.find((p) => p.period === selectedPlan);

  const handleCreatePayPalOrder = useCallback(async (): Promise<string> => {
    if (!token || !user) {
      router.push(`/auth/login?redirect=/korean-class/${id}`);
      throw new Error("Please login to continue");
    }

    if (!emailTime || !selectedPlan || !selectedPlanData) {
      throw new Error("Please fill in all required fields");
    }

    if (!dbCourse) {
      throw new Error("Course not available for purchase. Please contact support.");
    }

    try {
      console.log("Creating enrollment...", { courseId: dbCourse.id, period: selectedPlan, price: selectedPlanData.salePrice });

      // Create enrollment first
      const enrollmentResult = await enrollmentApi.create(token, {
        courseId: dbCourse.id,
        period: selectedPlan,
        price: selectedPlanData.salePrice,
        emailTime: emailTime,
      });

      console.log("Enrollment created:", enrollmentResult);
      setCurrentEnrollmentId(enrollmentResult.enrollment.id);

      // Create PayPal order
      console.log("Creating PayPal order...");
      const paymentResult = await paymentApi.createOrder(token, enrollmentResult.enrollment.id);
      console.log("PayPal order created:", paymentResult);

      return paymentResult.orderId;
    } catch (error) {
      console.error("Payment creation error:", error);
      setIsProcessing(false);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }, [token, user, emailTime, selectedPlan, selectedPlanData, dbCourse, id, router]);

  const handleApprovePayment = useCallback(async (orderId: string): Promise<void> => {
    if (!token) {
      throw new Error("Please login to continue");
    }

    setIsProcessing(true);

    try {
      console.log("Capturing payment...", orderId);
      await paymentApi.captureOrder(token, orderId);
      console.log("Payment captured successfully!");
      setPaymentSuccess(true);
      setIsProcessing(false);
    } catch (error) {
      console.error("Capture error:", error);
      setIsProcessing(false);
      throw error;
    }
  }, [token]);

  const handlePaymentError = useCallback((error: Error) => {
    console.error("Payment error:", error);
    setIsProcessing(false);
    alert("Payment failed. Please try again.");
  }, []);

  const handlePaymentCancel = useCallback(() => {
    console.log("Payment cancelled by user");
    setIsProcessing(false);
  }, []);

  const handleBuyNow = () => {
    if (!user || !token) {
      router.push(`/auth/login?redirect=/korean-class/${id}`);
      return;
    }
    if (!emailTime) {
      alert("Please enter your preferred email time (KST).");
      return;
    }
    if (!selectedPlan) {
      alert("Please select a period.");
      return;
    }
    // PayPal button will handle the rest
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

  const isFormValid = emailTime.trim() !== "" && selectedPlan !== "" && dbCourse !== null;

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

            {/* Payment Success Message */}
            {paymentSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-800 font-medium">Payment successful! Thank you for your purchase.</p>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Check your email for course details. You can also view your enrollment in{" "}
                  <Link href="/mypage" className="underline">My Page</Link>.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {!paymentSuccess && (
              <div className="space-y-3">
                {/* PayPal Button */}
                {user && token ? (
                  <PayPalButton
                    onCreateOrder={handleCreatePayPalOrder}
                    onApprove={handleApprovePayment}
                    onError={handlePaymentError}
                    onCancel={handlePaymentCancel}
                    disabled={!isFormValid}
                  />
                ) : (
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-lg font-medium text-white transition-colors"
                    style={{ backgroundColor: "#1f2937" }}
                  >
                    Login to Buy
                  </button>
                )}

                {isProcessing && (
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                    <span>Processing payment...</span>
                  </div>
                )}

                              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Tabs Section */}
      <section className="sticky top-[104px] z-40 bg-white/95 backdrop-blur-sm border-t border-b border-gray-200 mt-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          <div className="flex justify-center">
            <button
              onClick={() => scrollToSection("details")}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeSection === "details"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Details
              {activeSection === "details" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <span className="text-gray-300 self-center">/</span>
            <button
              onClick={() => scrollToSection("reviews")}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeSection === "reviews"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Reviews ({reviews.length})
              {activeSection === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <span className="text-gray-300 self-center">/</span>
            <button
              onClick={() => scrollToSection("qna")}
              className={`px-8 py-4 text-lg font-medium transition-colors relative ${
                activeSection === "qna"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Q&A (0)
              {activeSection === "qna" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
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
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto">
            {/* Review Summary */}
            <div className="bg-white rounded-2xl p-8 mb-8 text-center shadow-sm">
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
                  className="bg-white rounded-xl p-6 shadow-sm"
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
        </div>
      </section>

      {/* Q&A Section */}
      <section id="qna" className="py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Q&A</h3>
            <p className="text-gray-500 mb-6">No questions yet.</p>
            <button
              className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
            >
              Ask a Question
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
