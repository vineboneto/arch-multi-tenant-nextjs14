"use client";

import { deleteProduct } from "@/lib/actions";
import { CircleX, LoaderCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  id: string;
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button title="Excluir" type="submit">
      {pending ? (
        <LoaderCircle className="animate-spin h-4 w-4" />
      ) : (
        <CircleX className="w-4 h-4 text-red-900" />
      )}
    </button>
  );
}

export function DeleteProductButton({ id }: Props) {
  const [state, dispatch] = useFormState(deleteProduct, undefined);

  return (
    <form action={dispatch}>
      <input name="id" type="hidden" value={id} />
      <DeleteButton />
    </form>
  );
}
