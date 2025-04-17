import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import websites from "./websites";

const pageviews = pgTable("pageviews", {
  id: text("id")
    .primaryKey()
    .$default(() => uuidv4()),
  host: text("host").notNull(),
  path: text("path").notNull(),
  countryCode: text("country_code"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  browser: text("browser"),
  os: text("os"),
  device: text("device"),
  sessionId: text("session_id"),
  visitId: text("visit_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
});

export default pageviews;
