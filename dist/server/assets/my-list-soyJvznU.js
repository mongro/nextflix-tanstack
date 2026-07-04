import { t as prisma } from "./prisma-Bqm5mpCo.js";
import { t as findOrCreateMovie } from "./movie-pYlDTK_U.js";
//#region src/lib/db/my-list.ts
async function addToMyList(profileId, movieId) {
	const movie = await findOrCreateMovie(movieId);
	return await prisma.profileMovie.create({ data: {
		profileId,
		movieId: movie.externalId
	} });
}
async function isInMyList(profileId, movieId) {
	return await prisma.profileMovie.findUnique({ where: { profileId_movieId: {
		profileId,
		movieId
	} } }) !== null;
}
async function removeFromMyList(profileId, movieId) {
	return await prisma.profileMovie.delete({ where: { profileId_movieId: {
		profileId,
		movieId
	} } });
}
//#endregion
export { isInMyList as n, removeFromMyList as r, addToMyList as t };
