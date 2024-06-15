import "./env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const sql = postgres(process.env.POSTGRES_URL!);

export const db = drizzle(sql, { schema });
