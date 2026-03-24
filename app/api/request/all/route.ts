import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Request from "@/models/Request";

export async function GET() {
  await connectDB();
  const requests = await Request.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ requests });
}
