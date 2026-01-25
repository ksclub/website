import BoardLayout from "@/components/BoardLayout";
import { Post } from "@/components/PostCard";

// Mock data (will be replaced with DB later)
const posts: Post[] = [
  {
    id: 1,
    title: "Best Cafes to Work From in Seoul",
    excerpt: "Discover the top cafes with great wifi and ambiance for remote workers in Seoul...",
    author: "CafeHopper",
    views: 856,
    likes: 45,
    comments: 12,
    date: "2024-01-20",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 2,
    title: "Guide to Korean Banking for Foreigners",
    excerpt: "Everything you need to know about opening a bank account in Korea...",
    author: "ExpatGuide",
    views: 723,
    likes: 38,
    comments: 8,
    date: "2024-01-18",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 3,
    title: "Apartment Hunting in Seoul: Tips & Tricks",
    excerpt: "From understanding jeonse to finding the best neighborhoods...",
    author: "SeoulLiving",
    views: 612,
    likes: 29,
    comments: 15,
    date: "2024-01-15",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 4,
    title: "Korean Food Delivery Apps Explained",
    excerpt: "How to use Baedal Minjok, Yogiyo, and Coupang Eats like a pro...",
    author: "FoodieInSeoul",
    views: 534,
    likes: 42,
    comments: 7,
    date: "2024-01-12",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 5,
    title: "Healthcare in Korea: A Complete Guide",
    excerpt: "Understanding the Korean health insurance system and finding doctors...",
    author: "HealthyInKorea",
    views: 489,
    likes: 35,
    comments: 11,
    date: "2024-01-10",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 6,
    title: "Making Korean Friends: Social Tips",
    excerpt: "Cultural insights on building genuine friendships in Korea...",
    author: "SocialButterfly",
    views: 445,
    likes: 28,
    comments: 9,
    date: "2024-01-08",
    thumbnail: "/placeholder.jpg",
  },
];

export default function LifeStylePage() {
  return (
    <BoardLayout
      title="Life Style"
      description="Tips, guides, and insights for living your best life in Korea. From daily essentials to cultural experiences."
      category="life-style"
      posts={posts}
    />
  );
}
