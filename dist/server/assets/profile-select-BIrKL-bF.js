import { r as getAllProfilesOfUser } from "./profile-DWMdx_pb.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/account/profile-select/index.tsx
var $$splitComponentImporter = () => import("./profile-select-D699Yujc.js");
var Route = createFileRoute("/$lang/account/profile-select/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return await getAllProfilesOfUser();
	}
});
//#endregion
export { Route as t };
