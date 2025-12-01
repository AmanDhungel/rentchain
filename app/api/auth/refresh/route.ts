import { NextResponse } from "next/server";
import { connectToDatabase } from "@/rentchain-backend/src/lib/db";
import User from "@/rentchain-backend/src/models/User";
import RefreshToken from "@/rentchain-backend/src/models/RefreshToken";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "@/rentchain-backend/src/lib/token";
import { setRefreshTokenCookie } from "@/rentchain-backend/src/lib/cookie";
import { decode } from "jsonwebtoken";

export async function POST(req) {
  await connectToDatabase();

  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith("refreshToken="));
  if (!match)
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });

  const token = match.split("=")[1];
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch (e) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }

  // check DB token
  const stored = await RefreshToken.findOne({ token }).exec();
  if (!stored || stored.revoked)
    return NextResponse.json(
      { message: "Token not found or revoked" },
      { status: 401 }
    );

  const user = await User.findById(payload.sub).lean();
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 401 });

  const newRefreshToken = signRefreshToken({ sub: user._id.toString() });
  const decoded = decode(newRefreshToken);
  const newExpires = new Date(decoded?.exp * 1000);

  stored.revoked = true;
  stored.replacedByToken = newRefreshToken;
  await stored.save();

  await RefreshToken.create({
    token: newRefreshToken,
    user: user._id,
    expiresAt: newExpires,
  });

  const accessToken = signAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });

  const headers = new Headers();
  setRefreshTokenCookie(headers, newRefreshToken);

  return new NextResponse(
    JSON.stringify({
      accessToken,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
    }),
    { status: 200, headers }
  );
}
