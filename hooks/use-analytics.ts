import type { Pageviews } from "@/lib/db/schema";
import { getRequest } from "@/lib/services/axios";
import { useQuery } from "@tanstack/react-query";

export const analyticsQueryKeys = {
  analyticsPageviews: "analyticsPageviews",
  analyticsLiveUsersCount: "analyticsLiveUsersCount",
};

export const useGetAnalyticsPageviews = ({
  websiteId,
  from,
  to,
}: { websiteId: string; from: string; to: string }) => {
  const getAnalyticsPageviews = () => {
    return getRequest({
      url: `/api/analytics/${websiteId}`,
      params: {
        from,
        to,
      },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsPageviews, websiteId, from, to],
    queryFn: getAnalyticsPageviews,
    enabled: !!websiteId,
  });

  const pageviews = data as Pageviews[] | undefined;

  return { pageviews, isLoading };
};

export const useGetAnalyticsLiveUsersCount = ({
  websiteId,
}: { websiteId: string }) => {
  const getAnalyticsLiveUsersCount = () => {
    return getRequest({
      url: `/api/analytics/${websiteId}/live`,
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsLiveUsersCount, websiteId],
    queryFn: getAnalyticsLiveUsersCount,
    enabled: !!websiteId,
    refetchInterval: 30 * 1000,
  });

  const liveUsersCount = data as number | undefined;

  return { liveUsersCount, isLoading };
};
