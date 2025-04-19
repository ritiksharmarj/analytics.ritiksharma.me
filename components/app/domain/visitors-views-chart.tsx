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
import type { Pageviews } from "@/lib/db/schema";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  parse,
  parseISO,
} from "date-fns";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Define the props for the component
type VisitorsViewsChartProps = {
  pageviews: Pageviews[];
  from: string; // Expecting YYYY-MM-DD string
  to: string; // Expecting YYYY-MM-DD string
  period: string; // Add period prop (e.g., "7d", "6m", "12m")
};

// Define the structure for processed chart data
type ChartDataPoint = {
  date: string; // Formatted date string (e.g., "MMM dd")
  views: number;
  visitors: number;
};

const processChartData = (
  pageviews: Pageviews[],
  startDate: Date,
  endDate: Date,
  period: string,
): ChartDataPoint[] => {
  // Determine if aggregation should be monthly
  const aggregateByMonth = period.endsWith("m");

  // Create a map to store aggregated data per day or month
  const aggregatedData = new Map<
    string,
    { views: number; visitorSet: Set<string> }
  >();

  // Determine date format and interval function based on aggregation level
  const dateFormat = aggregateByMonth ? "yyyy-MM" : "yyyy-MM-dd";
  const displayDateFormat = aggregateByMonth ? "MMM yyyy" : "MMM dd";
  const intervalFunc = aggregateByMonth
    ? eachMonthOfInterval
    : eachDayOfInterval;
  const parseInputFormat = aggregateByMonth ? "yyyy-MM" : "yyyy-MM-dd"; // For parsing the key back

  // Generate all dates/months within the interval
  const dateInterval = intervalFunc({ start: startDate, end: endDate });

  // Initialize map with all dates/months in the range
  for (const date of dateInterval) {
    const dateKey = format(date, dateFormat);
    aggregatedData.set(dateKey, { views: 0, visitorSet: new Set() });
  }

  // Aggregate pageviews data
  for (const pv of pageviews) {
    const pvDate =
      typeof pv.createdAt === "string" ? parseISO(pv.createdAt) : pv.createdAt;
    // Use the determined date format for grouping
    const dateKey = format(pvDate, dateFormat);

    if (aggregatedData.has(dateKey)) {
      const dataPoint = aggregatedData.get(dateKey)!;
      dataPoint.views += 1;
      if (pv.sessionId) {
        dataPoint.visitorSet.add(pv.sessionId);
      }
    }
  }

  // Convert map to the final chart data array, sorted by date/month
  const chartData = Array.from(aggregatedData.entries())
    .map(([dateKey, data]) => {
      // Parse the dateKey back using the correct format
      const dateObject = parse(dateKey, parseInputFormat, new Date());
      return {
        // Format date for display using the determined format
        date: format(dateObject, displayDateFormat),
        views: data.views,
        visitors: data.visitorSet.size,
        // Store original date object for sorting
        originalDate: dateObject,
      };
    })
    // Sort using the original Date object
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime());

  return chartData;
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

export const VisitorsViewsChart = ({
  pageviews,
  from,
  to,
  period,
}: VisitorsViewsChartProps) => {
  const chartData = React.useMemo(() => {
    const startDate = parseISO(from);
    const endDate = parseISO(to);
    return processChartData(pageviews, startDate, endDate, period);
  }, [pageviews, from, to, period]);

  if (!chartData || chartData.length === 0) {
    return (
      <Card className="col-span-full flex h-[460px] items-center justify-center">
        <p className="text-muted-foreground">
          No data available for the selected period.
        </p>
      </Card>
    );
  }

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
