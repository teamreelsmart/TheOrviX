import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";

type DashboardMovie = {
  _id: { toString: () => string };
  title: string;
  releaseYear?: string | number;
};

export default async function AdminDashboard() {
  await requireAdmin();
  await connectDB();

  const totalMovies = await Movie.countDocuments();
  const latest = await Movie.find().sort({ createdAt: -1 }).limit(10).lean<DashboardMovie[]>();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-white/70">CineNest • Telegram @TheOrviX • Dev @TheOrviZ</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/add-movie" className="rounded bg-brand px-4 py-2 font-semibold text-black">
            Add Movie
          </Link>
          <Link href="/admin/requests" className="rounded bg-panel px-4 py-2">
            Requests
          </Link>
        </div>
      </header>

      <p className="mb-4 rounded bg-panel p-4">Total movies: {totalMovies}</p>

      <div className="space-y-2">
        {latest.map((movie) => (
          <div key={movie._id.toString()} className="flex items-center justify-between rounded bg-panel p-3">
            <div>
              <p className="font-medium">{movie.title}</p>
              <p className="text-xs text-white/70">{movie.releaseYear}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/edit/${movie._id}`} className="rounded bg-black/30 px-3 py-1 text-sm">
                Edit
              </Link>
              <form action="/api/admin/delete" method="POST">
                <input type="hidden" name="id" value={movie._id.toString()} />
                <button className="rounded bg-red-500 px-3 py-1 text-sm">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
