import { reset, seed } from "drizzle-seed";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import websitesJson from "./seeds/data/websites.json";
import pageviewsJson from "./seeds/data/pageviews.json";

async function main() {
  console.log("🌱 Starting database seeding process...");

  try {
    console.log("🧹 Resetting database...");
    await reset(db, {
      websites: schema.websites,
      pageviews: schema.pageviews,
    });
    console.log("✅ Reset complete");

    // find existing user
    const user = await db.query.user.findFirst();
    if (!user) {
      console.error("❌ No user found in database. Please sign in first.");
      process.exit(1);
    }
    console.log(`👤 Found user: ${user.name} (${user.email})`);

    // Seed the database
    await seed(db, {
      websites: schema.websites,
      pageviews: schema.pageviews,
    }).refine((funcs) => ({
      websites: {
        count: websitesJson.length,
        columns: {
          name: funcs.valuesFromArray({
            values: websitesJson.map((site) => site.name),
          }),
          domain: funcs.valuesFromArray({
            values: websitesJson.map((site) => site.domain),
          }),
          userId: funcs.default({ defaultValue: user.id }),
        },
        with: {
          pageviews: pageviewsJson.length,
        },
      },
      pageviews: {
        columns: {
          host: funcs.valuesFromArray({
            values: pageviewsJson.map((pv) => pv.host),
          }),
          path: funcs.valuesFromArray({
            values: pageviewsJson.map((pv) => pv.path),
          }),
          screenSize: funcs.valuesFromArray({
            values: pageviewsJson.map((pv) => pv.screenSize),
          }),
          countryCode: funcs.valuesFromArray({
            values: pageviewsJson.map((pv) => pv.countryCode),
          }),
          userAgent: funcs.valuesFromArray({
            values: pageviewsJson.map((pv) => pv.userAgent),
          }),
          referrer: funcs.valuesFromArray({
            values: pageviewsJson.map((pv) => pv.referrer),
          }),
        },
      },
    }));

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed: ", error);
    process.exit(1);
  }
}

main();
