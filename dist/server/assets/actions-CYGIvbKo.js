import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { a as getUserProfile } from "./profile-Bq22T2rH.js";
import { r as verifiyServerSession, t as canChangeProfile } from "./authorization-t_Wox40S.js";
import { r as removeFromMyList$1, t as addToMyList$1 } from "./my-list-soyJvznU.js";
import { ZodError, z as z$1 } from "zod";
//#region src/lib/response.ts
function formatActionErrorResponse(message) {
	return {
		message,
		success: false,
		data: null
	};
}
//#endregion
//#region src/lib/error-handler.ts
function actionErrorHandler(error) {
	if (error instanceof ZodError) return formatActionErrorResponse(z$1.prettifyError(error));
	else if (error instanceof Error) return formatActionErrorResponse(error.message);
	else return formatActionErrorResponse("An unknown error occurred");
}
//#endregion
//#region src/lib/dal/my-list/actions.ts?tss-serverfn-split
var addToMyList_createServerFn_handler = createServerRpc({
	id: "bded4211cbfb8d008a114478bef100084c941c371b7f6c4a33667c0a9d2d841b",
	name: "addToMyList",
	filename: "src/lib/dal/my-list/actions.ts"
}, (opts) => addToMyList.__executeServer(opts));
var addToMyList = createServerFn({ method: "POST" }).validator((data) => data).handler(addToMyList_createServerFn_handler, async ({ data }) => {
	const { profileId, movieId } = data;
	try {
		const session = await verifiyServerSession();
		const profile = await getUserProfile(profileId);
		if (profile && !canChangeProfile(session.user, profile)) throw new Error("Unauthorized");
		return {
			data: await addToMyList$1(profileId, movieId),
			success: true,
			message: "Operation completed successfully"
		};
	} catch (error) {
		return actionErrorHandler(error);
	}
});
var removeFromMyList_createServerFn_handler = createServerRpc({
	id: "d11b63b390af6aa131d0765ee0fbd3e555b684729ed0592ea03617b91c0d6925",
	name: "removeFromMyList",
	filename: "src/lib/dal/my-list/actions.ts"
}, (opts) => removeFromMyList.__executeServer(opts));
var removeFromMyList = createServerFn({ method: "POST" }).validator((data) => data).handler(removeFromMyList_createServerFn_handler, async ({ data }) => {
	const { profileId, movieId } = data;
	try {
		const session = await verifiyServerSession();
		const profile = await getUserProfile(profileId);
		if (profile && !canChangeProfile(session.user, profile)) throw new Error("Unauthorized");
		return {
			data: await removeFromMyList$1(profileId, movieId),
			success: true,
			message: "Operation completed successfully"
		};
	} catch (error) {
		return actionErrorHandler(error);
	}
});
//#endregion
export { addToMyList_createServerFn_handler, removeFromMyList_createServerFn_handler };
