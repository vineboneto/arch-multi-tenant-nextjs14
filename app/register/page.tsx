import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <Title>Multi Tenant Arch Register</Title>
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Password" />
        </div>
        <div className="space-y-2">
          <div className="flex w-full">
            <Button variant="secondary" className="w-full">
              Register
            </Button>
          </div>
          <div>
            <Link
              className="text-sm hover:border-b border-b-white"
              href="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
