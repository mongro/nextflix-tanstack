import { ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { SignUpAnonym } from "~/components/auth/sign-up-anonym";
import { Footer } from "~/components/footer";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/$lang/auth")({
  component: Layout,
});
function Layout() {
  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center w-full">
      <div className="w-full">
        <Outlet />
      </div>
      <SignUpAnonym />
      <div className="grow flex justify-center items-center">
        <Button asChild variant="outline" size="lg">
          <Link from="/$lang/auth" to="/$lang">
            Back to Homepage
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}
