import { t as Button } from "./button-B_qHKP16.js";
import { a as selectProfile } from "./profile-DWMdx_pb.js";
import { t as Route } from "./profile-select-BIrKL-bF.js";
import { t as Avatar } from "./avatar-BtgSey3w.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation } from "@tanstack/react-query";
//#region src/components/profile/profile-select.tsx
function ProfileSelect({ profiles }) {
	const navigate = useNavigate();
	const { data, mutate, isPending } = useMutation({
		mutationFn: selectProfile,
		onSuccess: async (data, variables, onMutateResult, context) => {
			console.log("success", data.success);
			await context.client.refetchQueries({ queryKey: ["session"] });
			navigate({ to: "/" });
		}
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 ",
		children: /* @__PURE__ */ jsxs("div", {
			className: "items-center justify-center flex flex-col inset-0 absolute gap-4",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl my-4",
					children: "Who is watching?"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-5 gap-4  max-w-2xl w-full",
					children: profiles.map((profile) => {
						return /* @__PURE__ */ jsxs("div", {
							role: "button",
							className: "text-center group",
							"aria-label": "selectProfile",
							onClick: () => mutate({ data: { id: profile.id } }),
							children: [/* @__PURE__ */ jsx("div", {
								className: "aspect-square  border-4 border-transparent group-hover:border-foreground",
								children: /* @__PURE__ */ jsx(Avatar, {
									src: profile.avatar,
									alt: "avatar",
									width: 512,
									height: 512,
									sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "text-center text-muted-foreground group-hover:text-foreground",
								children: profile.name
							})]
						}, profile.id);
					})
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "link",
					size: "lg",
					onClick: () => navigate({
						to: "/$lang/account/profiles",
						from: "/$lang"
					}),
					children: "Manage Profiles"
				})
			]
		})
	});
}
//#endregion
//#region src/routes/$lang/account/profile-select/index.tsx?tsr-split=component
function Page() {
	return /* @__PURE__ */ jsx("div", {
		className: "",
		children: /* @__PURE__ */ jsx(ProfileSelect, { profiles: Route.useLoaderData() })
	});
}
//#endregion
export { Page as component };
