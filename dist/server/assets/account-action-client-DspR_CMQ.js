import { t as Button } from "./button-B_qHKP16.js";
import { n as useDictionary } from "./dictionary-provider-CBhcFZnw.js";
import { a as MenuContent, i as DropdownTrigger, n as useSignOut, o as MenuItem, r as DropdownMenu, s as MenuPortal, t as useSession } from "./auth-client-DjbFPC9N.js";
import { t as Avatar } from "./avatar-BtgSey3w.js";
import { t as Spinner } from "./spinner-OMjEHzBU.js";
import { n as useProfileWithPreload } from "./profile-BpUG0UXV.js";
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/navigation/account-dropdown-menu.tsx
function AccountDropdown({ lang, profile }) {
	const navigate = useNavigate();
	const signout = useSignOut(() => navigate({ to: "/" }));
	const { dictionary } = useDictionary();
	return /* @__PURE__ */ jsxs(DropdownMenu, {
		label: "account",
		children: [/* @__PURE__ */ jsx(DropdownTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, { children: /* @__PURE__ */ jsx(Avatar, {
				alt: "profilePicure",
				className: "size-8",
				src: profile?.avatar,
				width: "512",
				height: "512"
			}) })
		}), /* @__PURE__ */ jsx(MenuPortal, { children: /* @__PURE__ */ jsxs(MenuContent, { children: [
			/* @__PURE__ */ jsx(MenuItem, {
				label: "profiles information",
				onClick: () => navigate({
					to: "./account/profiles",
					from: "/$lang"
				}),
				children: dictionary.buttons.manageProfiles
			}),
			/* @__PURE__ */ jsx(MenuItem, {
				label: "manage profile",
				onClick: () => navigate({
					to: "./account/profile-select",
					from: "/$lang"
				}),
				children: dictionary.buttons.switchProfile
			}),
			/* @__PURE__ */ jsx(MenuItem, {
				label: "Sign Out",
				onClick: () => {
					signout.mutate();
				},
				children: dictionary.buttons.signOut
			})
		] }) })]
	});
}
//#endregion
//#region src/components/navigation/account-action-client.tsx
function AccountActionClient({ lang }) {
	const session = useSession();
	const navigate = useNavigate();
	const selectedProfileId = session.data?.data?.session.selectedProfileId;
	const profileQuery = useProfileWithPreload(selectedProfileId);
	useEffect(() => {
		if (session.data?.data?.user && !selectedProfileId) navigate({
			to: "/$lang/account/profile-select",
			params: ({ lang, ...prev }) => ({
				...prev,
				lang: lang || "en"
			})
		});
	}, [
		selectedProfileId,
		navigate,
		session.data?.data?.user
	]);
	if (session.isPending || profileQuery.isFetching) return /* @__PURE__ */ jsx(Spinner, { className: "size-8" });
	return session?.data?.data?.user ? /* @__PURE__ */ jsx(AccountDropdown, {
		lang,
		profile: profileQuery.data?.profile
	}) : /* @__PURE__ */ jsx(Link, {
		to: `/$lang/auth/login`,
		params: ({ lang }) => ({ lang: lang || "en" }),
		children: "Sign In"
	});
}
//#endregion
export { AccountActionClient as t };
