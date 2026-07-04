import { n as cn } from "./button-B_qHKP16.js";
import * as React$1 from "react";
import { isRedirect, useRouter } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region node_modules/.pnpm/@tanstack+react-start@1.168_49ec5e4cd2c5886a5410dc7d6c072d34/node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React$1.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region src/components/ui/card.tsx
function Card({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-4 shadow-sm", className),
		...props
	});
}
//#endregion
export { useServerFn as n, Card as t };
