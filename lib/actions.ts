"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "./zod-adapter";
import { StateForm } from "./constants";
import { redirect } from "next/navigation";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFieldErrors = {
  email?: string[] | undefined;
  password?: string[] | undefined;
};

export async function authenticate(
  prevState: StateForm<LoginFieldErrors>,
  formData: FormData
) {
  try {
    const validate = authSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validate.success) {
      return {
        errors: validate.error.flatten().fieldErrors,
      };
    }

    // TODO: Redirect of signIn not Working: url permance a msm
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Credentiais inválidas.",
          };
        case "AccountNotLinked": {
          return {
            message: "Credentiais inválidas.",
          };
        }
        default:
          return {
            message: "Algo deu errado.",
          };
      }
    }

    throw error;
  }
}
