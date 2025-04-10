import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { subDays } from "date-fns";

export const TopPagesFeed = async ({ websiteId }: { websiteId: string }) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const pageviews = await db.query.pageviews.findMany({
    where: (pageviews, { eq, and, gte }) =>
      and(
        eq(pageviews.websiteId, websiteId),
        gte(pageviews.createdAt, sevenDaysAgo),
      ),
  });

  const pagesByViews = pageviews.reduce(
    (acc, pv) => {
      acc[pv.path] = (acc[pv.path] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topPages = Object.entries(pagesByViews)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((item, idx) => (
              <div
                key={item.page}
                className="flex items-center justify-between"
              >
                <div className="truncate max-w-[250px]">
                  <span className="font-medium">{item.page}</span>
                </div>
                <div className="text-muted-foreground">{item.count} views</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
