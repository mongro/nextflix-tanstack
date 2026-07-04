import { a as getCookie, n as createServerFn, o as getRequest, s as getRequestHeader } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { redirect } from "@tanstack/react-router";
//#region src/routes/__root.tsx?tss-serverfn-split
var localeRedirect_createServerFn_handler = createServerRpc({
	id: "5b2c0e57e19c88c74b989d8b2a756e6ee3b790348d6da7b961e981bf483e9822",
	name: "localeRedirect",
	filename: "src/routes/__root.tsx"
}, (opts) => localeRedirect.__executeServer(opts));
var localeRedirect = createServerFn().handler(localeRedirect_createServerFn_handler, async () => {
	const request = getRequest();
	new URL(request.url, `http://${request.headers.get("host")}`);
	const localeFromCookie = getCookie("locale");
	const acceptLanguage = getRequestHeader("accept-language");
	throw redirect({
		to: `/$lang`,
		params: { lang: localeFromCookie || acceptLanguage?.split(",")[0].split("-")[0] || "en" }
	});
});
//#endregion
export { localeRedirect_createServerFn_handler };
