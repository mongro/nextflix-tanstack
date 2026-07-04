import { n as useServerFn, t as Card } from "./card-C89UFiv_.js";
import { t as signInFormSchema } from "./schema-B287OkrG.js";
import { t as Button } from "./button-B_qHKP16.js";
import { a as FieldGroup, i as FieldError, n as Field, o as FieldLabel, t as Input } from "./input-EPCua9JZ.js";
import { t as signIn } from "./actions-JL1RqNQv.js";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
//#region src/components/auth/login-form.tsx
function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);
	const login = useServerFn(signIn);
	const loginAction = (initialState, formData) => {
		return login({ data: formData });
	};
	const [actionState, submitAction, isPending] = useActionState(loginAction, { success: false });
	const [, startTransition] = useTransition();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const form = useForm({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			password: "",
			email: ""
		}
	});
	useEffect(() => {
		if (actionState.success) {
			queryClient.refetchQueries({ queryKey: ["session"] });
			navigate({ to: "/" });
		}
	}, [actionState.success, navigate]);
	const toggleSetShowPassword = () => {
		setShowPassword((value) => !value);
	};
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-2xl mb-4",
		children: "Sign in"
	}), /* @__PURE__ */ jsx("form", {
		action: submitAction,
		onSubmit: form.handleSubmit((_, e) => {
			e?.preventDefault();
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
						actionState.fieldErrors?.email && /* @__PURE__ */ jsx(FieldError, { errors: [{ message: actionState.fieldErrors?.email[0] }] }),
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
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ jsx(FieldLabel, {
								htmlFor: field.name,
								children: "Password"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: /* @__PURE__ */ jsxs(Link, {
									to: `/$lang/auth/forget`,
									params: ({ lang }) => ({ lang: lang || "en" }),
									children: [" ", "Don't remember your password?"]
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Input, {
								...field,
								id: field.name,
								"aria-invalid": fieldState.invalid,
								placeholder: "Your password",
								autoComplete: "off",
								type: showPassword ? "text" : "password"
							}), /* @__PURE__ */ jsx("div", {
								className: "absolute right-2 top-0 flex items-center justify-center h-full",
								children: /* @__PURE__ */ jsx(Button, {
									onClick: toggleSetShowPassword,
									size: "icon-sm",
									variant: "outline",
									type: "button",
									className: " rounded-full",
									children: showPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, {}) : /* @__PURE__ */ jsx(EyeIcon, {})
								})
							})]
						}),
						fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
					]
				})
			}),
			/* @__PURE__ */ jsx(Button, {
				type: "submit",
				disabled: isPending,
				children: isPending ? "Loggin In..." : "Login"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Dont have an Account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: `/$lang/auth/register`,
						params: ({ lang }) => ({ lang: lang || "en" }),
						className: "underline",
						children: "Sign Up"
					})
				]
			})
		] })
	})] });
}
//#endregion
//#region src/routes/$lang/auth/login/index.tsx?tsr-split=component
function SignInPage() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-12 mx-auto max-w-md px-4",
		children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(SignInForm, {}) })
	});
}
//#endregion
export { SignInPage as component };
