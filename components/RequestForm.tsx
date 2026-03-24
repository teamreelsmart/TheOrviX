"use client";

import { useState } from "react";

export default function RequestForm() {
  const [movieName, setMovieName] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let screenshot = "";
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        setLoading(false);
        alert(uploadData.error || "Image upload failed");
        return;
      }
      screenshot = uploadData.url;
    }

    const res = await fetch("/api/request/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieName, year: year ? Number(year) : undefined, language, screenshot })
    });

    setLoading(false);

    if (res.ok) {
      setMovieName("");
      setYear("");
      setLanguage("");
      setFile(null);
      alert("Request sent successfully!");
    } else {
      const data = await res.json();
      alert(data.error || "Failed to submit request");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl bg-panel p-4">
      <h3 className="text-lg font-semibold">Request Movie</h3>
      <input
        required
        placeholder="Movie name"
        className="w-full rounded bg-black/30 p-2"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />
      <input
        placeholder="Year (optional)"
        className="w-full rounded bg-black/30 p-2"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        placeholder="Language (optional)"
        className="w-full rounded bg-black/30 p-2"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button disabled={loading} className="rounded bg-brand px-4 py-2 font-semibold text-black">
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
