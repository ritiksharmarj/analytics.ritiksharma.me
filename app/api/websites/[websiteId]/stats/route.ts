import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { withAuth } from "@/lib/with-auth";
import { analyticsPeriodSchema } from "@/lib/zod/schema";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { and, count, countDistinct, eq, gte, lte, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

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
      // SQL expression to extract and clean the referrer hostname
      const referrerHostnameExpression = sql<string>`
        CASE
          -- Handle NULL or empty referrers
          WHEN ${schema.pageviews.referrer} IS NULL OR trim(${schema.pageviews.referrer}) = '' THEN 'Direct / None'
          -- Try to extract hostname from valid URLs, removing 'www.'
          WHEN ${schema.pageviews.referrer} LIKE 'http://%' OR ${schema.pageviews.referrer} LIKE 'https://%' THEN
            COALESCE(substring(${schema.pageviews.referrer} from '://(?:www\.)?([^/]+)'), 'Other')
          -- Group any other non-empty strings as 'Other'
          ELSE 'Other'
        END
      `;

      const statsData = await db
        .select({
          totalPageviews: count(schema.pageviews.id),
          totalVisits: countDistinct(schema.pageviews.visitId),
          uniqueVisitors: countDistinct(schema.pageviews.sessionId),
          uniqueReferrers: countDistinct(referrerHostnameExpression),
        })
        .from(schema.pageviews)
        .where(
          and(
            eq(schema.pageviews.websiteId, websiteId),
            gte(schema.pageviews.createdAt, startDate),
            lte(schema.pageviews.createdAt, endDate),
          ),
        );

      const stats = statsData[0];

      return NextResponse.json(stats, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong!" },
        { status: 500 },
      );
    }
  },
);
