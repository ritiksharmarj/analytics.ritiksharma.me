import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";

export const TopScreenSizesFeed = async ({
  websiteId,
}: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

  const screenSizesByCount = pageviews.reduce(
    (acc, pv) => {
      const size = pv.device || "Unknown";
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
          <CardTitle>Top Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {topScreenSizes.map((item, idx) => (
              <div
                key={item.size}
                className="flex items-center justify-between gap-4"
              >
                <div className="capitalize">{item.size}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
