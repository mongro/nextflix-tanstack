import { i as getProfile } from "./profile-DWMdx_pb.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/account/profiles/$id/index.tsx
var $$splitComponentImporter = () => import("./_id-y0fj8JRO.js");
var Route = createFileRoute("/$lang/account/profiles/$id/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ params }) => {
		return await getProfile({ data: { id: Number(params.id) } });
	}
});
//#endregion
export { Route as t };
