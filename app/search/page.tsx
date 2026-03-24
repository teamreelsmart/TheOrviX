import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";

async function getData(query: string, genre: string, year: string, language: string, type: string) {
  const params = new URLSearchParams({ query, genre, year, language, type });
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/movies?${params.toString()}`, {
    cache: "no-store"
  });
  if (!res.ok) return { movies: [] };
  return res.json();
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string; genre?: string; year?: string; language?: string; type?: string }>;
}) {
  const sp = await searchParams;
  const { movies }: { movies: Movie[] } = await getData(
    sp.query || "",
    sp.genre || "",
    sp.year || "",
    sp.language || "",
    sp.type || ""
  );

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-6">
        <form className="mb-6 grid grid-cols-1 gap-3 rounded-xl bg-panel p-4 md:grid-cols-5">
          <input name="query" placeholder="Search title" defaultValue={sp.query} className="rounded bg-black/30 p-2" />
          <input name="genre" placeholder="Genre" defaultValue={sp.genre} className="rounded bg-black/30 p-2" />
          <input name="year" placeholder="Year" defaultValue={sp.year} className="rounded bg-black/30 p-2" />
          <input
            name="language"
            placeholder="Language"
            defaultValue={sp.language}
            className="rounded bg-black/30 p-2"
          />
          <select name="type" defaultValue={sp.type || ""} className="rounded bg-black/30 p-2">
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
          <button className="rounded bg-brand px-4 py-2 font-semibold text-black md:col-span-5">Apply Filters</button>
        </form>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
