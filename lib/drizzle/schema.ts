import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique("users_email_key").notNull(),
  password: text("password").notNull(),
});

export type UserDB = typeof users.$inferSelect;
