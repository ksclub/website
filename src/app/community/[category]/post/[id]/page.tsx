import PostContent from "./PostContent";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  return <PostContent category={category} id={id} />;
}
