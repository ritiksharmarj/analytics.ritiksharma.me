import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";

export const TopCountriesFeed = async ({
  websiteId,
}: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

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
          <div className="space-y-4 text-sm">
            {topCountries.map((item, idx) => (
              <div
                key={item.country}
                className="flex items-center justify-between gap-4"
              >
                <div>{item.country}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
