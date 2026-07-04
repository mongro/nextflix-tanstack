import { t as prisma } from "./prisma-Bqm5mpCo.js";
//#region src/lib/db/profile.ts
async function getAllProfilesOfUser(userId) {
	return await prisma.profile.findMany({ where: { userId } });
}
async function updateProfile(profileId, name, avatar) {
	return await prisma.profile.update({
		where: { id: profileId },
		data: {
			name,
			avatar
		}
	});
}
async function createProfile(userId, name, avatar) {
	return await prisma.profile.create({ data: {
		name,
		userId,
		avatar
	} });
}
async function deleteProfile(id) {
	return await prisma.profile.delete({ where: { id } });
}
async function getUserProfile(id) {
	console.log("get");
	return await prisma.profile.findUnique({ where: { id } });
}
async function changeSelectedProfile(sessionId, id) {
	await prisma.session.update({
		where: { id: sessionId },
		data: { selectedProfileId: id }
	});
}
//#endregion
export { getUserProfile as a, getAllProfilesOfUser as i, createProfile as n, updateProfile as o, deleteProfile as r, changeSelectedProfile as t };
