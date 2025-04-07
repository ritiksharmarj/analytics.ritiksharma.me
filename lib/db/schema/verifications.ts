import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

const verifications = pgTable("verifications", {
  id: t.serial("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
});

export default verifications;
