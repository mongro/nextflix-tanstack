import { t as Button } from "./button-B_qHKP16.js";
import { o as updateProfile } from "./profile-DWMdx_pb.js";
import { t as Route } from "./edit-D9g30B3G.js";
import { t as Avatar } from "./avatar-BtgSey3w.js";
import { t as Spinner } from "./spinner-OMjEHzBU.js";
import { a as FieldGroup, i as FieldError, n as Field, o as FieldLabel, t as Input } from "./input-EPCua9JZ.js";
import { t as AvatarSelect } from "./avatar-select-rtU5fGEM.js";
import { i as DialogDescription, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "./dialog-BNIhrj9v.js";
import { useActionState, useState, useTransition } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
//#region src/components/profile/update-profile-form.tsx
var updateProfileFormSchema = z.object({
	name: z.string().min(2, { message: "Enter a profile name." }),
	avatar: z.string({ message: "Select an avatar image." }),
	id: z.number({ message: "Invalid Profile Id" })
});
function UpdateProfileForm({ profile }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const formAction = async (prevState, formData) => {
		const result = await updateProfile({ data: formData });
		if (!result.error && profile) {
			queryClient.refetchQueries({ queryKey: ["profile"] });
			console.log("client", window ? "client" : "server");
			navigate({
				from: "/$lang",
				to: "./account/profiles/$id",
				params: { id: profile.id + "" }
			});
		}
		return result;
	};
	const [actionState, submitAction, isPending] = useActionState(formAction, {
		profile: null,
		error: null
	});
	const [showAvatarSelection, setShowAvatarSelection] = useState(false);
	const [, startTransition] = useTransition();
	const form = useForm({
		resolver: zodResolver(updateProfileFormSchema),
		defaultValues: {
			name: profile.name,
			id: profile.id,
			avatar: profile.avatar ?? ""
		}
	});
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-8 mb-8 font-bold",
		children: [/* @__PURE__ */ jsx(Link, {
			to: "..",
			children: /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "size-6" })
		}), /* @__PURE__ */ jsx("h1", {
			className: "text-2xl",
			children: "Edit profile"
		})]
	}), /* @__PURE__ */ jsx("form", {
		action: submitAction,
		onSubmit: form.handleSubmit((_, e) => {
			startTransition(() => {
				submitAction(new FormData(e?.target));
			});
		}),
		children: /* @__PURE__ */ jsxs(FieldGroup, { children: [
			/* @__PURE__ */ jsx(Controller, {
				name: "avatar",
				control: form.control,
				render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, {
					"data-invalid": fieldState.invalid,
					children: [/* @__PURE__ */ jsxs(Dialog, {
						open: showAvatarSelection,
						onOpenChange: setShowAvatarSelection,
						children: [/* @__PURE__ */ jsxs(DialogTrigger, {
							className: "w-1/2 max-w-64 flex items-center justify-center relative group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute flex items-center justify-center rounded-full size-10 group-hover:bg-background p-2 bg-background/50",
								children: /* @__PURE__ */ jsx(PencilIcon, {})
							}), /* @__PURE__ */ jsx(Avatar, {
								src: field.value,
								alt: "avatar",
								width: 512,
								height: 512
							})]
						}), /* @__PURE__ */ jsxs(DialogContent, { children: [
							/* @__PURE__ */ jsx(DialogTitle, { children: "Choose your avatar image" }),
							/* @__PURE__ */ jsx(DialogDescription, {}),
							/* @__PURE__ */ jsx(AvatarSelect, { onSelect: (avatar) => {
								form.setValue("avatar", avatar);
								console.log("set avaatr", avatar);
								setShowAvatarSelection(false);
							} })
						] })]
					}), /* @__PURE__ */ jsx(Input, {
						...field,
						id: field.name,
						"aria-invalid": fieldState.invalid,
						placeholder: "Name",
						autoComplete: "off",
						hidden: true,
						value: field.value ?? "",
						disabled: field.value === null
					})]
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
							children: "Name"
						}),
						/* @__PURE__ */ jsx(Input, {
							...field,
							id: field.name,
							"aria-invalid": fieldState.invalid,
							placeholder: "Name",
							autoComplete: "off"
						}),
						actionState.error && /* @__PURE__ */ jsx(FieldError, { errors: [actionState.error] })
					]
				})
			}),
			/* @__PURE__ */ jsx(Controller, {
				name: "id",
				control: form.control,
				render: ({ field, fieldState }) => /* @__PURE__ */ jsx(Field, {
					"data-invalid": fieldState.invalid,
					children: /* @__PURE__ */ jsx(Input, {
						...field,
						id: field.name,
						"aria-invalid": fieldState.invalid,
						autoComplete: "off",
						hidden: true
					})
				})
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "submit",
				disabled: isPending,
				children: [isPending && /* @__PURE__ */ jsx(Spinner, {}), isPending ? "Saving..." : "Save"]
			})
		] })
	})] });
}
//#endregion
//#region src/routes/$lang/account/profiles/$id/edit/index.tsx?tsr-split=component
function ProfileEdit() {
	const { profile, error } = Route.useLoaderData();
	if (error) return /* @__PURE__ */ jsx("div", { children: error.message });
	if (!profile) return /* @__PURE__ */ jsx("div", { children: "Profile doesnt exist" });
	return /* @__PURE__ */ jsx("div", {
		className: "",
		children: /* @__PURE__ */ jsx(UpdateProfileForm, { profile })
	});
}
//#endregion
export { ProfileEdit as component };
