import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user";

const websites = pgTable("websites", {
  id: uuid("id").defaultRandom().primaryKey(),
  domain: text("domain").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export default websites;
