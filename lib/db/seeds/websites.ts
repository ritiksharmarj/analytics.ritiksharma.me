import { type db } from "@/lib/db";
import websitesJson from "./data/websites.json";
import * as schema from "@/lib/db/schema";

export default async function seed(db: db) {
  const user = await db.query.user.findFirst();
  if (!user) {
    throw new Error("❌ No user found in database. Please sign in first.");
  }

  const websiteTable = websitesJson.map((site) => {
    return {
      ...site,
      userId: user.id,
    };
  });

  await db.insert(schema.websites).values(websiteTable);
}
