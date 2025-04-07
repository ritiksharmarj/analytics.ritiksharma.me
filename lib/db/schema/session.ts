import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import user from "./user";
import { nanoid } from "nanoid";

const session = pgTable("session", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid()),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export default session;
