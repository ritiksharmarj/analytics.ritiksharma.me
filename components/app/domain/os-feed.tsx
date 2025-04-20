import { TopFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsTopOS } from "@/hooks/use-analytics";

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const TopOSFeed = ({ websiteId, from, to }: Props) => {
  const { topOS, isLoading } = useGetAnalyticsTopOS({
    websiteId,
    from,
    to,
  });

  if (isLoading) return <TopFeedSkeleton title="OS" />;

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>OS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {!topOS?.length ? (
              <div>No OS data available.</div>
            ) : (
              topOS.map((item) => (
                <div
                  key={item.os}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="capitalize">{item.os}</div>
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
