"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Form } from "@/components/form";

import { ProductFieldErrors, createProduct } from "@/lib/actions";
import { ATIVO_OPTIONS, StateForm } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import BrowserV6Field from "@/components/date-picker/date-picker";

const initialState: StateForm<ProductFieldErrors, { data: { id: number } }> =
  undefined;

export function FormProduto() {
  const [state, dispatch] = useFormState(createProduct, initialState);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Form.Root
      action={(data) => {
        data.set("dataCriacao", date?.toISOString() || "");
        dispatch(data);
      }}
      state={state}
      className="grid grid-cols-4  gap-2"
    >
      <Form.Group>
        <Form.Label htmlFor="codigo">Código</Form.Label>
        <Form.Input id="codigo" name="codigo" placeholder="Código" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="nome">Nome</Form.Label>
        <Form.Input id="nome" name="nome" placeholder="Nome" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="ativo">Ativo?</Form.Label>
        <Form.Select
          id="ativo"
          placeholder="Ativo?"
          name="ativo"
          options={Object.values(ATIVO_OPTIONS)}
        />
      </Form.Group>
      <div>
        <BrowserV6Field
          label="Data Criação"
          name="dataCriacao"
          value={date}
          onChange={setDate}
        />
      </div>
      <div>
        <Button type="submit" size="sm" className="btn-ok">
          Criar
        </Button>
      </div>
    </Form.Root>
  );
}
