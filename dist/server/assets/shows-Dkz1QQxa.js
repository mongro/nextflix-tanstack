import { n as useDictionary } from "./dictionary-provider-CBhcFZnw.js";
import { t as Route } from "./shows-DpWxYzDh.js";
import { i as Promoted, n as CollectionStreamed, r as CarouselSkeleton, t as Collection } from "./collection-C2HEdvDN.js";
import { Suspense } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/$lang/_app/shows/index.tsx?tsr-split=component
function RouteComponent() {
	const { promoted, popular, collectionByGenre } = Route.useLoaderData();
	const dictionary = useDictionary().dictionary;
	const { genres } = dictionary;
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Promoted, {
			promise: promoted,
			dictionary: dictionary.buttons
		}),
		/* @__PURE__ */ jsx(Suspense, {
			fallback: /* @__PURE__ */ jsx(CarouselSkeleton, {}),
			children: /* @__PURE__ */ jsx(CollectionStreamed, {
				collection: popular,
				title: dictionary.header.popularShows
			})
		}),
		[
			"10763",
			"10766",
			"99",
			"80",
			"18",
			"16",
			"35"
		].map((genre, i) => /* @__PURE__ */ jsx(Suspense, {
			fallback: /* @__PURE__ */ jsx(CarouselSkeleton, {}),
			children: /* @__PURE__ */ jsx(Collection, {
				collection: collectionByGenre[i],
				title: genres[genre]
			})
		}, genre))
	] });
}
//#endregion
export { RouteComponent as component };
