import { t as Button } from "./button-B_qHKP16.js";
import { t as Route } from "./_id-DZ2CdylQ.js";
import { t as Spinner } from "./spinner-OMjEHzBU.js";
import { t as useDeleteProfile } from "./profile-BpUG0UXV.js";
import { a as DialogFooter, i as DialogDescription, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "./dialog-BNIhrj9v.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ChevronRightIcon$1 from "@heroicons/react/24/solid/ChevronRightIcon";
//#region src/components/profile/profile-delete-dialog.tsx
function ProfileDeleteDialog({ profileId }) {
	const [showDialog, setShowDialog] = useState(false);
	const navigate = useNavigate();
	const handleSuccess = () => {
		navigate({
			from: "/$lang",
			to: "./account/profiles"
		});
	};
	const mutation = useDeleteProfile(handleSuccess);
	return /* @__PURE__ */ jsxs(Dialog, {
		open: showDialog,
		onOpenChange: setShowDialog,
		children: [/* @__PURE__ */ jsx(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				variant: "destructive",
				size: "lg",
				children: [" ", "Delete Profile"]
			})
		}), /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: "Really delete profile?" }),
			/* @__PURE__ */ jsx(DialogDescription, { children: "All data will be gone and can never be recoverd." }),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsxs(Button, {
				onClick: () => mutation.mutate({ profileId }),
				variant: "destructive",
				disabled: mutation.isPending,
				children: [mutation.isPending && /* @__PURE__ */ jsx(Spinner, {}), mutation.isPending ? "Deleting..." : "Delete Profile"]
			}), /* @__PURE__ */ jsx(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "secondary",
					children: "Cancel"
				})
			})] })
		] })]
	});
}
//#endregion
//#region src/components/profile/profile-settings.tsx
function ProfileSettings({ profile }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: "p-4 border-2 rounded mt-4",
		children: /* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", {
			className: "border-b-2",
			children: /* @__PURE__ */ jsx(Link, {
				from: "/$lang",
				to: "./account/profiles/$id/edit",
				params: { id: profile.id + "" },
				className: "p-4 hover:bg-accent/50 block",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center ",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-lg font-bold grow",
						children: "Edit Profile"
					}), /* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "size-6 pl-2" })]
				})
			})
		}), /* @__PURE__ */ jsx("li", {
			className: "border-b-2",
			children: /* @__PURE__ */ jsx(Link, {
				from: "/$lang",
				to: "./account/profiles/$id/ratings",
				params: { id: profile.id + "" },
				className: "p-4 hover:bg-accent/50 block",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center ",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-lg font-bold grow",
						children: "Ratings"
					}), /* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "size-6 pl-2" })]
				})
			})
		})] })
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-4",
		children: /* @__PURE__ */ jsx(ProfileDeleteDialog, { profileId: profile.id })
	})] });
}
//#endregion
//#region src/routes/$lang/account/profiles/$id/index.tsx?tsr-split=component
function Page() {
	const { profile, error } = Route.useLoaderData();
	if (error) return /* @__PURE__ */ jsx("div", { children: error.message });
	if (!profile) return /* @__PURE__ */ jsx("div", { children: "No profile found" });
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-8 mb-8 font-bold",
		children: [/* @__PURE__ */ jsx(Link, {
			from: "/$lang",
			to: "/$lang/account/profiles",
			children: /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "size-6" })
		}), /* @__PURE__ */ jsx("h1", {
			className: "text-2xl",
			children: `Settings for ${profile.name}`
		})]
	}), /* @__PURE__ */ jsx(ProfileSettings, { profile })] });
}
//#endregion
export { Page as component };
