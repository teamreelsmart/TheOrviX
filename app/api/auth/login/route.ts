import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });
  if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signAdminToken({ username: admin.username });
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  return res;
}
