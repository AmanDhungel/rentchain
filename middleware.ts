import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  // No token at all → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch (err: any) {
    // 🔥 Allow expired access token
    if (err.code === "ERR_JWT_EXPIRED") {
      return NextResponse.next();
    }

    // Any other error → logout
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/owner/dashboard/:path*",
    "/owner/profile/:path*",
    "/owner/admin/:path*",
    "/owner/properties/:path*",
    "/owner/occupancy/:path*",
    "/owner/utilities/:path*",
    "/owner/agreement/:path*",
    "/owner/tenant/:path*",
    "/owner/accounting/:path*",
  ],
};
