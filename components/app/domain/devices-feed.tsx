import { TopFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsTopDevices } from "@/hooks/use-analytics";

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const TopDevicesFeed = ({ websiteId, from, to }: Props) => {
  const { topDevices, isLoading } = useGetAnalyticsTopDevices({
    websiteId,
    from,
    to,
  });

  if (isLoading) return <TopFeedSkeleton title="Devices" />;

  return (
    <>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {!topDevices?.length ? (
              <div>No data available</div>
            ) : (
              topDevices.map((item) => (
                <div
                  key={item.device}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="capitalize">{item.device}</div>
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
