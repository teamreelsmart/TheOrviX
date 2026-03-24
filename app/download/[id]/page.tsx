import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import MovieModel from "@/models/Movie";
import { Movie } from "@/types";

async function getMovie(id: string): Promise<Movie | null> {
  await connectDB();
  const movie = await MovieModel.findById(id).lean();
  if (!movie) return null;
  return JSON.parse(JSON.stringify(movie)) as Movie;
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
  const movie = await getMovie(id);

  const link = movie?.downloadLinks?.find((x) => x.quality === quality)?.link;

  if (link) {
    redirect(link);
  }

  return <div className="p-6">Invalid download link.</div>;
}
