import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";
import { slugify } from "@/lib/utils";
import { assertApiAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  if (!assertApiAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id, ...data } = await req.json();

  const movie = await Movie.findById(id);
  if (!movie) return NextResponse.json({ error: "Movie not found" }, { status: 404 });

  movie.title = data.title;
  movie.slug = slugify(data.title);
  movie.poster = data.poster;
  movie.description = data.description;
  movie.releaseYear = data.releaseYear;
  movie.imdbRating = data.imdbRating;
  movie.genre = data.genre;
  movie.language = data.language;
  movie.type = data.type;
  movie.screenshots = data.screenshots;
  movie.downloadLinks = data.downloadLinks;

  await movie.save();
  return NextResponse.json({ success: true });
}
