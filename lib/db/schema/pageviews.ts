import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import websites from "./websites";

const pageviews = pgTable("pageviews", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid()),
  host: text("host").notNull(),
  path: text("path").notNull(),
  screenSize: text("screen_size"),
  countryCode: text("country_code"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
});

export default pageviews;
