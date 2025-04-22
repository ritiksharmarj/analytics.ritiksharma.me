import { TopFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsTopBrowsers } from "@/hooks/use-analytics";

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const TopBrowsersFeed = ({ websiteId, from, to }: Props) => {
  const { topBrowsers, isLoading } = useGetAnalyticsTopBrowsers({
    websiteId,
    from,
    to,
  });

  if (isLoading) return <TopFeedSkeleton title="Browsers" />;

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Browsers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {!topBrowsers?.length ? (
              <div>No data available</div>
            ) : (
              topBrowsers.map((item) => (
                <div
                  key={item.browser}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="capitalize">{item.browser}</div>
                  <div className="font-medium">{item.count}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
