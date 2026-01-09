import { endOfDay, parseISO, startOfDay } from "date-fns";
import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { withAuth } from "@/lib/with-auth";
import { analyticsPeriodSchema } from "@/lib/zod/schema";

export const GET = withAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ websiteId: string }> },
  ) => {
    const { websiteId } = await params;
    const fromParam = request.nextUrl.searchParams.get("from");
    const toParam = request.nextUrl.searchParams.get("to");

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

    try {
      // Define the SQL expression to handle NULL or empty browser names
      const browserExpression = sql<string>`
     CASE
       WHEN ${schema.pageviews.browser} IS NULL OR trim(${schema.pageviews.browser}) = '' THEN 'Unknown'
       ELSE ${schema.pageviews.browser}
     END
   `.as("browser_cleaned");

      const topBrowsers = await db
        .select({
          browser: browserExpression,
          count: count(schema.pageviews.id),
        })
        .from(schema.pageviews)
        .where(
          and(
            eq(schema.pageviews.websiteId, websiteId),
            gte(schema.pageviews.createdAt, startDate),
            lte(schema.pageviews.createdAt, endDate),
          ),
        )
        .groupBy(browserExpression)
        .orderBy(desc(count(schema.pageviews.id)))
        .limit(8);

      return NextResponse.json(topBrowsers, { status: 200 });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        { error: "Something went wrong!" },
        { status: 500 },
      );
    }
  },
);
