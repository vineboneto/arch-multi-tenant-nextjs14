import { config } from "dotenv";
config({ path: ".env.local" });
import postgres from "postgres";
import * as schema from "@/lib/drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";

export const sql = postgres(process.env.POSTGRES_URL!, { max: 1 });
export const db = drizzle(sql, { schema });
