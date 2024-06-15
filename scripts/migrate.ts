import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, sql } from "./sql-one-pool";

migrate(db, { migrationsFolder: "./migrations" })
  .then(async () => {
    console.log("done");
    await sql.end();
  })
  .catch(console.log);
