import { r as getAllProfilesOfUser } from "./profile-DWMdx_pb.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/$lang/account/profiles/index.tsx
var $$splitComponentImporter = () => import("./profiles-BPuX_jmn.js");
var Route = createFileRoute("/$lang/account/profiles/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return await getAllProfilesOfUser();
	}
});
//#endregion
export { Route as t };
