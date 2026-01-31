import PostContent from "./PostContent";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Return placeholders for static export - actual content loaded client-side
  const categories = ["our-brand", "life-style", "travel", "drama-movie"];
  return categories.map(category => ({ category, id: "placeholder" }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  return <PostContent category={category} id={id} />;
}
