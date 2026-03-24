import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import Request from "@/models/Request";

type AdminRequestItem = {
  _id: string;
  movieName: string;
  year?: number;
  language?: string;
  status: "pending" | "completed";
  screenshot?: string;
};

export default async function AdminRequestsPage() {
  await requireAdmin();
  await connectDB();

  const requestsRaw = await Request.find().sort({ createdAt: -1 }).lean();
  const requests = JSON.parse(JSON.stringify(requestsRaw)) as AdminRequestItem[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Movie Requests</h1>
      <div className="space-y-2">
        {requests.map((req) => (
          <div key={req._id} className="rounded bg-panel p-4">
            <p className="font-semibold">{req.movieName}</p>
            <p className="text-sm text-white/70">
              {req.year || "Unknown year"} • {req.language || "Unknown language"} • Status: {req.status}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {req.screenshot && (
                <a href={req.screenshot} target="_blank" rel="noreferrer" className="rounded bg-black/30 px-3 py-1">
                  View screenshot
                </a>
              )}
              <form action={`/api/admin/requests/${req._id}`} method="POST">
                <input type="hidden" name="action" value="complete" />
                <button className="rounded bg-green-600 px-3 py-1">Mark completed</button>
              </form>
              <form action={`/api/admin/requests/${req._id}`} method="POST">
                <input type="hidden" name="action" value="delete" />
                <button className="rounded bg-red-500 px-3 py-1">Delete</button>
              </form>
              <Link href="/admin/add-movie" className="rounded bg-brand px-3 py-1 text-black">
                Add movie from request
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
