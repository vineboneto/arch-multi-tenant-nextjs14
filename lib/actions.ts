"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "./zod-adapter";
import { StateForm } from "./constants";
import { redirect } from "next/navigation";
import { PostgresError } from "postgres";

type FieldErrors<T> = {
  [K in keyof T]?: string[] | undefined;
};

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type Login = z.infer<typeof authSchema>;

export type LoginFieldErrors = FieldErrors<Login>;

export async function authenticate(
  prevState: StateForm<LoginFieldErrors, void>,
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

const productSchema = z.object({
  codigo: z.string().min(1).max(10),
  nome: z.string().min(1),
  ativo: z.boolean(),
  dataCriacao: z.date().nullish(),
});

export type Product = z.infer<typeof productSchema>;

export type ProductFieldErrors = FieldErrors<Product>;

export async function createProduct(
  prevState: StateForm<ProductFieldErrors, { data: { id: number } }>,
  formData: FormData
) {
  try {
    const validate = productSchema.safeParse({
      codigo: formData.get("codigo"),
      nome: formData.get("nome"),
      ativo:
        formData.get("ativo") === "S"
          ? true
          : formData.get("ativo") === "N"
          ? false
          : undefined,
      dataCriacao: formData.get("dataCriacao"),
    });

    console.log({ validate }, validate.error);

    if (!validate.success) {
      return {
        errors: validate.error.flatten().fieldErrors,
      };
    }

    return { id: 1 };
  } catch (err) {
    if (err instanceof PostgresError) {
      return {
        message: "Algo de errado aconteceu tente novamente mais tarde",
      };
    }
    throw err;
  }
}
