"use client";

import { authenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ban, ArrowRight } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
      </div>
      <div className="space-y-2">
        <div className="flex w-full">
          <LoginButton />
        </div>
        <div>
          <Link
            className="text-sm hover:border-b border-b-white"
            href="/session/register"
          >
            Register
          </Link>
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <Ban className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
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
    >
      Sign In <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
