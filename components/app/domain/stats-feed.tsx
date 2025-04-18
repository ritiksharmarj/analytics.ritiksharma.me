import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";
import { EyeIcon, GlobeIcon, MonitorIcon, UsersIcon } from "lucide-react";

export const StatsFeed = async ({ websiteId }: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

  // Calculate total pageviews
  const totalPageviews = pageviews.length;

  const uniqueVisitors = new Set(pageviews.map((pv) => pv.sessionId)).size;

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
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <UsersIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueVisitors}</div>
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
