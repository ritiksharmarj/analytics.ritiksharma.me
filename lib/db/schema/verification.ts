import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

const verification = pgTable("verification", {
  id: text("id")
    .primaryKey()
    .$default(() => uuidv4()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export default verification;
