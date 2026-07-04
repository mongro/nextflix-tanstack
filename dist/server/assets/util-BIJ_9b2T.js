//#region src/lib/tmdb/util.ts
function createInternalId(tmdbId, type) {
	return `${type}-${tmdbId}`;
}
function parseInternalId(internalId) {
	const [type, id] = internalId.split("-");
	return {
		tmdbId: parseInt(id, 10),
		type
	};
}
//#endregion
export { parseInternalId as n, createInternalId as t };
