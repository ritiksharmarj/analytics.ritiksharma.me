"use client";

import { TopBrowsersFeed } from "@/components/app/domain/browsers-feed";
import { TopCountriesFeed } from "@/components/app/domain/countries-feed";
import { TopDevicesFeed } from "@/components/app/domain/devices-feed";
import { TopOSFeed } from "@/components/app/domain/os-feed";
import { TopPagesFeed } from "@/components/app/domain/pages-feed";
import { TopReferrersFeed } from "@/components/app/domain/referrers-feed";
import { StatsFeed } from "@/components/app/domain/stats-feed";
import { VisitorsViewsChart } from "@/components/app/domain/visitors-views-chart";
import { StatsFeedSkeleton, TopFeedSkeleton } from "@/components/skeleton";
import { useGetAnalyticsPageviews } from "@/hooks/use-analytics";
import { parseAsString, useQueryStates } from "nuqs";

type Props = {
  defaultValue: {
    from: string;
    to: string;
    period: string;
  };
  websiteId: string;
};

export const AnalyticsFeed = ({ websiteId, defaultValue }: Props) => {
  const [params] = useQueryStates({
    from: parseAsString.withDefault(defaultValue.from),
    to: parseAsString.withDefault(defaultValue.to),
    period: parseAsString.withDefault(defaultValue.period),
  });
  const { pageviews, isLoading } = useGetAnalyticsPageviews({
    websiteId,
    from: params.from,
    to: params.to,
  });

  if (isLoading)
    return (
      <>
        <StatsFeedSkeleton />
        <TopFeedSkeleton title="Top Pages" />
        <TopFeedSkeleton title="Top Referrers" />
        <TopFeedSkeleton title="Top Countries" />
        <TopFeedSkeleton title="Browsers" />
        <TopFeedSkeleton title="Devices" />
        <TopFeedSkeleton title="OS" />
      </>
    );

  if (!pageviews?.length) return <div>No data</div>;

  return (
    <>
      <StatsFeed pageviews={pageviews} />
      {/* <VisitorsViewsChart
        pageviews={pageviews}
        from={params.from}
        to={params.to}
        period={params.period}
      /> */}
      <TopPagesFeed websiteId={websiteId} from={params.from} to={params.to} />
      <TopReferrersFeed
        websiteId={websiteId}
        from={params.from}
        to={params.to}
      />
      <TopCountriesFeed pageviews={pageviews} />
      <TopBrowsersFeed pageviews={pageviews} />
      <TopDevicesFeed pageviews={pageviews} />
      <TopOSFeed pageviews={pageviews} />
    </>
  );
};
