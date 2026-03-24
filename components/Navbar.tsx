import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand">
          CineNest
        </Link>
        <nav className="flex items-center gap-4 text-sm text-white/85">
          <Link href="/search" className="hover:text-brand">
            Search
          </Link>
          <Link href="/admin/login" className="hover:text-brand">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
