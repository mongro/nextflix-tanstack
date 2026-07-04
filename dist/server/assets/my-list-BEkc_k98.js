import { t as Route } from "./my-list-vlvuWj-M.js";
import { t as MovieThumbnail } from "./movie-thumbnail-CRyidt6W.js";
import { getRouteApi } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, m } from "framer-motion";
//#region src/routes/$lang/_app/my-list/my-list.tsx
function Page$1({ myList }) {
	return /* @__PURE__ */ jsx("div", {
		className: "grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
		children: /* @__PURE__ */ jsx(AnimatePresence, { children: myList.map((media) => /* @__PURE__ */ jsx(m.div, {
			exit: { opacity: 0 },
			layout: "position",
			children: /* @__PURE__ */ jsx(MovieThumbnail, {
				collection: "myList",
				media,
				options: { closeOnMyListRemove: true }
			}, media.id)
		}, media.id)) })
	});
}
//#endregion
//#region src/routes/$lang/_app/my-list/index.tsx?tsr-split=component
function Page() {
	const dictionary = getRouteApi("/$lang").useLoaderData();
	const { myList } = Route.useLoaderData();
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-16 relative mx-4 lg:mx-8",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "font-extrabold text-xl lg:text-3xl text-neutral-200",
			children: dictionary.header.mylist
		}), /* @__PURE__ */ jsx(Page$1, { myList })]
	});
}
//#endregion
export { Page as component };
