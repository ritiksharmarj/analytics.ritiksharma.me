import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import websites from "./websites";

const pageviews = pgTable("pageviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  host: text("host").notNull(),
  path: text("path").notNull(),
  screenSize: text("screen_size"),
  countryCode: text("country_code"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  websiteId: uuid("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
});

export default pageviews;
