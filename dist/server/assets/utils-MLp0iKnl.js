import { a as getUserProfile } from "./profile-Bq22T2rH.js";
import { r as verifiyServerSession, t as canChangeProfile } from "./authorization-t_Wox40S.js";
//#region src/lib/dal/utils.ts
async function verifyProfileAccess(profileId) {
	const [session, profile] = await Promise.all([verifiyServerSession(), getUserProfile(profileId)]);
	if (!profile) throw new Error("Profile doesnt exist");
	if (!canChangeProfile(session.user, profile)) throw new Error("Unauthorized");
	return {
		session,
		profile
	};
}
//#endregion
export { verifyProfileAccess as t };
