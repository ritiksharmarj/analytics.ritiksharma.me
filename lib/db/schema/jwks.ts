import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

const jwks = pgTable("jwks", {
  id: text("id")
    .primaryKey()
    .$default(() => uuidv4()),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export default jwks;
