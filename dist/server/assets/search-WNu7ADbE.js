import { d as searchMedia, f as searchPeople, t as getActorDetails } from "./requests-CzB6V0XQ.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/_app/search/index.tsx
var $$splitComponentImporter = () => import("./search-DGBM1BU0.js");
var Route = createFileRoute("/$lang/_app/search/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => {
		return {
			person: typeof search.person === "string" ? search.person : void 0,
			q: typeof search.q === "string" ? search.q : void 0
		};
	},
	loaderDeps: ({ search: { person, q } }) => ({
		person,
		q
	}),
	loader: async ({ context, deps }) => {
		console.log("Loader called with deps:", deps);
		let people;
		let actorDetails;
		if (deps.q != void 0) {
			people = searchPeople(deps.q);
			await context.queryClient.ensureInfiniteQueryData({
				queryKey: ["searchMedia", deps.q],
				staleTime: 1e3 * 60 * 60,
				initialPageParam: 1,
				queryFn: ({ pageParam = 1 }) => searchMedia(deps.q, pageParam, context.lang)
			});
		}
		if (deps.person != void 0) actorDetails = getActorDetails(deps.person);
		return {
			people,
			actorDetails
		};
	}
});
//#endregion
export { Route as t };
