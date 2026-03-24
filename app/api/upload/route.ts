import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "IMGBB_API_KEY is not configured" }, { status: 500 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file selected" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const body = new URLSearchParams();
  body.set("key", apiKey);
  body.set("image", base64);

  const upload = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  const data = await upload.json();

  if (!upload.ok || !data?.success) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }

  return NextResponse.json({ url: data.data.url });
}
