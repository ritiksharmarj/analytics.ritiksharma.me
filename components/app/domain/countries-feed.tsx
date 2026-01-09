import { TopFeedSkeleton } from "@/components/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsTopCountries } from "@/hooks/use-analytics";
import countryNames from "@/lib/data/en-US.json";

const countryCodeToName = countryNames as Record<string, string>;

type Props = {
  websiteId: string;
  from: string;
  to: string;
};

export const TopCountriesFeed = ({ websiteId, from, to }: Props) => {
  const { topCountries, isLoading } = useGetAnalyticsTopCountries({
    websiteId,
    from,
    to,
  });

  if (isLoading) return <TopFeedSkeleton title="Top Countries" />;

  const topCountriesWithName = topCountries?.map((item) => ({
    ...item,
    name: countryCodeToName[item.code] || item.code,
  }));

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          {!topCountriesWithName?.length ? (
            <div>No data available</div>
          ) : (
            topCountriesWithName.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between gap-4"
              >
                <div>{item.name}</div>
                <div className="font-medium">{item.count}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
