import { s as getRatings } from "./rating-6U8660zY.js";
import { i as getProfile } from "./profile-DWMdx_pb.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/account/profiles/$id/ratings/index.tsx
var $$splitComponentImporter = () => import("./ratings-CKrot-XV.js");
var Route = createFileRoute("/$lang/account/profiles/$id/ratings/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ context, params }) => {
		const id = params.id;
		context.queryClient.prefetchInfiniteQuery({
			queryKey: ["ratings", Number(id)],
			queryFn: ({ pageParam }) => {
				return getRatings({ data: {
					profileId: Number(id),
					take: 10,
					cursor: pageParam
				} });
			},
			initialPageParam: void 0
		});
		return await getProfile({ data: { id: Number(id) } });
	}
});
//#endregion
export { Route as t };
