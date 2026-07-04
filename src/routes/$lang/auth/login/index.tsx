import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "~/components/auth/login-form";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/$lang/auth/login/")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="mt-12 mx-auto max-w-md px-4">
      <Card>
        <SignInForm />
      </Card>
    </div>
  );
}
