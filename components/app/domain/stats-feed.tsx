import { StatsFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsStats } from "@/hooks/use-analytics";
import { ActivityIcon, EyeIcon, GlobeIcon, UsersIcon } from "lucide-react";

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const StatsFeed = ({ websiteId, from, to }: Props) => {
  const { stats, isLoading } = useGetAnalyticsStats({ websiteId, from, to });

  if (isLoading) return <StatsFeedSkeleton />;

  const statsData = [
    {
      title: "Total Pageviews",
      value: stats?.totalPageviews ?? 0,
      icon: EyeIcon,
    },
    {
      title: "Total Visits",
      value: stats?.totalVisits ?? 0,
      icon: ActivityIcon,
    },
    {
      title: "Unique Visitors",
      value: stats?.uniqueVisitors ?? 0,
      icon: UsersIcon,
    },
    {
      title: "Referring Sites",
      value: stats?.uniqueReferrers ?? 0,
      icon: GlobeIcon,
    },
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
