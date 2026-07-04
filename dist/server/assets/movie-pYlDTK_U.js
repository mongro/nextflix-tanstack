import { t as prisma } from "./prisma-Bqm5mpCo.js";
import { a as getModalInfos, r as getMediaTitle } from "./requests-CzB6V0XQ.js";
import { n as parseInternalId } from "./util-BIJ_9b2T.js";
//#region src/lib/db/movie.ts
async function findOrCreateMovie(id) {
	const { type, tmdbId } = parseInternalId(id);
	const externalMovie = await getModalInfos(tmdbId, type, "en");
	return await prisma.externalMovie.upsert({
		where: { externalId: id },
		update: {},
		create: {
			externalId: id,
			title: getMediaTitle(externalMovie)
		}
	});
}
//#endregion
export { findOrCreateMovie as t };
