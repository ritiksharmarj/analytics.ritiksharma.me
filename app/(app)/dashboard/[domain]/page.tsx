import { TopBrowsersFeed } from "@/components/app/domain/browsers-feed";
import { TopCountriesFeed } from "@/components/app/domain/countries-feed";
import { TopDevicesFeed } from "@/components/app/domain/devices-feed";
import { TopOSFeed } from "@/components/app/domain/os-feed";
import { TopPagesFeed } from "@/components/app/domain/pages-feed";
import { TopReferrersFeed } from "@/components/app/domain/referrers-feed";
import { StatsFeed } from "@/components/app/domain/stats-feed";
import { VisitorsViewsChart } from "@/components/app/domain/visitors-views-chart";
import { StatsFeedSkeleton, TopFeedSkeleton } from "@/components/skeleton";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import * as React from "react";
import { AnalyticsFeed } from "./analytics-feed";

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

      <AnalyticsFeed websiteId={website.id} />
    </div>
  );
}
