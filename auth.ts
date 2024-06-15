import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/drizzle/db";
import { CustomAuthError } from "./lib/error";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.query.users.findFirst({
          columns: {
            email: true,
            id: true,
            name: true,
            password: true,
          },
          where: (users, { eq }) => eq(users.email, email),
        });

        if (!user)
          throw new CustomAuthError("Invalid credentials", "AccountNotLinked");

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new CustomAuthError("Invalid credentials", "CredentialsSignin");
        }

        return {
          email: user.email,
          name: user.name,
          id: String(user.id),
        };
      },
    }),
  ],
});
