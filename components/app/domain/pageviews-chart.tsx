"use client";

import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { subDays, format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const generateDummyData = () => {
  const endDate = new Date();
  const data = [];

  // Generate a data point for each of the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = subDays(endDate, i);
    const dateStr = format(date, "MMM dd");

    // Generate random numbers for views and visitors
    // Views are always higher than visitors
    const visitors = Math.floor(Math.random() * 100) + 10;
    const views = visitors + Math.floor(Math.random() * 150) + 50;

    data.push({
      date: dateStr,
      views,
      visitors,
    });
  }

  return data;
};

const chartData = generateDummyData();

const chartConfig = {
  views: {
    label: "Views",
    color: "#2563eb",
  },
  visitors: {
    label: "Visitors",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const PageviewsChart = () => {
  return (
    <Card className="col-span-full max-h-[460px]">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="views" fill="var(--color-views)" radius={4} />
          <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};
