import { db } from "@/lib/db";
import { subDays } from "date-fns";
import { unstable_cache } from "next/cache";

export const getPageviews = ({ websiteId }: { websiteId: string }) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  return unstable_cache(
    async () => {
      return await db.query.pageviews.findMany({
        where: (pageviews, { eq, and, gte }) =>
          and(
            eq(pageviews.websiteId, websiteId),
            gte(pageviews.createdAt, sevenDaysAgo),
          ),
      });
    },
    ["pageviews", websiteId],
    { revalidate: 3600, tags: [`pageviews_${websiteId}`] },
  )();
};
