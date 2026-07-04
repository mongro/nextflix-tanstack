import { n as useServerFn, t as Card } from "./card-C89UFiv_.js";
import { n as signUpFormSchema } from "./schema-B287OkrG.js";
import { t as Button } from "./button-B_qHKP16.js";
import { a as FieldGroup, i as FieldError, n as Field, o as FieldLabel, r as FieldDescription, t as Input } from "./input-EPCua9JZ.js";
import { n as signUp } from "./actions-JL1RqNQv.js";
import { useActionState, useEffect, useTransition } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
//#region src/components/auth/register-form.tsx
function SignUpForm() {
	const register = useServerFn(signUp);
	const registerAction = (initialState, formData) => {
		return register({ data: formData });
	};
	const [actionState, submitAction, isPending] = useActionState(registerAction, { success: false });
	const [, startTransition] = useTransition();
	const form = useForm({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			password: "",
			email: ""
		}
	});
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	useEffect(() => {
		if (actionState.success) {
			queryClient.refetchQueries({ queryKey: ["session"] });
			navigate({ to: "/" });
		}
	}, [
		actionState.success,
		navigate,
		queryClient
	]);
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-2xl mb-4",
		children: "Sign Up"
	}), /* @__PURE__ */ jsx("form", {
		action: submitAction,
		onSubmit: form.handleSubmit((_, e) => {
			startTransition(() => {
				submitAction(new FormData(e?.target));
			});
		}),
		children: /* @__PURE__ */ jsxs(FieldGroup, { children: [
			/* @__PURE__ */ jsx(Controller, {
				name: "email",
				control: form.control,
				render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, {
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ jsx(FieldLabel, {
							htmlFor: field.name,
							children: "Email"
						}),
						/* @__PURE__ */ jsx(Input, {
							...field,
							id: field.name,
							"aria-invalid": fieldState.invalid,
							placeholder: "Your email address",
							autoComplete: "off"
						}),
						fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ jsx(Controller, {
				name: "password",
				control: form.control,
				render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, {
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ jsx(FieldLabel, {
							htmlFor: field.name,
							children: "Password"
						}),
						/* @__PURE__ */ jsx(Input, {
							...field,
							id: field.name,
							"aria-invalid": fieldState.invalid,
							placeholder: "Your strong password",
							autoComplete: "off"
						}),
						/* @__PURE__ */ jsx(FieldDescription, { children: "Password must be at least 8 characters long." }),
						fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ jsx(Controller, {
				name: "name",
				control: form.control,
				render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, {
					"data-invalid": fieldState.invalid,
					children: [
						/* @__PURE__ */ jsx(FieldLabel, {
							htmlFor: field.name,
							children: "Username"
						}),
						/* @__PURE__ */ jsx(Input, {
							...field,
							id: field.name,
							"aria-invalid": fieldState.invalid,
							placeholder: "Your username",
							autoComplete: "off"
						}),
						/* @__PURE__ */ jsx(FieldDescription, { children: "Choose a unique username for your account." }),
						fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ jsx(Button, {
				type: "submit",
				disabled: isPending,
				children: isPending ? "Registering..." : "Register"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Already have an Account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: `/$lang/auth/login`,
						params: ({ lang }) => ({ lang: lang || "en" }),
						className: "underline",
						children: "Sign In"
					})
				]
			})
		] })
	})] });
}
//#endregion
//#region src/routes/$lang/auth/register/index.tsx?tsr-split=component
function SignUpPage() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-12 mx-auto max-w-md px-4",
		children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(SignUpForm, {}) })
	});
}
//#endregion
export { SignUpPage as component };
