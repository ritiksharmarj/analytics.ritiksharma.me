import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(connection, { schema, logger: true });
