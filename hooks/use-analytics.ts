import type { Pageviews } from "@/lib/db/schema";
import { API_ROUTES } from "@/lib/routes";
import { getRequest } from "@/lib/services/axios";
import { useQuery } from "@tanstack/react-query";

export const analyticsQueryKeys = {
  analyticsPageviews: "analyticsPageviews",
  analyticsLiveUsersCount: "analyticsLiveUsersCount",
  analyticsTopPages: "analyticsTopPages",
  analyticsTopReferrers: "analyticsTopReferrers",
  analyticsTopCountries: "analyticsTopCountries",
  analyticsTopBrowsers: "analyticsTopBrowsers",
  analyticsTopDevices: "analyticsTopDevices",
  analyticsTopOS: "analyticsTopOS",
  analyticsStats: "analyticsStats",
  analyticsStatsTraffic: "analyticsStatsTraffic",
};

type AnalyticsQueryProps = {
  websiteId: string;
  from: string;
  to: string;
  period?: string;
};

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

type TopReferrerItem = {
  referrer: string;
  count: number;
};

export const useGetAnalyticsTopReferrers = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsTopReferrers = () => {
    return getRequest({
      url: API_ROUTES.TOP_REFERRERS(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsTopReferrers, websiteId, from, to],
    queryFn: getAnalyticsTopReferrers,
    enabled: !!websiteId,
  });

  const topReferrers = data as TopReferrerItem[] | undefined;

  return { topReferrers, isLoading };
};

type TopCountryItem = {
  code: string;
  count: number;
};

export const useGetAnalyticsTopCountries = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsTopCountries = () => {
    return getRequest({
      url: API_ROUTES.TOP_COUNTRIES(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsTopCountries, websiteId, from, to],
    queryFn: getAnalyticsTopCountries,
    enabled: !!websiteId,
  });

  const topCountries = data as TopCountryItem[] | undefined;

  return { topCountries, isLoading };
};

type TopBrowserItem = {
  browser: string;
  count: number;
};

export const useGetAnalyticsTopBrowsers = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsTopBrowsers = () => {
    return getRequest({
      url: API_ROUTES.TOP_BROWSERS(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsTopBrowsers, websiteId, from, to],
    queryFn: getAnalyticsTopBrowsers,
    enabled: !!websiteId,
  });

  const topBrowsers = data as TopBrowserItem[] | undefined;

  return { topBrowsers, isLoading };
};

type TopDeviceItem = {
  device: string;
  count: number;
};

export const useGetAnalyticsTopDevices = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsTopDevices = () => {
    return getRequest({
      url: API_ROUTES.TOP_DEVICES(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsTopDevices, websiteId, from, to],
    queryFn: getAnalyticsTopDevices,
    enabled: !!websiteId,
  });

  const topDevices = data as TopDeviceItem[] | undefined;

  return { topDevices, isLoading };
};

type TopOSItem = {
  os: string;
  count: number;
};

export const useGetAnalyticsTopOS = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsTopOS = () => {
    return getRequest({
      url: API_ROUTES.TOP_OS(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsTopOS, websiteId, from, to],
    queryFn: getAnalyticsTopOS,
    enabled: !!websiteId,
  });

  const topOS = data as TopOSItem[] | undefined;

  return { topOS, isLoading };
};

type AnalyticsStatsItem = {
  totalPageviews: number;
  totalVisits: number;
  uniqueVisitors: number;
  uniqueReferrers: number;
};

export const useGetAnalyticsStats = ({
  websiteId,
  from,
  to,
}: AnalyticsQueryProps) => {
  const getAnalyticsStats = () => {
    return getRequest({
      url: API_ROUTES.STATS.STATS(websiteId),
      params: { from, to },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsStats, websiteId, from, to],
    queryFn: getAnalyticsStats,
    enabled: !!websiteId,
  });

  const stats = data as AnalyticsStatsItem | undefined;

  return { stats, isLoading };
};

export type trafficDataItem = {
  date: string;
  views: number;
  visitors: number;
};

export const useGetAnalyticsStatsTraffic = ({
  websiteId,
  from,
  to,
  period,
}: AnalyticsQueryProps) => {
  const getAnalyticsStatsTraffic = () => {
    return getRequest({
      url: API_ROUTES.STATS.TRAFFIC(websiteId),
      params: { from, to, period },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [analyticsQueryKeys.analyticsStats, websiteId, from, to, period],
    queryFn: getAnalyticsStatsTraffic,
    enabled: !!websiteId,
  });

  const trafficStats = data as trafficDataItem[] | undefined;

  return { trafficStats, isLoading };
};
