import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    const cookies = getSessionCookie(req);

    if (!cookies) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If authenticated, call the original handler
    return handler(req, context);
  };
}
