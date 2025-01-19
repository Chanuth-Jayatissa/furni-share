import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const isAuthenticated = session && JSON.parse(session.value)?.userId;

  // Redirect unauthenticated users
  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/donate")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/donate/:path*"], // Protect all routes under /donate
};
