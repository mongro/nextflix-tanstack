import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { i as removeRating$1, r as giveRating$1 } from "./rating-BVJjJWZ1.js";
import { t as verifyProfileAccess } from "./utils-MLp0iKnl.js";
//#region src/lib/dal/ratings/actions.ts?tss-serverfn-split
var removeRating_createServerFn_handler = createServerRpc({
	id: "ed985b1c3092c243c7ddfc46d395db8b7cf639f9bead261e7e7f10f0155eb0de",
	name: "removeRating",
	filename: "src/lib/dal/ratings/actions.ts"
}, (opts) => removeRating.__executeServer(opts));
var removeRating = createServerFn({ method: "POST" }).validator((data) => data).handler(removeRating_createServerFn_handler, async ({ data }) => {
	try {
		await verifyProfileAccess(data.profileId);
		return await removeRating$1(data.profileId, data.movieId);
	} catch (error) {
		console.log("error", error);
		return {
			error: { message: "Couldnt remove rating." },
			success: false
		};
	}
});
var giveRating_createServerFn_handler = createServerRpc({
	id: "d57a3d9c09b32f47cf7f004d82e31e7a25b6ba2d0669bed754bc1878f4e2c64c",
	name: "giveRating",
	filename: "src/lib/dal/ratings/actions.ts"
}, (opts) => giveRating.__executeServer(opts));
var giveRating = createServerFn({ method: "POST" }).validator((data) => data).handler(giveRating_createServerFn_handler, async ({ data }) => {
	try {
		await verifyProfileAccess(data.profileId);
		return await giveRating$1(data.profileId, data.movieId, data.rating);
	} catch (error) {
		console.log("error", error);
		return {
			error: { message: "Couldnt give rating." },
			success: false
		};
	}
});
//#endregion
export { giveRating_createServerFn_handler, removeRating_createServerFn_handler };
