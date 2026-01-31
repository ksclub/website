import NoticeContent from "./NoticeContent";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Return placeholder for static export - actual content loaded client-side
  return [{ id: "placeholder" }];
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NoticeContent id={id} />;
}
