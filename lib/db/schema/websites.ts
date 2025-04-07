import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import user from "./user";
import { nanoid } from "nanoid";

const websites = pgTable("websites", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid()),
  domain: text("domain").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export default websites;
