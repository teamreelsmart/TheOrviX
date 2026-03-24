import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import MovieModel from "@/models/Movie";

async function getRedirectLink(id: string, quality?: string) {
  await connectDB();
  const movie = await MovieModel.findById(id).lean();
  if (!movie || !quality) return null;

  return movie.downloadLinks?.find((x: { quality: string }) => x.quality === quality)?.link || null;
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
  const link = await getRedirectLink(id, quality);

  if (link) {
    redirect(link);
  }

  return <div className="p-6">Invalid download link.</div>;
}
