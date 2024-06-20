"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "./zod-adapter";
import { StateForm } from "./constants";
import { redirect } from "next/navigation";
import { db } from "./drizzle/db";
import { products } from "./drizzle/schema";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
  prevState: StateForm<LoginFieldErrors, never>,
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

    return { data: redirect("/dashboard") };
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
  code: z.string().min(1).max(10),
  name: z.string().min(1),
  active: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

export type ProductFieldErrors = FieldErrors<Product>;

export async function createProduct(
  prevState: StateForm<ProductFieldErrors, { id: number }>,
  formData: FormData
) {
  try {
    const validate = productSchema.safeParse({
      code: formData.get("code"),
      name: formData.get("name"),
      active:
        formData.get("active") === "S"
          ? true
          : formData.get("active") === "N"
          ? false
          : undefined,
    });

    if (!validate.success) {
      return {
        errors: validate.error.flatten().fieldErrors,
      };
    }

    const { data } = validate;

    const [result] = await db
      .insert(products)
      .values({ code: data.code, name: data.name, created_at: new Date() })
      .returning({ id: products.id });
    if (!result)
      return {
        message: "Algo de errado aconteceu tente novamente mais tarde",
      };

    revalidatePath("/dashboard/produto");
    return { data: { id: result.id } };
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === "23505") {
        return {
          message:
            "Erro: O código do produto já está em uso. Por favor, use um código diferente.",
        };
      }

      return {
        message: "Algo de errado aconteceu tente novamente mais tarde",
      };
    }
    throw error;
  }
}

export async function loadProducts() {
  const data = await db.query.products.findMany({
    orderBy: (products, { asc }) => [asc(products.created_at)],
  });

  return data;
}

export async function deleteProduct(
  prev: any = undefined,
  formData: FormData
): Promise<void> {
  await new Promise((res) => setTimeout(res, 1000 * 5));
  const productId = Number(formData.get("id"));

  if (!productId) return;

  await db.delete(products).where(eq(products.id, productId));
  revalidatePath("/dashboard/produto");
  return;
}
