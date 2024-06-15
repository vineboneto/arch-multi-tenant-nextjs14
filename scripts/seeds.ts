import { users } from "@/lib/drizzle/schema";
import { db, sql } from "./sql-one-pool";
import bcrypt from "bcrypt";

async function main() {
  try {
    await db
      .insert(users)
      .values({
        email: "vineboneto@gmail.com",
        name: "vineboneto",
        password: bcrypt.hashSync("123456", bcrypt.genSaltSync()),
      })
      .onConflictDoNothing({ target: users.email })
      .execute();
    console.log("done");
  } catch (err) {
    console.log(err);
  } finally {
    sql.end();
  }
}

main();
