import { n as getByGenre, o as getNowPlaying, s as getPopular } from "./requests-CzB6V0XQ.js";
import { n as isValidModalId } from "./modal-provider-DZYyqRsW.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/_app/index.tsx
var $$splitComponentImporter = () => import("./_app-DcHnV9VS.js");
var Route = createFileRoute("/$lang/_app/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => {
		return { id: typeof search.id === "string" && isValidModalId(search.id) ? search.id : void 0 };
	},
	loader: async ({ params, context }) => {
		const promoted = await getNowPlaying(context.lang);
		const popular = getPopular("movie", context.lang);
		console.log("Loader data for movies route:", {
			promoted,
			popular
		});
		const collectionByGenrePromises = [
			"27",
			"28",
			"12",
			"14",
			"878",
			"16",
			"80",
			"35"
		].map((genre) => getByGenre(genre, "movie", context.lang));
		return {
			promoted,
			popular,
			collectionByGenre: await Promise.all(collectionByGenrePromises)
		};
	}
});
//#endregion
export { Route as t };
