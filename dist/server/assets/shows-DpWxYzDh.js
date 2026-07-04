import { n as getByGenre, o as getNowPlaying, s as getPopular } from "./requests-CzB6V0XQ.js";
import { n as isValidModalId } from "./modal-provider-DZYyqRsW.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/_app/shows/index.tsx
var $$splitComponentImporter = () => import("./shows-Dkz1QQxa.js");
var Route = createFileRoute("/$lang/_app/shows/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	headers: () => ({ "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800" }),
	staleTime: 60 * 6e4,
	validateSearch: (search) => {
		return { id: typeof search.id === "string" && isValidModalId(search.id) ? search.id : void 0 };
	},
	loader: async ({ params, context }) => {
		const promoted = await getNowPlaying(context.lang);
		const popular = getPopular("tv", context.lang);
		const collectionByGenrePromises = [
			"10763",
			"10766",
			"99",
			"80",
			"18",
			"16",
			"35"
		].map((genre) => getByGenre(genre, "tv", context.lang));
		return {
			promoted,
			popular,
			collectionByGenre: await Promise.all(collectionByGenrePromises)
		};
	}
});
//#endregion
export { Route as t };
