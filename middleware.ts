import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  try {
    await jwtVerify(token ? token : "", SECRET);
    return NextResponse.next();
  } catch (err: any) {
    if (err.code === "ERR_JWT_EXPIRED") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/owner/:path*", "/tenant/:path*"],
};
