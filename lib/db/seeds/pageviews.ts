import { type db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import pageviewsJson from "./data/pageviews.json";

export default async function seed(db: db) {
  const websites = await db.select().from(schema.websites);

  const pageviewsTable = websites.flatMap((site) => {
    return pageviewsJson.map((pv) => {
      return {
        ...pv,
        host: site.domain,
        websiteId: site.id,
      };
    });
  });

  await db.insert(schema.pageviews).values(pageviewsTable);
}
