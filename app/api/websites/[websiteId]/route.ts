import { endOfDay, parseISO, startOfDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
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
      const pageviews = await db.query.pageviews.findMany({
        where: (pageviews, { eq, and, gte, lte }) =>
          and(
            eq(pageviews.websiteId, websiteId),
            gte(pageviews.createdAt, startDate),
            lte(pageviews.createdAt, endDate),
          ),
      });

      return NextResponse.json(pageviews, { status: 200 });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        { error: "Something went wrong!" },
        { status: 500 },
      );
    }
  },
);
