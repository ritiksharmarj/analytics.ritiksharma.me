import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { subDays } from "date-fns";

export const TopReferrersFeed = async ({
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

  const referrersByCount = pageviews.reduce(
    (acc, pv) => {
      if (pv.referrer && pv.referrer.trim() !== "") {
        // Extract domain from referrer URL
        let referrer = pv.referrer;
        try {
          const url = new URL(pv.referrer);
          referrer = url.hostname;
        } catch (e) {
          // If not a valid URL, use as is
        }
        acc[referrer] = (acc[referrer] || 0) + 1;
      } else {
        acc["Direct / None"] = (acc["Direct / None"] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const topReferrers = Object.entries(referrersByCount)
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Top Referrers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topReferrers.map((item) => (
              <div
                key={item.referrer}
                className="flex items-center justify-between"
              >
                <div className="truncate max-w-[250px]">
                  <span className="font-medium">{item.referrer}</span>
                </div>
                <div className="text-muted-foreground">
                  {item.count} referrals
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
