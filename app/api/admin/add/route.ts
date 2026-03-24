import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";
import { slugify } from "@/lib/utils";
import { assertApiAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!assertApiAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const data = await req.json();

  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let i = 1;
  while (await Movie.findOne({ slug })) {
    slug = `${baseSlug}-${i++}`;
  }

  const movie = await Movie.create({ ...data, slug });
  return NextResponse.json({ movie });
}
