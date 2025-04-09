import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const WebsiteFeed = async () => {
  const websites = await db.select().from(schema.websites);

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
