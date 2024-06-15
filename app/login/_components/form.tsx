"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/form";
import { authenticate } from "@/lib/actions";
import type { LoginFieldErrors } from "@/lib/actions";
import { ErrorMessage } from "@/components/ui/error-message";
import { StateForm } from "@/lib/constants";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const initialState: StateForm<LoginFieldErrors> = undefined;

export function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Root state={state} action={dispatch} className="space-y-4">
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Input type="email" name="email" id="email" placeholder="Email" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Senha</Form.Label>
        <div className="relative">
          <Form.Input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Senha"
          />
          <div className="absolute top-2 right-0 h-full px-2">
            <button
              onClick={() => setShowPassword((old) => !old)}
              type="button"
              className="cursor-pointer hover:text-stone-500 transition-colors duration-300"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
      </Form.Group>

      <div className="space-y-2">
        <div className="flex w-full">
          <LoginButton />
        </div>
        <div>
          <Link
            className="text-sm hover:border-b border-b-white"
            href="/register"
          >
            Registrar-se
          </Link>
        </div>
      </div>

      {state?.message && (
        <div className="flex space-x-2 items-center justify-center w-full">
          <ErrorMessage message={state.message} />
        </div>
      )}
    </Form.Root>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="secondary"
      type="submit"
      className="w-full"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  );
}
