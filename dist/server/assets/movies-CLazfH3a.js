import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
import { n as isValidModalId } from "./modal-provider-DZYyqRsW.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/_app/movies/index.tsx
var $$splitComponentImporter = () => import("./movies-BysDczKb.js");
var getMoviesData = createServerFn().validator((data) => data).handler(createSsrRpc("76f1f82fde3940e4fa92b2c30fd883b46e5a20b04caa2876fb8d7f24a53e522c"));
var Route = createFileRoute("/$lang/_app/movies/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	headers: () => ({ "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800" }),
	staleTime: 1 * 6e4,
	validateSearch: (search) => {
		return { id: typeof search.id === "string" && isValidModalId(search.id) ? search.id : void 0 };
	},
	loader: async ({ params, context }) => {
		return await getMoviesData({ data: { lang: context.lang } });
	}
});
//#endregion
export { Route as t };
