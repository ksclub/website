import BoardLayout from "@/components/BoardLayout";
import { Post } from "@/components/PostCard";

// Mock data (will be replaced with DB later)
const posts: Post[] = [
  {
    id: 1,
    title: "Hidden Gems of Jeju Island",
    excerpt: "Beyond the tourist spots - discover Jeju's secret beautiful places...",
    author: "JejuExplorer",
    views: 1234,
    likes: 89,
    comments: 23,
    date: "2024-01-22",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 2,
    title: "Weekend Trip to Busan: Complete Guide",
    excerpt: "Everything you need for a perfect weekend getaway to Busan...",
    author: "TravelKorea",
    views: 987,
    likes: 67,
    comments: 18,
    date: "2024-01-19",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 3,
    title: "Best Cherry Blossom Spots in Korea",
    excerpt: "Where to see the most beautiful cherry blossoms this spring...",
    author: "SeasonalTraveler",
    views: 876,
    likes: 54,
    comments: 14,
    date: "2024-01-16",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 4,
    title: "Traditional Villages Worth Visiting",
    excerpt: "Step back in time at Korea's most beautiful hanok villages...",
    author: "HistoryBuff",
    views: 723,
    likes: 41,
    comments: 9,
    date: "2024-01-13",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 5,
    title: "Mountain Hiking: Beginner's Guide",
    excerpt: "The best mountains for first-time hikers in Korea...",
    author: "MountainLover",
    views: 645,
    likes: 38,
    comments: 12,
    date: "2024-01-10",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 6,
    title: "Korean Temple Stay Experience",
    excerpt: "What to expect from a peaceful temple stay retreat...",
    author: "ZenSeeker",
    views: 534,
    likes: 32,
    comments: 7,
    date: "2024-01-07",
    thumbnail: "/placeholder.jpg",
  },
];

export default function TravelPage() {
  return (
    <BoardLayout
      title="Travel"
      description="Explore Korea's amazing destinations. From hidden gems to popular spots, find your next adventure."
      category="travel"
      posts={posts}
    />
  );
}
