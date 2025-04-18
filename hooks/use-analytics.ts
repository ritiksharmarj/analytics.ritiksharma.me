import { useQuery } from "@tanstack/react-query";

export const analyticsQueryKeys = {
  analyticsStats: "analyticsStats",
};

export const useGetAnalyticsStats = ({ websiteId }: { websiteId: string }) => {
  return useQuery({
    queryKey: [analyticsQueryKeys.analyticsStats, websiteId],
    // queryFn: ,
    enabled: !!websiteId,
  });
};
