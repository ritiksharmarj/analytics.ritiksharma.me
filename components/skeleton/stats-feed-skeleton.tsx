import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon, EyeIcon, GlobeIcon, UsersIcon } from "lucide-react";

const StatsFeedSkeleton = () => {
  const skeletonItems = [
    {
      title: "Total Pageviews",
      icon: EyeIcon,
    },
    {
      title: "Total Visits",
      icon: ActivityIcon,
    },
    {
      title: "Unique Visitors",
      icon: UsersIcon,
    },
    {
      title: "Referring Sites",
      icon: GlobeIcon,
    },
  ];

  return (
    <>
      {skeletonItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default StatsFeedSkeleton;
