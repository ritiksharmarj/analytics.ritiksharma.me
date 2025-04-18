import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageviews } from "@/lib/services/cached-queries";
import { EyeIcon, GlobeIcon, MonitorIcon, UsersIcon } from "lucide-react";

export const StatsFeed = async ({ websiteId }: { websiteId: string }) => {
  const pageviews = await getPageviews({ websiteId });

  const totalPageviews = pageviews.length;
  const uniqueVisitors = new Set(pageviews.map((pv) => pv.sessionId)).size;
  const totalVisits = new Set(pageviews.map((pv) => pv.visitId)).size;

  const uniqueReferrers = new Set(
    pageviews
      .map((pv) => pv.referrer)
      .filter((ref) => ref && ref.trim() !== ""),
  ).size;

  const statsData = [
    { title: "Total Pageviews", value: totalPageviews, icon: EyeIcon },
    { title: "Total Visits", value: totalVisits, icon: UsersIcon },
    { title: "Unique Visitors", value: uniqueVisitors, icon: UsersIcon },
    { title: "Referring Sites", value: uniqueReferrers, icon: GlobeIcon },
  ];

  return (
    <>
      {statsData.map((data) => (
        <Card key={data.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
            <data.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
