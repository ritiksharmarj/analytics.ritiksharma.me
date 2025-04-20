import type { Pageviews } from "@/lib/db/schema";
import { API_ROUTES } from "@/lib/routes";
import { getRequest } from "@/lib/services/axios";
import { useQuery } from "@tanstack/react-query";

export const analyticsQueryKeys = {
  analyticsPageviews: "analyticsPageviews",
  analyticsLiveUsersCount: "analyticsLiveUsersCount",
  analyticsTopPages: "analyticsTopPages",
};

type AnalyticsQueryProps = { websiteId: string; from: string; to: string };

export const useGetAnalyticsPageviews = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsPageviews = () => {
    return getRequest({
      url: `/api/websites/${websiteId}`,
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
      url: API_ROUTES.CURRENT_VISITORS(websiteId),
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

type TopPageItem = {
  page: string;
  count: number;
};

export const useGetAnalyticsTopPages = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsTopPages = () => {
    return getRequest({
      url: API_ROUTES.TOP_PAGES(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsTopPages, websiteId, from, to],
    queryFn: getAnalyticsTopPages,
    enabled: !!websiteId,
  });

  const topPages = data as TopPageItem[] | undefined;

  return { topPages, isLoading };
};
