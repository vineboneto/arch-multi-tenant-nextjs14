import { Button } from "@/components/ui/button";
import { Nav } from "./_components/nav";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-stone-900 fixed h-screen sm:w-60 py-2">
        <div className="flex py-6 px-3">
          <h3 className="scroll-m-20 px-2 text-2xl font-semibold tracking-tight">
            Multi Tenant
          </h3>
        </div>
        <Nav />
      </div>

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
            } finally {
              // TODO: Redirect of SignOut not Working: url permance a msm
              redirect("/login");
            }
          }}
        >
          <Button variant="ghost">Log out</Button>
        </form>
      </header>
      <main className="sm:pl-60">{children}</main>
    </div>
  );
}
