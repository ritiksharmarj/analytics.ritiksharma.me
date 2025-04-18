import { db } from "@/lib/db";
import { withAuth } from "@/lib/with-auth";
import { subDays } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ websiteId: string }> },
  ) => {
    const { websiteId } = await params;

    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);

    const pageviews = await db.query.pageviews.findMany({
      where: (pageviews, { eq, and, gte }) =>
        and(
          eq(pageviews.websiteId, websiteId),
          gte(pageviews.createdAt, sevenDaysAgo),
        ),
    });

    return NextResponse.json(pageviews, { status: 200 });
  },
);
