import { db } from "@/lib/db";
import { pageviews } from "@/lib/db/schema";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { path, host, referrer, userAgent, screenSize } = body;

  // match website by host
  const website = await db.query.websites.findFirst({
    where: (websites, { eq }) => eq(websites.domain, host),
  });

  if (!website) {
    return NextResponse.json({ error: "Unregistered domain" }, { status: 400 });
  }

  await db.insert(pageviews).values({
    websiteId: website.id,
    host,
    path,
    referrer,
    userAgent,
    screenSize,
  });

  return NextResponse.json({ ok: true });
}
