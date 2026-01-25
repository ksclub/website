import BoardLayout from "@/components/BoardLayout";
import { Post } from "@/components/PostCard";

// Mock data (will be replaced with DB later)
const posts: Post[] = [
  {
    id: 1,
    title: "Top 10 K-Dramas of 2024 So Far",
    excerpt: "The must-watch Korean dramas that everyone is talking about...",
    author: "DramaAddict",
    views: 2345,
    likes: 156,
    comments: 45,
    date: "2024-01-23",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 2,
    title: "Korean Slang from Queen of Tears",
    excerpt: "Learn the trendy expressions used in the hit drama...",
    author: "KDramaKorean",
    views: 1876,
    likes: 123,
    comments: 34,
    date: "2024-01-20",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 3,
    title: "Oscar-Winning Korean Films to Watch",
    excerpt: "From Parasite to beyond - Korean cinema's finest moments...",
    author: "FilmCritic",
    views: 1543,
    likes: 98,
    comments: 28,
    date: "2024-01-17",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 4,
    title: "Understanding Korean Humor in Dramas",
    excerpt: "Why some jokes don't translate - cultural context explained...",
    author: "CultureNerd",
    views: 1234,
    likes: 76,
    comments: 22,
    date: "2024-01-14",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 5,
    title: "K-Drama Filming Locations You Can Visit",
    excerpt: "Travel to the real places where your favorite scenes were shot...",
    author: "LocationScout",
    views: 987,
    likes: 64,
    comments: 18,
    date: "2024-01-11",
    thumbnail: "/placeholder.jpg",
  },
  {
    id: 6,
    title: "Best Netflix Korean Movies 2024",
    excerpt: "New releases and hidden gems on Netflix Korea...",
    author: "NetflixPro",
    views: 856,
    likes: 52,
    comments: 15,
    date: "2024-01-08",
    thumbnail: "/placeholder.jpg",
  },
];

export default function DramaMoviePage() {
  return (
    <BoardLayout
      title="Drama / Movie"
      description="Discuss Korean dramas, films, and entertainment. Share recommendations and learn Korean through media."
      category="drama-movie"
      posts={posts}
    />
  );
}
