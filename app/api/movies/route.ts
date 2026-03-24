import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = 10;
  const slug = searchParams.get("slug") || "";
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";
  const language = searchParams.get("language") || "";
  const type = searchParams.get("type") || "";

  if (slug) {
    const movie = await Movie.findOne({ slug }).lean();
    return NextResponse.json({ movie });
  }

  const filter: Record<string, unknown> = {};
  if (query) filter.title = { $regex: query, $options: "i" };
  if (genre) filter.genre = { $regex: genre, $options: "i" };
  if (year) filter.releaseYear = Number(year);
  if (language) filter.language = { $regex: language, $options: "i" };
  if (type) filter.type = type;

  const [movies, total] = await Promise.all([
    Movie.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Movie.countDocuments(filter)
  ]);

  return NextResponse.json({
    movies,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    total
  });
}
