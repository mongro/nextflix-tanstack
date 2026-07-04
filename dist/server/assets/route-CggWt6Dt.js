import { t as Route } from "./route-BThdu1a2.js";
import { n as useDictionary } from "./dictionary-provider-CBhcFZnw.js";
import { t as AccountActionClient } from "./account-action-client-DspR_CMQ.js";
import { Link, Outlet } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/$lang/account/header.tsx
function Header({ dictionary, lang }) {
	return /* @__PURE__ */ jsx("div", {
		className: "h-16 w-full top-0 left-0 fixed z-40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto px-4 lg:w-10/12 p-2 flex items-center h-full justify-between",
			children: [/* @__PURE__ */ jsx(Link, {
				to: "/",
				children: "Back to Main"
			}), /* @__PURE__ */ jsx(AccountActionClient, { lang })]
		})
	});
}
//#endregion
//#region src/routes/$lang/account/route.tsx?tsr-split=component
function RootLayout() {
	const { lang } = Route.useRouteContext();
	const { dictionary } = useDictionary();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Header, {
		lang,
		dictionary: dictionary.header
	}), /* @__PURE__ */ jsx("div", {
		className: "mx-auto mt-16 w-5/6 max-w-3xl",
		children: /* @__PURE__ */ jsx(Outlet, {})
	})] });
}
//#endregion
export { RootLayout as component };
