import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connection = neon(process.env.DATABASE_URL!);

export const db = drizzle(connection, { schema });
