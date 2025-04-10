import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { subDays } from "date-fns";
import {
  EyeIcon,
  GlobeIcon,
  MonitorIcon,
  MousePointerIcon,
} from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export const StatsFeed = async ({ websiteId }: { websiteId: string }) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const pageviews = await db.query.pageviews.findMany({
    where: (pageviews, { eq, and, gte }) =>
      and(
        eq(pageviews.websiteId, websiteId),
        gte(pageviews.createdAt, sevenDaysAgo),
      ),
  });

  // Calculate total pageviews
  const totalPageviews = pageviews.length;

  const uniquePaths = new Set(pageviews.map((pv) => pv.path)).size;

  // Calculate unique referrers (excluding empty ones)
  const uniqueReferrers = new Set(
    pageviews
      .map((pv) => pv.referrer)
      .filter((ref) => ref && ref.trim() !== ""),
  ).size;

  // Calculate unique countries
  const uniqueCountries = new Set(
    pageviews.map((pv) => pv.countryCode).filter(Boolean),
  ).size;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pageviews</CardTitle>
          <EyeIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPageviews}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Pages</CardTitle>
          <MousePointerIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniquePaths}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Referring Sites</CardTitle>
          <GlobeIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueReferrers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Countries</CardTitle>
          <MonitorIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueCountries}</div>
        </CardContent>
      </Card>
    </>
  );
};
