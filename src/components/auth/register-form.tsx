import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import type {
  SignUpActionState,
  SignUpFormData} from "~/lib/auth/schema";
import {
  signUpFormSchema,
} from "~/lib/auth/schema";
import { signUp } from "~/lib/auth/actions";
import { refreshSession, sessionQueryKey } from "~/lib/auth/auth-client";

export function SignUpForm() {
  const register = useServerFn(signUp);
  const registerAction = (
    initialState: SignUpActionState,
    formData: FormData,
  ): Promise<SignUpActionState> => {
    return register({ data: formData });
  };
  const [actionState, submitAction, isPending] = useActionState(
    registerAction,
    {
      success: false,
    },
  );
  const [, startTransition] = useTransition();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (actionState.success) {
      try {
        refreshSession(queryClient);
      } catch {
        queryClient.removeQueries({ queryKey: sessionQueryKey });
      }
      navigate({ from: "/$lang/auth/login/", to: "/$lang" });
    }
  }, [actionState.success, navigate, queryClient]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <form
        action={submitAction}
        onSubmit={form.handleSubmit((_, e) => {
          startTransition(() => {
            const formData = new FormData(e?.target);
            submitAction(formData);
          });
        })}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Your email address"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Your strong password"
                  autoComplete="off"
                />
                <FieldDescription>
                  Password must be at least 8 characters long.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Your username"
                  autoComplete="off"
                />
                <FieldDescription>
                  Choose a unique username for your account.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an Account?{" "}
            <Link
              to={`/$lang/auth/login`}
              params={({ lang }) => ({ lang: lang || "en" })}
              className="underline"
            >
              Sign In
            </Link>
          </p>
        </FieldGroup>
      </form>
    </div>
  );
}
