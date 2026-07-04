import { n as createServerFn, u as setResponseHeaders } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { n as getByGenre, o as getNowPlaying, s as getPopular } from "./requests-CzB6V0XQ.js";
//#region src/routes/$lang/_app/movies/index.tsx?tss-serverfn-split
var getMoviesData_createServerFn_handler = createServerRpc({
	id: "76f1f82fde3940e4fa92b2c30fd883b46e5a20b04caa2876fb8d7f24a53e522c",
	name: "getMoviesData",
	filename: "src/routes/$lang/_app/movies/index.tsx"
}, (opts) => getMoviesData.__executeServer(opts));
var getMoviesData = createServerFn().validator((data) => data).handler(getMoviesData_createServerFn_handler, async ({ data }) => {
	const promoted = await getNowPlaying(data.lang);
	const popular = getPopular("movie", data.lang);
	console.log("Loader data for movies route:", {
		promoted,
		popular
	});
	setResponseHeaders(new Headers({
		"Cache-Control": "private, max-age=3600",
		"CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600"
	}));
	const collectionByGenrePromises = [
		"27",
		"28",
		"12",
		"14",
		"878",
		"16",
		"80",
		"35"
	].map((genre) => getByGenre(genre, "movie", data.lang));
	return {
		promoted,
		popular,
		collectionByGenre: await Promise.all(collectionByGenrePromises)
	};
});
//#endregion
export { getMoviesData_createServerFn_handler };
