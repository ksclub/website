import EditContent from "./EditContent";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  return <EditContent category={category} id={id} />;
}
