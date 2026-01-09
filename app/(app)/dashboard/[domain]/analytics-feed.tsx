"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { TopBrowsersFeed } from "@/components/app/domain/browsers-feed";
import { TopCountriesFeed } from "@/components/app/domain/countries-feed";
import { TopDevicesFeed } from "@/components/app/domain/devices-feed";
import { TopOSFeed } from "@/components/app/domain/os-feed";
import { TopPagesFeed } from "@/components/app/domain/pages-feed";
import { TopReferrersFeed } from "@/components/app/domain/referrers-feed";
import { StatsFeed } from "@/components/app/domain/stats-feed";
import { VisitorsViewsChart } from "@/components/app/domain/visitors-views-chart";

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

  return (
    <>
      <StatsFeed websiteId={websiteId} from={params.from} to={params.to} />
      <VisitorsViewsChart
        websiteId={websiteId}
        from={params.from}
        to={params.to}
        period={params.period}
      />
      <TopPagesFeed websiteId={websiteId} from={params.from} to={params.to} />
      <TopReferrersFeed
        websiteId={websiteId}
        from={params.from}
        to={params.to}
      />
      <TopCountriesFeed
        websiteId={websiteId}
        from={params.from}
        to={params.to}
      />
      <TopBrowsersFeed
        websiteId={websiteId}
        from={params.from}
        to={params.to}
      />
      <TopDevicesFeed websiteId={websiteId} from={params.from} to={params.to} />
      <TopOSFeed websiteId={websiteId} from={params.from} to={params.to} />
    </>
  );
};
