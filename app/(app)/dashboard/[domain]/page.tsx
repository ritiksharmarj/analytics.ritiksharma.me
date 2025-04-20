import { AnalyticsPeriod } from "@/components/app/domain/analytics-period";
import { LiveUsersFeed } from "@/components/app/domain/live-users-feed";
import { db } from "@/lib/db";
import { startOfDay, subDays } from "date-fns";
import { notFound } from "next/navigation";
import * as React from "react";
import { AnalyticsFeed } from "./analytics-feed";

const defaultValue = {
  from: startOfDay(subDays(new Date(), 6)).toISOString(),
  to: new Date().toISOString(),
  period: "7d",
};

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
        <div className="flex items-center gap-4 flex-none">
          <div className="font-semibold lowercase">{domain}</div>
          <LiveUsersFeed websiteId={website.id} />
        </div>

        <div className="flex items-center gap-2 w-full justify-end">
          <AnalyticsPeriod defaultValue={defaultValue} />
        </div>
      </div>

      <AnalyticsFeed websiteId={website.id} defaultValue={defaultValue} />
    </div>
  );
}
