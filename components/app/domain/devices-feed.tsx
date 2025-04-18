import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pageviews } from "@/lib/db/schema";

export const TopDevicesFeed = ({ pageviews }: { pageviews: Pageviews[] }) => {
  const screenSizesByCount = pageviews.reduce(
    (acc, pv) => {
      const title = pv.device || "Unknown";
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topScreenSizes = Object.entries(screenSizesByCount)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {topScreenSizes.map((item) => (
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
