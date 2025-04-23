import { AUTH_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/lib/routes";
import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icon|opengraph-image|sitemap.xml|robots.txt|script.js).*)",
  ],
};

export default function middleware(request: NextRequest) {
  const cookies = getSessionCookie(request);
  const isAuthToken = !!cookies;

  const isAuthRoute = AUTH_ROUTES.includes(request.nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    return isAuthToken
      ? NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url))
      : NextResponse.next();
  }

  if (!isAuthToken) {
    return NextResponse.redirect(new URL(ROUTES.ROOT, request.url));
  }

  return NextResponse.next();
}
