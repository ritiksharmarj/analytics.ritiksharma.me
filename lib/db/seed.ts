import { getTableName, sql, type Table } from "drizzle-orm";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import * as seeds from "./seeds";

async function resetTable(db: db, table: Table) {
  return await db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

async function main() {
  console.log("🌱 Starting database seeding process...");

  try {
    console.log("🧹 Resetting database...");
    for (const table of [schema.websites, schema.pageviews]) {
      // await db.delete(table); // clear tables without truncating / resetting ids
      await resetTable(db, table);
    }
    console.log("✅ Reset complete");

    await seeds.websites(db);
    await seeds.pageviews(db);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed: ", error);
    process.exit(1);
  }
}

main();
