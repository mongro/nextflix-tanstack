import { d as searchMedia, u as isShowOrMovie } from "./requests-CzB6V0XQ.js";
import { t as Button } from "./button-B_qHKP16.js";
import { t as Route } from "./search-WNu7ADbE.js";
import { t as MovieThumbnail } from "./movie-thumbnail-CRyidt6W.js";
import { Suspense } from "react";
import { Await, Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useInfiniteQuery } from "@tanstack/react-query";
//#region src/components/search/search-collection.tsx
function SearchCollection({ collection }) {
	return /* @__PURE__ */ jsx("div", {
		className: " grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-16",
		children: collection.map((media) => isShowOrMovie(media) && /* @__PURE__ */ jsx(MovieThumbnail, {
			media,
			collection: "search"
		}, media.id))
	});
}
//#endregion
//#region src/components/search/actor-credits.tsx
function ActorCredits({ actorDetails }) {
	return /* @__PURE__ */ jsx(Await, {
		promise: actorDetails,
		fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }),
		children: (actorDetailsResult) => /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsx("div", {
				className: "text-3xl text-neutral-50 py-4",
				children: `Movies/Shows with ${actorDetailsResult.name}`
			}),
			/* @__PURE__ */ jsx(SearchCollection, { collection: actorDetailsResult.combined_credits.cast }),
			" "
		] })
	});
}
//#endregion
//#region src/components/search/people-search-display.tsx
function PeopleSearchDisplay() {
	const { people } = Route.useLoaderData();
	if (!people) return /* @__PURE__ */ jsx("div", {});
	return /* @__PURE__ */ jsx(Await, {
		promise: people,
		fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }),
		children: (people) => /* @__PURE__ */ jsxs("div", {
			className: "mt-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-2xl text-neutral-50 mb-2",
				children: ["Explore movies/shows of actors:", " "]
			}), /* @__PURE__ */ jsx("div", {
				className: "mb-4",
				children: /* @__PURE__ */ jsx("ul", {
					className: "flex flex-wrap  text-xl ",
					children: people.results.map((person) => /* @__PURE__ */ jsx("li", {
						className: "px-2  text-neutral-50",
						children: /* @__PURE__ */ jsx(Link, {
							to: `/$lang/search`,
							params: { lang: Route.useParams().lang },
							search: { person: person.id + "" },
							preload: false,
							children: person.name
						})
					}, person.id))
				})
			})]
		})
	});
}
//#endregion
//#region src/components/search/movie-search-display.tsx
function SearchGallery({ search }) {
	const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ["searchMedia", search],
		queryFn: ({ pageParam = 1 }) => searchMedia(search || "", pageParam),
		staleTime: 1e3 * 60 * 60,
		refetchOnWindowFocus: false,
		enabled: !!search,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : void 0
	});
	const moviesOrShows = data?.pages.reduce((prev, curr) => {
		const moviesOrShows = curr.results.filter(isShowOrMovie);
		return [...prev, ...moviesOrShows];
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: " grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-16",
		children: moviesOrShows && moviesOrShows.map((media) => isShowOrMovie(media) && /* @__PURE__ */ jsx(MovieThumbnail, {
			media,
			collection: "search"
		}, media.id))
	}), hasNextPage && /* @__PURE__ */ jsx("div", {
		className: "mt-8",
		children: /* @__PURE__ */ jsx(Button, {
			onClick: (e) => fetchNextPage(),
			children: "More Results"
		})
	})] });
}
//#endregion
//#region src/components/search/search-results.tsx
function SearchResults({ search }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(PeopleSearchDisplay, { search }) }), /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(SearchGallery, { search }) })] });
}
//#endregion
//#region src/routes/$lang/_app/search/index.tsx?tsr-split=component
function Page() {
	const { q } = Route.useSearch();
	const { actorDetails } = Route.useLoaderData();
	return /* @__PURE__ */ jsx("div", {
		className: "pt-16 lg:pt-32  relative mx-4 lg:mx-8",
		children: actorDetails ? /* @__PURE__ */ jsx(ActorCredits, { actorDetails }) : q && /* @__PURE__ */ jsx(SearchResults, { search: q }, q)
	});
}
//#endregion
export { Page as component };
