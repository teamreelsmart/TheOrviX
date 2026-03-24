import { requireAdmin } from "@/lib/auth";
import AdminForm from "@/components/AdminForm";

export default async function AddMoviePage() {
  await requireAdmin();
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Add Movie</h1>
      <AdminForm mode="add" />
    </main>
  );
}
