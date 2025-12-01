import { NextResponse } from "next/server";
import { clearRefreshTokenCookie } from "@/rentchain-backend/src/lib/cookie";
import { connectToDatabase } from "@/rentchain-backend/src/lib/db";
import RefreshToken from "@/rentchain-backend/src/models/RefreshToken";

export async function POST(req: Request) {
  await connectToDatabase();
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith("refreshToken="));
  if (match) {
    const token = match.split("=")[1];
    await RefreshToken.updateOne({ token }, { revoked: true }).exec();
  }

  const headers = new Headers();
  clearRefreshTokenCookie(headers);

  return new NextResponse(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers,
  });
}
