import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { subDays } from "date-fns";

export const TopCountriesFeed = async ({
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

  const countriesByCount = pageviews.reduce(
    (acc, pv) => {
      if (pv.countryCode) {
        acc[pv.countryCode] = (acc[pv.countryCode] || 0) + 1;
      } else {
        acc.Unknown = (acc.Unknown || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const topCountries = Object.entries(countriesByCount)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCountries.map((item, idx) => (
              <div
                key={item.country}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="font-medium">{item.country}</span>
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
