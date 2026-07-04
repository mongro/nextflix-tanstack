import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { n as getRatings$1, t as getRating$1 } from "./rating-BVJjJWZ1.js";
import { t as verifyProfileAccess } from "./utils-MLp0iKnl.js";
//#region src/lib/dal/ratings/queries.ts?tss-serverfn-split
var getRating_createServerFn_handler = createServerRpc({
	id: "025481635efa9ab7f4a35e8ff5cd0721c6a4b4e310d9303839f352e0f218c35d",
	name: "getRating",
	filename: "src/lib/dal/ratings/queries.ts"
}, (opts) => getRating.__executeServer(opts));
var getRating = createServerFn({ method: "GET" }).validator((data) => data).handler(getRating_createServerFn_handler, async ({ data }) => {
	return await getRating$1(data.profileId, data.externalMovieId);
});
var getRatings_createServerFn_handler = createServerRpc({
	id: "f52c3f80df2d1e20bc056500cca0337293f201d6bb1bc27b2341d18baa3747bb",
	name: "getRatings",
	filename: "src/lib/dal/ratings/queries.ts"
}, (opts) => getRatings.__executeServer(opts));
var getRatings = createServerFn({ method: "GET" }).validator((data) => data).handler(getRatings_createServerFn_handler, async ({ data }) => {
	await verifyProfileAccess(data.profileId);
	return await getRatings$1(data.profileId, data.take, data.cursor);
});
//#endregion
export { getRating_createServerFn_handler, getRatings_createServerFn_handler };
