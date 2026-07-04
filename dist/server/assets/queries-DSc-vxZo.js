import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { t as prisma } from "./prisma-Bqm5mpCo.js";
import { n as getServerSession, r as verifiyServerSession } from "./authorization-t_Wox40S.js";
import { n as isInMyList$1 } from "./my-list-soyJvznU.js";
import { t as verifyProfileAccess } from "./utils-MLp0iKnl.js";
//#region src/lib/dal/my-list/queries.ts?tss-serverfn-split
var getMyList_createServerFn_handler = createServerRpc({
	id: "d3cba362987ac1eb8ff163b882829d7a96eb4c73b707dcf83b11afdab2515b35",
	name: "getMyList",
	filename: "src/lib/dal/my-list/queries.ts"
}, (opts) => getMyList.__executeServer(opts));
var getMyList = createServerFn({ method: "GET" }).handler(getMyList_createServerFn_handler, async () => {
	const selectedProfileId = (await verifiyServerSession()).session.selectedProfileId;
	if (!selectedProfileId) return [];
	return await prisma.profileMovie.findMany({ where: { profileId: selectedProfileId } });
});
var getMyListOfProfile_createServerFn_handler = createServerRpc({
	id: "506eea61eb3001c55df0727a555e9eca608d112737ba6859485a827676869f0c",
	name: "getMyListOfProfile",
	filename: "src/lib/dal/my-list/queries.ts"
}, (opts) => getMyListOfProfile.__executeServer(opts));
var getMyListOfProfile = createServerFn({ method: "GET" }).validator((data) => data).handler(getMyListOfProfile_createServerFn_handler, async ({ data }) => {
	const { profileId } = data;
	await verifyProfileAccess(profileId);
	return await prisma.profileMovie.findMany({ where: { profileId } });
});
var isInMyList_createServerFn_handler = createServerRpc({
	id: "2b1c90eed7113b4faf068d499ab0a0523ea5fff6dd0337a06a8d9e0ae60f846c",
	name: "isInMyList",
	filename: "src/lib/dal/my-list/queries.ts"
}, (opts) => isInMyList.__executeServer(opts));
var isInMyList = createServerFn({ method: "GET" }).validator((data) => data).handler(isInMyList_createServerFn_handler, async ({ data }) => {
	const { profileId, movieId } = data;
	if (!await getServerSession()) return false;
	return isInMyList$1(profileId, movieId);
});
//#endregion
export { getMyListOfProfile_createServerFn_handler, getMyList_createServerFn_handler, isInMyList_createServerFn_handler };
