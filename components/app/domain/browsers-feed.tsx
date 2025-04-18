import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";

export const TopBrowsersFeed = async ({ websiteId }: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

  const browsersByCount = pageviews.reduce(
    (acc, pv) => {
      const title = pv.browser || "Unknown";
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topBrowsers = Object.entries(browsersByCount)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Browsers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {topBrowsers.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4"
              >
                <div className="capitalize">{item.title}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
