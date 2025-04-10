import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { unstable_cache as cache } from "next/cache";

const getCachedWebsites = cache(
  async () => {
    return await db.select().from(schema.websites);
  },
  ["websites"],
  { revalidate: 3600, tags: ["websites"] },
);

export const WebsiteFeed = async () => {
  const websites = await getCachedWebsites();

  if (!websites.length) return <div>No websites</div>;

  return (
    <>
      {websites.map((site) => (
        <Card key={site.id} className="hover:border-ring transition-colors">
          <CardHeader>
            <CardTitle>{site.name}</CardTitle>
            <CardDescription>{site.domain}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};
