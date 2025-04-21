"use client";

import { Card } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAnalyticsStatsTraffic } from "@/hooks/use-analytics";
import { format, parseISO } from "date-fns";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type Props = {
  websiteId: string;
  from: string;
  to: string;
  period: string;
};

const chartConfig = {
  views: {
    label: "Views",
    color: "var(--color-chart-2)",
  },
  visitors: {
    label: "Visitors",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export const VisitorsViewsChart = ({ websiteId, from, to, period }: Props) => {
  const { trafficStats, isLoading } = useGetAnalyticsStatsTraffic({
    websiteId,
    from,
    to,
    period,
  });

  const chartData = React.useMemo(() => {
    const dateformat = period.endsWith("m") ? "MMM yyyy" : "MMM dd";

    return trafficStats?.map((item) => ({
      ...item,
      date: format(parseISO(item.date), dateformat),
    }));
  }, [trafficStats, period]);

  if (isLoading)
    return (
      <Card className="col-span-full max-h-[460px]">
        <div>chart data loading...</div>
      </Card>
    );

  if (!chartData?.length)
    return (
      <Card className="col-span-full max-h-[460px]">
        <div>no data available</div>
      </Card>
    );

  console.log(trafficStats);

  return (
    <Card className="col-span-full max-h-[460px]">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="visitors"
            fill="var(--color-visitors)"
            radius={[0, 0, 4, 4]}
            stackId="a"
          />
          <Bar
            dataKey="views"
            fill="var(--color-views)"
            radius={[4, 4, 0, 0]}
            stackId="a"
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};
