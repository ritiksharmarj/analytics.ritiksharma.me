import type { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { subDays } from "date-fns";
import websitesJson from "./data/websites.json";

export default async function seed(db: db) {
  const user = await db.query.user.findFirst();
  if (!user) {
    throw new Error("❌ No user found in database. Please sign in first.");
  }

  const today = new Date();

  const websiteTable = websitesJson.map((site, idx) => {
    // Calculate dates relative to 'today' (e.g., 10, 11 days ago)
    const timestamp = subDays(today, 10 + idx);

    return {
      ...site,
      userId: user.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  });

  console.log("🌱 Seeding websites...");
  await db.insert(schema.websites).values(websiteTable);
  console.log("✅ Websites seeded");
}
