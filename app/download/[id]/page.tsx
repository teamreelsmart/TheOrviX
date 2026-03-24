import { redirect } from "next/navigation";

async function getMovie(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/movie/${id}`, {
    cache: "no-store"
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DownloadRedirect({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ quality?: string }>;
}) {
  const { id } = await params;
  const { quality } = await searchParams;
  const data = await getMovie(id);

  const link = data?.movie?.downloadLinks?.find((x: { quality: string }) => x.quality === quality)?.link;

  if (link) {
    redirect(link);
  }

  return <div className="p-6">Invalid download link.</div>;
}
