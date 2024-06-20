import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique("users_email_key").notNull(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey().notNull(),
  code: varchar("code", { length: 20 }).unique("products_code_key").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type UserDB = typeof users.$inferSelect;
export type ProductDB = typeof products.$inferSelect;
