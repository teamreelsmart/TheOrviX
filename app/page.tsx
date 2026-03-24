import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import RequestForm from "@/components/RequestForm";
import { Movie } from "@/types";

async function getMovies(page: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/movies?page=${page}`, {
    cache: "no-store"
  });
  if (!res.ok) return { movies: [], totalPages: 1 };
  return res.json();
}

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || "1");
  const { movies, totalPages }: { movies: Movie[]; totalPages: number } = await getMovies(page);

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="mb-5 text-2xl font-bold">Latest Movies & Series</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {page > 1 && (
            <Link href={`/?page=${page - 1}`} className="rounded bg-panel px-4 py-2">
              Prev
            </Link>
          )}
          <span className="text-sm text-white/70">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={`/?page=${page + 1}`} className="rounded bg-panel px-4 py-2">
              Next
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-6">
        <RequestForm />
      </section>

      <Footer />
    </main>
  );
}
