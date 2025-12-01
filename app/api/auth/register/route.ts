import { NextResponse } from "next/server";
import { connectToDatabase } from "@/rentchain-backend/src/lib/db";
import User from "@/rentchain-backend/src/models/User";
import RefreshToken from "@/rentchain-backend/src/models/RefreshToken";
import { registerSchema } from "@/rentchain-backend/src/validator/auth";
import {
  signAccessToken,
  signRefreshToken,
} from "@/rentchain-backend/src/lib/token";
import { setRefreshTokenCookie } from "@/rentchain-backend/src/lib/cookie";
import { decode } from "jsonwebtoken";

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();
  const { error, value } = registerSchema.validate(body);
  if (error)
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );

  const { fullName, email, phoneNumber, role, password } = value;
  const existing = await User.findOne({ email }).lean();
  if (existing)
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 409 }
    );

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    role,
    passwordHash,
  });

  const accessToken = signAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });
  const refreshToken = signRefreshToken({ sub: user._id.toString() });
  const decoded = decode(refreshToken);
  const expiresAt = new Date(decoded?.exp * 1000);

  await RefreshToken.create({ token: refreshToken, user: user._id, expiresAt });

  const headers = new Headers();
  setRefreshTokenCookie(headers, refreshToken);

  return new NextResponse(
    JSON.stringify({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      accessToken,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
    }),
    { status: 201, headers: headers }
  );
}
