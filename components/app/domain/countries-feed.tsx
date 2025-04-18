import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import countryNames from "@/lib/data/en-US.json";
import type { Pageviews } from "@/lib/db/schema";

const countryCodeToName = countryNames as Record<string, string>;

export const TopCountriesFeed = ({ pageviews }: { pageviews: Pageviews[] }) => {
  const countriesByCount = pageviews.reduce(
    (acc, pv) => {
      const code = pv.countryCode || "Unknown";
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topCountries = Object.entries(countriesByCount)
    .map(([code, count]) => ({
      code,
      name: countryCodeToName[code] || code,
      count,
    }))
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
            {topCountries.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between gap-4"
              >
                <div>{item.name}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
