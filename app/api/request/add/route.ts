import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Request from "@/models/Request";

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();

  if (!data.movieName) {
    return NextResponse.json({ error: "Movie name is required" }, { status: 400 });
  }

  const created = await Request.create(data);
  return NextResponse.json({ request: created });
}
