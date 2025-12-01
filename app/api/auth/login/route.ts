import { decode } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/rentchain-backend/src/lib/db";
import {
  signAccessToken,
  signRefreshToken,
} from "@/rentchain-backend/src/lib/token";
import RefreshToken from "@/rentchain-backend/src/models/RefreshToken";
import User from "@/rentchain-backend/src/models/User";
import { loginSchema } from "@/rentchain-backend/src/validator/auth";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const { error, value } = loginSchema.validate(body);

  if (error)
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );

  const { email, password } = value;
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  const ok = await user.comparePassword(password);
  if (!ok)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  const accessToken = signAccessToken({
    sub: user._id.toString(),
    role: user.role,
    name: user.fullName,
    email: user.email,
  });
  const refreshToken = signRefreshToken({ sub: user._id.toString() });

  const decoded = decode(refreshToken);
  const expiresAt = new Date(decoded?.exp * 1000);
  await RefreshToken.create({ token: refreshToken, user: user._id, expiresAt });

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=900`
  );
  headers.append(
    "Set-Cookie",
    `refresh_token=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${
      7 * 24 * 60 * 60
    }`
  );

  return new NextResponse(
    JSON.stringify({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    }),
    { status: 200, headers }
  );
}
