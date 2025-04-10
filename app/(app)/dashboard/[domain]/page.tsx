import { StatsFeed } from "@/components/app/domain/stats-feed";
import { TopPagesFeed } from "@/components/app/domain/top-pages-feed";
import { StatsFeedSkeleton, TopPagesFeedSkeleton } from "@/components/skeleton";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import * as React from "react";

// Define chart colors configuration
// const chartConfig = {
// pageviews: {
// label: "Pageviews",
//     theme: {
//       light: "hsl(var(--primary))",
//       dark: "hsl(var(--primary))",
//     },
//   },
//   pages: {
//     label: "Pages",
//     theme: {
//       light: "hsl(var(--primary))",
//       dark: "hsl(var(--primary))",
//     },
//   },
//   referrers: {
//     label: "Referrers",
//     theme: {
//       light: "hsl(var(--primary))",
//       dark: "hsl(var(--primary))",
//     },
//   },
//   countries: {
//     label: "Countries",
//     theme: {
//       light: "hsl(var(--primary))",
//       dark: "hsl(var(--primary))",
//     },
//   },
//   screenSizes: {
//     label: "Screen Sizes",
//     theme: {
//       light: "hsl(var(--primary))",
//       dark: "hsl(var(--primary))",
//     },
//   },
// };

// Define pie chart colors
// const CHART_COLORS = [
//   "hsl(215, 80%, 56%)", // Blue
//   "hsl(142, 71%, 45%)", // Green
//   "hsl(47, 100%, 68%)", // Yellow
//   "hsl(0, 84%, 60%)", // Red
//   "hsl(271, 70%, 60%)", // Purple
//   "hsl(190, 90%, 50%)", // Cyan
//   "hsl(169, 70%, 45%)", // Teal
//   "hsl(318, 70%, 55%)", // Pink
//   "hsl(41, 100%, 60%)", // Orange
// ];

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

  // // Get analytics data
  // const pageviews = await getAnalyticsData(website.id);

  // // Calculate total pageviews
  // const totalPageviews = pageviews.length;

  // const uniquePaths = new Set(pageviews.map((pv) => pv.path)).size;

  // // Calculate unique referrers (excluding empty ones)
  // const uniqueReferrers = new Set(
  //   pageviews
  //     .map((pv) => pv.referrer)
  //     .filter((ref) => ref && ref.trim() !== ""),
  // ).size;

  // // Calculate unique countries
  // const uniqueCountries = new Set(
  //   pageviews.map((pv) => pv.countryCode).filter(Boolean),
  // ).size;

  // // Prepare pageviews by day data
  // const pageviewsByDay = pageviews.reduce(
  //   (acc, pv) => {
  //     const day = format(new Date(pv.createdAt), "MMM dd");
  //     acc[day] = (acc[day] || 0) + 1;
  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  // const pageviewsChartData = Object.entries(pageviewsByDay).map(
  //   ([date, count]) => ({
  //     date,
  //     pageviews: count,
  //   }),
  // );

  // // Prepare top pages data
  // const pagesByViews = pageviews.reduce(
  //   (acc, pv) => {
  //     acc[pv.path] = (acc[pv.path] || 0) + 1;
  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  // const topPages = Object.entries(pagesByViews)
  //   .map(([page, count]) => ({ page, count }))
  //   .sort((a, b) => b.count - a.count)
  //   .slice(0, 5);

  // // Prepare referrers data
  // const referrersByCount = pageviews.reduce(
  //   (acc, pv) => {
  //     if (pv.referrer && pv.referrer.trim() !== "") {
  //       // Extract domain from referrer URL
  //       let referrer = pv.referrer;
  //       try {
  //         const url = new URL(pv.referrer);
  //         referrer = url.hostname;
  //       } catch (e) {
  //         // If not a valid URL, use as is
  //       }
  //       acc[referrer] = (acc[referrer] || 0) + 1;
  //     } else {
  //       acc["Direct / None"] = (acc["Direct / None"] || 0) + 1;
  //     }
  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  // const topReferrers = Object.entries(referrersByCount)
  //   .map(([referrer, count]) => ({ referrer, count }))
  //   .sort((a, b) => b.count - a.count)
  //   .slice(0, 5);

  // // Prepare countries data
  // const countriesByCount = pageviews.reduce(
  //   (acc, pv) => {
  //     if (pv.countryCode) {
  //       acc[pv.countryCode] = (acc[pv.countryCode] || 0) + 1;
  //     } else {
  //       acc.Unknown = (acc.Unknown || 0) + 1;
  //     }
  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  // const topCountries = Object.entries(countriesByCount)
  //   .map(([country, count]) => ({ country, count }))
  //   .sort((a, b) => b.count - a.count)
  //   .slice(0, 5);

  // // Prepare screen sizes data
  // const screenSizesByCount = pageviews.reduce(
  //   (acc, pv) => {
  //     const size = pv.screenSize || "Unknown";
  //     acc[size] = (acc[size] || 0) + 1;
  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  // const topScreenSizes = Object.entries(screenSizesByCount)
  //   .map(([size, count]) => ({ size, count }))
  //   .sort((a, b) => b.count - a.count)
  //   .slice(0, 5);

  return (
    <div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 col-span-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{website.name}</h1>
          <p className="text-muted-foreground">{domain}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Last 7 days</div>
        </div>
      </div>

      {/* Stats Cards */}
      <React.Suspense fallback={<StatsFeedSkeleton />}>
        <StatsFeed websiteId={website.id} />
      </React.Suspense>

      {/* Pages Tab */}
      <React.Suspense fallback={<TopPagesFeedSkeleton />}>
        <TopPagesFeed websiteId={website.id} />
      </React.Suspense>

      {/* Pageviews Over Time Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Pageviews Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={chartConfig}>
            <BarChart data={pageviewsChartData}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                content={
                  <ChartTooltipContent labelKey="date" nameKey="pageviews" />
                }
              />
              <Bar
                dataKey="pageviews"
                fill="var(--color-pageviews)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card> */}

      {/* Tabs for detailed analytics */}
      {/* <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="devices">Screen Sizes</TabsTrigger>
        </TabsList> */}

      {/* Pages Tab */}
      {/* <TabsContent value="pages" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="truncate max-w-[250px]">
                        <span className="font-medium">{item.page}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {item.count} views
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pages Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[250px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={topPages}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {topPages.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent nameKey="name" labelKey="value" />
                      }
                    />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

      {/* Referrers Tab */}
      {/* <TabsContent value="referrers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topReferrers.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="truncate max-w-[250px]">
                        <span className="font-medium">{item.referrer}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {item.count} referrals
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referrer Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[250px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={topReferrers}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {topReferrers.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent nameKey="name" labelKey="value" />
                      }
                    />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

      {/* Countries Tab */}
      {/* <TabsContent value="countries" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCountries.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium">{item.country}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {item.count} views
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Country Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[250px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={topCountries}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {topCountries.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent nameKey="name" labelKey="value" />
                      }
                    />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

      {/* Screen Sizes Tab */}
      {/* <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Screen Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topScreenSizes.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium">{item.size}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {item.count} views
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Screen Size Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[250px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={topScreenSizes}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {topScreenSizes.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent nameKey="name" labelKey="value" />
                      }
                    />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
