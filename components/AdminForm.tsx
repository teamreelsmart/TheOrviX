"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DownloadLink = { quality: string; size: string; link: string };
type TextFieldKey =
  | "title"
  | "poster"
  | "description"
  | "releaseYear"
  | "imdbRating"
  | "genre"
  | "language";

type Props = {
  mode: "add" | "edit";
  initialData?: {
    _id: string;
    title: string;
    poster: string;
    description: string;
    releaseYear: number;
    imdbRating: number;
    genre: string[];
    language: string;
    type: "movie" | "series";
    screenshots: string[];
    downloadLinks: DownloadLink[];
  };
};

export default function AdminForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    poster: initialData?.poster || "",
    description: initialData?.description || "",
    releaseYear: initialData?.releaseYear?.toString() || "",
    imdbRating: initialData?.imdbRating?.toString() || "",
    genre: initialData?.genre?.join(", ") || "",
    language: initialData?.language || "",
    type: initialData?.type || "movie",
    screenshots: initialData?.screenshots?.join("\n") || "",
    downloadLinks: initialData?.downloadLinks || [{ quality: "720p", size: "", link: "" }]
  });

  const updateDownload = (index: number, key: keyof DownloadLink, value: string) => {
    const copy = [...form.downloadLinks];
    copy[index] = { ...copy[index], [key]: value };
    setForm((prev) => ({ ...prev, downloadLinks: copy }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      releaseYear: Number(form.releaseYear),
      imdbRating: Number(form.imdbRating),
      genre: form.genre.split(",").map((g) => g.trim()).filter(Boolean),
      screenshots: form.screenshots.split("\n").map((s) => s.trim()).filter(Boolean)
    };

    const url = mode === "add" ? "/api/admin/add" : "/api/admin/update";
    const body = mode === "add" ? payload : { ...payload, id: initialData?._id };

    const res = await fetch(url, {
      method: mode === "add" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong");
    }
  };

  const textFields: Array<{ label: string; key: TextFieldKey }> = [
    { label: "Title", key: "title" },
    { label: "Poster URL", key: "poster" },
    { label: "Description", key: "description" },
    { label: "Release Year", key: "releaseYear" },
    { label: "IMDb Rating", key: "imdbRating" },
    { label: "Genre (comma separated)", key: "genre" },
    { label: "Language", key: "language" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-panel p-4">
      {textFields.map(({ label, key }) => (
        <div key={key}>
          <label className="mb-1 block text-sm">{label}</label>
          <input
            required
            value={form[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            className="w-full rounded bg-black/30 p-2"
          />
        </div>
      ))}

      <div>
        <label className="mb-1 block text-sm">Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as "movie" | "series" }))}
          className="w-full rounded bg-black/30 p-2"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm">Screenshots (one URL per line)</label>
        <textarea
          value={form.screenshots}
          onChange={(e) => setForm((prev) => ({ ...prev, screenshots: e.target.value }))}
          className="h-24 w-full rounded bg-black/30 p-2"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">Download Links</h3>
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                downloadLinks: [...prev.downloadLinks, { quality: "720p", size: "", link: "" }]
              }))
            }
            className="rounded bg-brand px-3 py-1 text-xs text-black"
          >
            Add Link
          </button>
        </div>

        <div className="space-y-2">
          {form.downloadLinks.map((item, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 rounded bg-black/20 p-2 md:grid-cols-3">
              <input
                placeholder="Quality"
                value={item.quality}
                onChange={(e) => updateDownload(i, "quality", e.target.value)}
                className="rounded bg-black/30 p-2"
              />
              <input
                placeholder="Size"
                value={item.size}
                onChange={(e) => updateDownload(i, "size", e.target.value)}
                className="rounded bg-black/30 p-2"
              />
              <input
                placeholder="Link"
                value={item.link}
                onChange={(e) => updateDownload(i, "link", e.target.value)}
                className="rounded bg-black/30 p-2"
              />
            </div>
          ))}
        </div>
      </div>

      <button disabled={loading} className="rounded bg-brand px-4 py-2 font-semibold text-black">
        {loading ? "Saving..." : mode === "add" ? "Add Movie" : "Update Movie"}
      </button>
    </form>
  );
}
