import Image from "next/image";
import Navbar from "@/components/Navbar";
import connectDB from "@/lib/db";
import MovieModel from "@/models/Movie";
import { Movie } from "@/types";

async function getMovie(slug: string): Promise<Movie | null> {
  await connectDB();
  const movie = await MovieModel.findOne({ slug }).lean();
  if (!movie) return null;
  return JSON.parse(JSON.stringify(movie)) as Movie;
}

export default async function MovieDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = await getMovie(slug);

  if (!movie) {
    return <div className="p-6">Movie not found.</div>;
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[300px_1fr]">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
          <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-sm text-white/70">
            {movie.releaseYear} • {movie.language} • {movie.type.toUpperCase()} • IMDb {movie.imdbRating}
          </p>
          <p className="mt-4 text-white/90">{movie.description}</p>

          <div className="mt-6 grid gap-3">
            {movie.downloadLinks.map((dl, i) => (
              <a
                key={i}
                href={`/download/${movie._id}?quality=${encodeURIComponent(dl.quality)}`}
                className="inline-flex w-fit items-center rounded bg-brand px-4 py-2 font-semibold text-black"
              >
                Watch/Download {dl.quality} ({dl.size})
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
