"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetAnalyticsLiveUsersCount } from "@/hooks/use-analytics";

export const LiveUsersFeed = ({ websiteId }: { websiteId: string }) => {
  const { liveUsersCount, isLoading } = useGetAnalyticsLiveUsersCount({
    websiteId,
  });

  if (isLoading) return <Skeleton className="h-5 w-32" />;

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-green-500" />
      </div>
      <div className="text-sm">{liveUsersCount} current visitors</div>
    </div>
  );
};
