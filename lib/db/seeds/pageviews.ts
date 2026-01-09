import { subDays } from "date-fns";
import type { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import pageviewsJson from "./data/pageviews.json";

function getRandomDateLastNDays(days: number): Date {
  const today = new Date();
  const start = subDays(today, days);
  const randomTimestamp =
    start.getTime() + Math.random() * (today.getTime() - start.getTime());
  return new Date(randomTimestamp);
}

export default async function seed(db: db) {
  const websites = await db.select().from(schema.websites);

  const pageviewsTable = websites.flatMap((site) => {
    return pageviewsJson.map((pv) => {
      // Calculate a realistic date within the last 7 days
      const timestamp = getRandomDateLastNDays(7);

      return {
        ...pv,
        host: site.domain,
        websiteId: site.id,
        sessionId: `${pv.sessionId}-${site.id}`,
        visitId: `${pv.visitId}-${site.id}`,
        createdAt: timestamp,
      };
    });
  });

  console.log("🌱 Seeding pageviews...");
  await db.insert(schema.pageviews).values(pageviewsTable);
  console.log("✅ Pageviews seeded");
}
