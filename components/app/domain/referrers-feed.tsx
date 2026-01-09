import { TopFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsTopReferrers } from "@/hooks/use-analytics";

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const TopReferrersFeed = ({ websiteId, from, to }: Props) => {
  const { topReferrers, isLoading } = useGetAnalyticsTopReferrers({
    websiteId,
    from,
    to,
  });

  if (isLoading) return <TopFeedSkeleton title="Top Referrers" />;

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Top Referrers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          {!topReferrers?.length ? (
            <div>No data available</div>
          ) : (
            topReferrers.map((item) => (
              <div
                key={item.referrer}
                className="flex items-center justify-between gap-4"
              >
                <div className="truncate">{item.referrer}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
