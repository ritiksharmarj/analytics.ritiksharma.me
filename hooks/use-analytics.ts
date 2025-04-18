import type { Pageviews } from "@/lib/db/schema";
import { getRequest } from "@/lib/services/axios";
import { useQuery } from "@tanstack/react-query";

export const analyticsQueryKeys = {
  analyticsPageviews: "analyticsPageviews",
};

export const useGetAnalyticsPageviews = ({
  websiteId,
}: { websiteId: string }) => {
  const getAnalyticsPageviews = () => {
    return getRequest({
      url: `/api/analytics/${websiteId}`,
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsPageviews, websiteId],
    queryFn: getAnalyticsPageviews,
    enabled: !!websiteId,
  });

  const pageviews = data as Pageviews[] | undefined;

  return { pageviews, isLoading };
};
