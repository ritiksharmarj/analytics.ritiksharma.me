import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";

export const TopReferrersFeed = async ({
  websiteId,
}: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

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
          <div className="space-y-4 text-sm">
            {topReferrers.map((item) => (
              <div
                key={item.referrer}
                className="flex items-center justify-between gap-4"
              >
                <div className="truncate">{item.referrer}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
