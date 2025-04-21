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
import {
  type trafficDataItem,
  useGetAnalyticsStatsTraffic,
} from "@/hooks/use-analytics";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  parseISO,
  startOfDay,
  startOfMonth,
} from "date-fns";
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

  const chartData = React.useMemo(
    () => processChartData(trafficStats, from, to, period),
    [trafficStats, from, to, period],
  );

  if (isLoading)
    return (
      <Card className="col-span-full max-h-[460px]">
        <div>chart data loading...</div>
      </Card>
    );

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

const processChartData = (
  trafficStats: trafficDataItem[] | undefined,
  from: string,
  to: string,
  period: string,
) => {
  const startDate = parseISO(from);
  const endDate = parseISO(to);
  const isMonthly = period.endsWith("m");
  const intervalFn = isMonthly ? eachMonthOfInterval : eachDayOfInterval;
  const displayFormat = isMonthly ? "MMM yyyy" : "MMM dd";
  const startOfIntervalFn = isMonthly ? startOfMonth : startOfDay;

  // 1. Generate the full date range (as Date objects)
  const dateRange = intervalFn({ start: startDate, end: endDate });

  // 2. Create a lookup map from the fetched trafficStats for efficient merging.
  // Key: Timestamp of the start of the day/month.
  // Value: Corresponding views and visitors count.
  const statsMap = new Map<number, { views: number; visitors: number }>();
  if (trafficStats) {
    for (const item of trafficStats) {
      const itemDate = parseISO(item.date);
      const keyDate = startOfIntervalFn(itemDate);

      statsMap.set(keyDate.getTime(), {
        views: item.views,
        visitors: item.visitors,
      });
    }
  }

  // 3. Map the full date range, merging data from the statsMap
  return dateRange.map((dateInInterval) => {
    const keyDate = startOfIntervalFn(dateInInterval);
    const stats = statsMap.get(keyDate.getTime());

    return {
      date: format(dateInInterval, displayFormat),
      views: stats?.views ?? 0,
      visitors: stats?.visitors ?? 0,
    };
  });
};
