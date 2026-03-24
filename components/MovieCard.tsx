import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.slug}`}
      target="_blank"
      className="group overflow-hidden rounded-xl bg-panel shadow-lg"
    >
      <div className="relative aspect-[2/3] w-full">
        <Image src={movie.poster} alt={movie.title} fill className="object-cover group-hover:scale-105" />
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{movie.title}</h3>
      </div>
    </Link>
  );
}
