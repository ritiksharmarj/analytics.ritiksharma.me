import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import env from "../env";

export const connection = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(connection, { schema, logger: true });
