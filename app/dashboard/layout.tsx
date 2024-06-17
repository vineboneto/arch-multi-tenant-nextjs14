import { Button } from "@/components/ui/button";
import { Nav } from "./_components/nav";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

function Profile() {
  return (
    <form
      className="w-full"
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
      <Button
        size="icon"
        variant="ghost"
        className="w-full flex justify-between px-2"
      >
        Logout
        <div>
          <LogOut className="w-4 h-4" />
        </div>
      </Button>
    </form>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-stone-900 fixed min-h-screen sm:w-60 py-2 grid grid-rows-[5rem_1fr]">
        <div className="flex py-6 px-3">
          <h3 className="scroll-m-20 px-2 text-2xl font-semibold tracking-tight">
            Multi Tenant
          </h3>
        </div>
        <Nav>
          <div className="flex flex-col items-end w-full ">
            <Separator className="my-2 h-0.5" />
            <Profile />
          </div>
        </Nav>
      </div>

      <main className="sm:pl-60">{children}</main>
    </div>
  );
}
