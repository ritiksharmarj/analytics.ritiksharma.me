import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { subDays } from "date-fns";

export const TopScreenSizesFeed = async ({
  websiteId,
}: { websiteId: string }) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const pageviews = await db.query.pageviews.findMany({
    where: (pageviews, { eq, and, gte }) =>
      and(
        eq(pageviews.websiteId, websiteId),
        gte(pageviews.createdAt, sevenDaysAgo),
      ),
  });

  const screenSizesByCount = pageviews.reduce(
    (acc, pv) => {
      const size = pv.screenSize || "Unknown";
      acc[size] = (acc[size] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topScreenSizes = Object.entries(screenSizesByCount)
    .map(([size, count]) => ({ size, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Top Screen Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topScreenSizes.map((item, idx) => (
              <div
                key={item.size}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="font-medium">{item.size}</span>
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
