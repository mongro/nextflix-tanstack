import "./getDictionary-CmVtiGPB.js";
import { t as Route } from "./route-DRLEPTyt.js";
import { t as DictionaryProvider } from "./dictionary-provider-CBhcFZnw.js";
import { Outlet } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region src/routes/$lang/route.tsx?tsr-split=component
function RouteComponent() {
	const dictionary = Route.useLoaderData();
	console.log("dictionary", dictionary);
	const { lang } = Route.useRouteContext();
	return /* @__PURE__ */ jsx(DictionaryProvider, {
		dictionary,
		lang,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
export { RouteComponent as component };
