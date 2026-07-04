import { a as getModalInfos } from "./requests-CzB6V0XQ.js";
import { n as parseInternalId } from "./util-BIJ_9b2T.js";
import { t as getMyList } from "./queries-D8MsY7a9.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/_app/my-list/index.tsx
var $$splitComponentImporter = () => import("./my-list-BEkc_k98.js");
var Route = createFileRoute("/$lang/_app/my-list/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		const myListPromises = (await getMyList()).map((item) => {
			const { tmdbId, type } = parseInternalId(item.movieId);
			return getModalInfos(tmdbId, type);
		});
		return { myList: await Promise.all(myListPromises) };
	}
});
//#endregion
export { Route as t };
