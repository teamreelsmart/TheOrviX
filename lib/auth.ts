import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function signAdminToken(payload: { username: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { username: string };
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  try {
    return verifyAdminToken(token);
  } catch {
    redirect("/admin/login");
  }
}

export function assertApiAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;

  try {
    verifyAdminToken(token);
    return true;
  } catch {
    return false;
  }
}
