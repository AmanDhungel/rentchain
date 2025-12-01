import { serialize } from "cookie";

export function setRefreshTokenCookie(resHeaders, token) {
  const secure = process.env.COOKIE_SECURE === "true";
  const domain = process.env.COOKIE_DOMAIN || undefined;
  const maxAge = (() => {
    const raw = process.env.REFRESH_TOKEN_EXPIRES_SECONDS;
    if (raw) return parseInt(raw, 10);
    return 7 * 24 * 60 * 60;
  })();

  const cookie = serialize("refreshToken", token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge,
    path: "/api/auth/refresh",
    domain,
  });
  const existing = resHeaders.get("Set-Cookie");
  if (existing) {
    resHeaders.append("Set-Cookie", cookie);
  } else {
    resHeaders.set("Set-Cookie", cookie);
  }
}

export function clearRefreshTokenCookie(resHeaders) {
  const cookie = serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
    expires: new Date(0),
    path: "/api/auth/refresh",
  });
  resHeaders.set("Set-Cookie", cookie);
}
