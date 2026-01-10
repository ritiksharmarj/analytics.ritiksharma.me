import { authenticatedRole, authUid, crudPolicy } from "drizzle-orm/neon";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import user from "./user";

const websites = pgTable(
  "websites",
  {
    id: text("id")
      .primaryKey()
      .$default(() => uuidv4()),
    name: text("name").notNull(),
    domain: text("domain").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    // Users can only access their own websites
    crudPolicy({
      role: authenticatedRole,
      read: authUid(table.userId),
      modify: authUid(table.userId),
    }),
  ],
);

export default websites;
