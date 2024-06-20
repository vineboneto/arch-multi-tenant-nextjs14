"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ProductFieldErrors, createProduct } from "@/lib/actions";
import { ATIVO_OPTIONS, StateForm } from "@/lib/constants";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/form";

const initialState: StateForm<ProductFieldErrors, { id: number }> = undefined;

export function FormProduto() {
  const [state, dispatch] = useFormState(createProduct, initialState);
  const { pending } = useFormStatus();

  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      toast("Produto Criado com sucesso");
      router.push("/dashboard/produto");
    }
  }, [state, router]);

  return (
    <Form.Root
      action={dispatch}
      state={state}
      className="grid grid-cols-4  gap-2"
    >
      <div className="col-span-1">
        <Form.Group>
          <Form.Label htmlFor="code">Código</Form.Label>
          <Form.Input id="code" name="code" placeholder="Código" />
        </Form.Group>
      </div>
      <div className="col-span-1">
        <Form.Group>
          <Form.Label htmlFor="name">Nome</Form.Label>
          <Form.Input id="name" name="name" placeholder="Nome" />
        </Form.Group>
      </div>
      <div className="col-span-1">
        <Form.Group>
          <Form.Label htmlFor="active">Ativo?</Form.Label>
          <Form.Select
            id="active"
            defaultValue={ATIVO_OPTIONS.S.value}
            placeholder="Ativo?"
            name="active"
            options={Object.values(ATIVO_OPTIONS)}
          />
        </Form.Group>
      </div>
      <div />

      <div className="col-span-4">
        <div className="space-x-2 w-full flex justify-end">
          <Button
            type="button"
            onClick={() => router.back()}
            size="sm"
            className="btn-info"
          >
            Voltar
          </Button>
          <Button type="submit" size="sm" className="btn-ok">
            {pending ? "Criando..." : "Criar"}
          </Button>
        </div>
      </div>
      <div className="col-span-4">
        {state?.message && (
          <div className="flex space-x-2 items-center justify-center w-full">
            <ErrorMessage message={state.message} />
          </div>
        )}
      </div>
    </Form.Root>
  );
}
