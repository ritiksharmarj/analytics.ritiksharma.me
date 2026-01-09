import { subMinutes } from "date-fns";
import { and, countDistinct, eq, gte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pageviews } from "@/lib/db/schema";
import { withAuth } from "@/lib/with-auth";

export const GET = withAuth(
  async (_, { params }: { params: Promise<{ websiteId: string }> }) => {
    const { websiteId } = await params;

    try {
      const fiveMinutesAgo = subMinutes(new Date(), 5);

      const res = await db
        .select({ count: countDistinct(pageviews.sessionId) })
        .from(pageviews)
        .where(
          and(
            eq(pageviews.websiteId, websiteId),
            gte(pageviews.createdAt, fiveMinutesAgo),
          ),
        );

      const count = res[0].count ?? 0;

      return NextResponse.json(count, { status: 200 });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        { error: "Something went wrong!" },
        { status: 500 },
      );
    }
  },
);
