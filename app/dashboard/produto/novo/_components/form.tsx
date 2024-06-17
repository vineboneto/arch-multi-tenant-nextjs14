"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Form } from "@/components/form";
import { format } from "date-fns";
import { ProductFieldErrors, createProduct } from "@/lib/actions";
import { ATIVO_OPTIONS, StateForm } from "@/lib/constants";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const initialState: StateForm<ProductFieldErrors, { data: { id: number } }> =
  undefined;

export function FormProduto() {
  const [state, dispatch] = useFormState(createProduct, initialState);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Form.Root
      action={(data) => {
        console.log(Array.from(data.values()));
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                new Date(date).toLocaleString("pt-BR", { dateStyle: "short" })
              ) : (
                <span>Escolha a data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Button type="submit" size="sm" className="btn-ok">
          Criar
        </Button>
      </div>
    </Form.Root>
  );
}
