import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Movie from "@/models/Movie";
import { assertApiAdmin } from "@/lib/auth";

async function remove(id: string) {
  await connectDB();
  await Movie.findByIdAndDelete(id);
}

export async function POST(req: NextRequest) {
  if (!assertApiAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const { id } = await req.json();
    await remove(id);
    return NextResponse.json({ success: true });
  }

  const form = await req.formData();
  const id = String(form.get("id") || "");
  await remove(id);
  redirect("/admin/dashboard");
}
