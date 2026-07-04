import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "~/components/auth/register-form";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/$lang/auth/register/")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className="mt-12 mx-auto max-w-md px-4">
      <Card>
        <SignUpForm />
      </Card>
    </div>
  );
}
