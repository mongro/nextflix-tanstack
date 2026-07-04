import { i as getProfile } from "./profile-DWMdx_pb.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/account/profiles/$id/edit/index.tsx
var $$splitComponentImporter = () => import("./edit-BEN4H8vE.js");
var Route = createFileRoute("/$lang/account/profiles/$id/edit/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ context, params }) => {
		return await getProfile({ data: { id: Number(params.id) } });
	}
});
//#endregion
export { Route as t };
