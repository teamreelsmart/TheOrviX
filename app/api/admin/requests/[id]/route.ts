import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Request from "@/models/Request";
import { assertApiAdmin } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!assertApiAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const form = await req.formData();
  const action = String(form.get("action") || "");

  if (action === "complete") {
    await Request.findByIdAndUpdate(id, { status: "completed" });
  }

  if (action === "delete") {
    await Request.findByIdAndDelete(id);
  }

  redirect("/admin/requests");
}
