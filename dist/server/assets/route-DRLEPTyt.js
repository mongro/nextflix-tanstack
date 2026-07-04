import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
import { n as isValidLocale } from "./getDictionary-CmVtiGPB.js";
import { createFileRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
//#region src/routes/$lang/route.tsx
var $$splitComponentImporter = () => import("./route-BYv3kZSb.js");
var getDictionaryFn = createServerFn().validator((data) => data).handler(createSsrRpc("1a2510af2021dc660972b48a80d6a6d86d762ced0680e14b06250b70e97b4f26"));
var setLocaleCookie = createServerFn({ method: "POST" }).validator((locale) => locale).handler(createSsrRpc("179551a2f45128fc38538abc66dd147022422a3c47a3533776db4da4093ded94"));
var Route = createFileRoute("/$lang")({
	beforeLoad: async ({ params, preload, location }) => {
		const { lang } = params;
		if (lang && !isValidLocale(lang)) throw redirect({
			to: "/$lang",
			params: { lang: params.lang }
		});
		setLocaleCookie({ data: lang });
		return { lang: lang || "en" };
	},
	loader: async ({ params, context }) => {
		console.log("load dictionary");
		return await getDictionaryFn({ data: { lang: context.lang } });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
