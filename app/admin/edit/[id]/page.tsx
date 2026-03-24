import { requireAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";
import AdminForm from "@/components/AdminForm";

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  await connectDB();
  const { id } = await params;

  const movie = await Movie.findById(id).lean();

  if (!movie) {
    return <div className="p-6">Movie not found.</div>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Edit Movie</h1>
      <AdminForm mode="edit" initialData={JSON.parse(JSON.stringify(movie))} />
    </main>
  );
}
