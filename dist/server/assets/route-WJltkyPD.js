import { l as setCookie, n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { t as getDictionary } from "./getDictionary-CmVtiGPB.js";
//#region src/routes/$lang/route.tsx?tss-serverfn-split
var getDictionaryFn_createServerFn_handler = createServerRpc({
	id: "1a2510af2021dc660972b48a80d6a6d86d762ced0680e14b06250b70e97b4f26",
	name: "getDictionaryFn",
	filename: "src/routes/$lang/route.tsx"
}, (opts) => getDictionaryFn.__executeServer(opts));
var getDictionaryFn = createServerFn().validator((data) => data).handler(getDictionaryFn_createServerFn_handler, async ({ data }) => {
	return await getDictionary(data.lang);
});
var setLocaleCookie_createServerFn_handler = createServerRpc({
	id: "179551a2f45128fc38538abc66dd147022422a3c47a3533776db4da4093ded94",
	name: "setLocaleCookie",
	filename: "src/routes/$lang/route.tsx"
}, (opts) => setLocaleCookie.__executeServer(opts));
var setLocaleCookie = createServerFn({ method: "POST" }).validator((locale) => locale).handler(setLocaleCookie_createServerFn_handler, async ({ data: locale }) => {
	setCookie("locale", locale, {
		path: "/",
		maxAge: 3600 * 24 * 365,
		httpOnly: true,
		secure: true
	});
});
//#endregion
export { getDictionaryFn_createServerFn_handler, setLocaleCookie_createServerFn_handler };
