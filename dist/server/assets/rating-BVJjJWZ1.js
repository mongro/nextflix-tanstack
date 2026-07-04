import { t as prisma } from "./prisma-Bqm5mpCo.js";
import { t as findOrCreateMovie } from "./movie-pYlDTK_U.js";
//#region src/lib/db/rating.ts
async function removeRating(profileId, movieId) {
	return await prisma.profileMovieRating.delete({ where: { profileMovieRatingId: {
		profileId,
		movieId
	} } });
}
async function giveRating(profileId, movieId, rating) {
	const movie = await findOrCreateMovie(movieId);
	return await prisma.profileMovieRating.upsert({
		where: { profileMovieRatingId: {
			profileId,
			movieId: movie.externalId
		} },
		update: { rating },
		create: {
			movieId: movie.externalId,
			profileId,
			rating
		}
	});
}
async function getRating(profileId, externalMovieId) {
	return await prisma.profileMovieRating.findUnique({ where: { profileMovieRatingId: {
		profileId,
		movieId: externalMovieId
	} } });
}
async function getRatings(profileId, take = 20, cursor) {
	return await prisma.profileMovieRating.findMany({
		where: { profileId },
		skip: cursor ? 1 : 0,
		take,
		cursor: cursor ? { profileMovieRatingId: {
			movieId: cursor,
			profileId
		} } : void 0,
		orderBy: { ratedAt: "desc" },
		include: { movie: true }
	});
}
//#endregion
export { removeRating as i, getRatings as n, giveRating as r, getRating as t };
