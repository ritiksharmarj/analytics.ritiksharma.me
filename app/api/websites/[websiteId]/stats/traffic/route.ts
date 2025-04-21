import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { withAuth } from "@/lib/with-auth";
import { analyticsPeriodSchema } from "@/lib/zod/schema";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { and, asc, count, countDistinct, eq, gte, lte, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ websiteId: string }> },
  ) => {
    const { websiteId } = await params;
    const fromParam = request.nextUrl.searchParams.get("from");
    const toParam = request.nextUrl.searchParams.get("to");
    const period = request.nextUrl.searchParams.get("period");

    const validatedFields = analyticsPeriodSchema.safeParse({
      from: fromParam,
      to: toParam,
    });
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid date parameters" },
        { status: 400 },
      );
    }

    const { from, to } = validatedFields.data;

    const startDate = startOfDay(parseISO(from));
    const endDate = endOfDay(parseISO(to));

    // Default to 'day' if period is missing or doesn't end with 'm'
    const interval = period?.endsWith("m") ? "month" : "day";

    try {
      // Use date_trunc to group by day or month
      const dateTruncExpression =
        sql<string>`date_trunc(${interval}, ${schema.pageviews.createdAt})`.as(
          "truncated_date",
        );

      const trafficData = await db
        .select({
          date: dateTruncExpression, // ISO string
          views: count(schema.pageviews.id),
          visitors: countDistinct(schema.pageviews.sessionId),
        })
        .from(schema.pageviews)
        .where(
          and(
            eq(schema.pageviews.websiteId, websiteId),
            gte(schema.pageviews.createdAt, startDate),
            lte(schema.pageviews.createdAt, endDate),
          ),
        )
        .groupBy(dateTruncExpression)
        .orderBy(asc(dateTruncExpression));

      return NextResponse.json(trafficData, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong!" },
        { status: 500 },
      );
    }
  },
);
