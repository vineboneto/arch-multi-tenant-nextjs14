import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

function isRedirectError(error: Error & { digest?: string }) {
  return !!error.digest?.startsWith("NEXT_REDIRECT");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:min-h-screen">
      <header className="w-full h-12 grid grid-cols-[95%_1fr] items-center px-4">
        <div></div>

        <form
          action={async () => {
            "use server";
            try {
              await signOut({
                redirect: false,
              });
            } catch (err) {
              if (err instanceof Error && isRedirectError(err)) throw err;
            } finally {
              // TODO: Redirect of SignOut not Working: url permance a msm
              redirect("/login");
            }
          }}
        >
          <Button variant="ghost">Log out</Button>
        </form>
      </header>
      <main className="my-2 px-4">{children}</main>
    </div>
  );
}
