import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";

export const TopPagesFeed = async ({ websiteId }: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

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
          <div className="space-y-4 text-sm">
            {topPages.map((item) => (
              <div
                key={item.page}
                className="flex items-center justify-between gap-4"
              >
                <div className="truncate">{item.page}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
