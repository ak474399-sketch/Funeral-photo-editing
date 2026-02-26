import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CALLBACK_COOKIE_NAMES = [
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/index.html" || pathname === "/index" || pathname === "//") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isAuthRoute = pathname.startsWith("/api/auth/");
  if (isAuthRoute) {
    let needsFix = false;
    const parts: string[] = [];
    for (const part of (request.headers.get("cookie") ?? "").split(";")) {
      const eq = part.indexOf("=");
      if (eq === -1) { parts.push(part); continue; }
      const name = part.slice(0, eq).trim();
      const value = part.slice(eq + 1).trim();
      if (CALLBACK_COOKIE_NAMES.includes(name) && (value.startsWith("https%3A") || value.startsWith("http%3A"))) {
        needsFix = true;
        try { parts.push(`${name}=${decodeURIComponent(value)}`); } catch { /* skip */ }
      } else {
        parts.push(part);
      }
    }
    if (needsFix) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("cookie", parts.join("; "));
      const response = NextResponse.next({ request: { headers: requestHeaders } });
      for (const name of CALLBACK_COOKIE_NAMES) {
        const raw = request.cookies.get(name)?.value;
        if (raw && (raw.startsWith("https%3A") || raw.startsWith("http%3A"))) {
          try { response.cookies.set(name, decodeURIComponent(raw), { path: "/" }); } catch { response.cookies.delete(name); }
        }
      }
      return response;
    }
    return NextResponse.next();
  }

  let hasCallbackCookie = false;
  for (const name of CALLBACK_COOKIE_NAMES) {
    if (request.cookies.get(name)) { hasCallbackCookie = true; break; }
  }

  if (hasCallbackCookie) {
    const parts: string[] = [];
    for (const part of (request.headers.get("cookie") ?? "").split(";")) {
      const eq = part.indexOf("=");
      if (eq === -1) { parts.push(part); continue; }
      const name = part.slice(0, eq).trim();
      if (CALLBACK_COOKIE_NAMES.includes(name)) continue;
      parts.push(part);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("cookie", parts.join("; "));
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    for (const name of CALLBACK_COOKIE_NAMES) {
      if (request.cookies.get(name)) response.cookies.delete(name);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/index", "/index.html", "/api/:path*", "/login-success", "/edit", "/gallery"],
};
