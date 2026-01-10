import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // If authenticated, call the original handler
    return handler(req, context);
  };
}
