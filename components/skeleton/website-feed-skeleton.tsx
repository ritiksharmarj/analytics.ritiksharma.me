import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WebsiteFeedSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
      ))}
    </>
  );
};

export default WebsiteFeedSkeleton;
