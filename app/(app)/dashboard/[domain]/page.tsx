import { TopBrowsersFeed } from "@/components/app/domain/browsers-feed";
import { TopDevicesFeed } from "@/components/app/domain/devices-feed";
import { TopOSFeed } from "@/components/app/domain/os-feed";
import { StatsFeed } from "@/components/app/domain/stats-feed";
import { TopCountriesFeed } from "@/components/app/domain/countries-feed";
import { TopPagesFeed } from "@/components/app/domain/pages-feed";
import { TopReferrersFeed } from "@/components/app/domain/referrers-feed";
import { VisitorsViewsChart } from "@/components/app/domain/visitors-views-chart";
import { StatsFeedSkeleton, TopFeedSkeleton } from "@/components/skeleton";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import * as React from "react";

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  // find website
  const website = await db.query.websites.findFirst({
    where: (websites, { eq }) => eq(websites.domain, domain),
  });

  if (!website) notFound();

  return (
    <div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 col-span-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{website.name}</h1>
          <p className="text-muted-foreground">{domain}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Last 7 days</div>
        </div>
      </div>

      {/* Stats Cards */}
      <React.Suspense fallback={<StatsFeedSkeleton />}>
        <StatsFeed websiteId={website.id} />
      </React.Suspense>

      {/* Pageviews Over Time Chart */}
      <VisitorsViewsChart />

      {/* Top Pages */}
      <React.Suspense fallback={<TopFeedSkeleton title="Top Pages" />}>
        <TopPagesFeed websiteId={website.id} />
      </React.Suspense>

      {/* Top Referrers */}
      <React.Suspense fallback={<TopFeedSkeleton title="Top Referrers" />}>
        <TopReferrersFeed websiteId={website.id} />
      </React.Suspense>

      {/* Top Countries */}
      <React.Suspense fallback={<TopFeedSkeleton title="Top Countries" />}>
        <TopCountriesFeed websiteId={website.id} />
      </React.Suspense>

      {/* Top Browsers */}
      <React.Suspense fallback={<TopFeedSkeleton title="Browsers" />}>
        <TopBrowsersFeed websiteId={website.id} />
      </React.Suspense>

      {/* Top Devices */}
      <React.Suspense fallback={<TopFeedSkeleton title="Devices" />}>
        <TopDevicesFeed websiteId={website.id} />
      </React.Suspense>

      {/* Top OS */}
      <React.Suspense fallback={<TopFeedSkeleton title="OS" />}>
        <TopOSFeed websiteId={website.id} />
      </React.Suspense>
    </div>
  );
}
