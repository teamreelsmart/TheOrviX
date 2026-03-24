"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
      return;
    }

    const data = await res.json();
    alert(data.error || "Invalid credentials");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form onSubmit={login} className="w-full space-y-4 rounded-xl bg-panel p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-sm text-white/70">CineNest Admin • @TheOrviX • @TheOrviZ</p>
        <input
          className="w-full rounded bg-black/30 p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full rounded bg-black/30 p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} className="rounded bg-brand px-4 py-2 font-semibold text-black">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
