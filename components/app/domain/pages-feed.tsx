import { TopFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsTopPages } from "@/hooks/use-analytics";

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const TopPagesFeed = ({ websiteId, from, to }: Props) => {
  const { topPages, isLoading } = useGetAnalyticsTopPages({
    websiteId,
    from,
    to,
  });

  if (isLoading) return <TopFeedSkeleton title="Top Pages" />;

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          {!topPages?.length ? (
            <div>No data available</div>
          ) : (
            topPages.map((item) => (
              <div
                key={item.page}
                className="flex items-center justify-between gap-4"
              >
                <div className="truncate">{item.page}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
