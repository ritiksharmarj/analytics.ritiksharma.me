import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./lib/routes";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|script.js).*)",
  ],
};

export default async function middleware(request: NextRequest) {
  const cookies = getSessionCookie(request);

  // If authenticated, but login page
  if (request.nextUrl.pathname === ROUTES.ROOT) {
    if (cookies) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }

    return NextResponse.next();
  }

  // Not authenticated
  if (!cookies) {
    return NextResponse.redirect(new URL(ROUTES.ROOT, request.url));
  }

  return NextResponse.next();
}
