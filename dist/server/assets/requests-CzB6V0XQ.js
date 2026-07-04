//#region src/lib/tmdb/config.ts
var BASE_URL = "https://api.themoviedb.org/3/";
var API_KEY = process.env.API_KEY;
var api = async ({ path, queryParams, cache = "force-cache" }) => {
	try {
		const response = await fetch(`${BASE_URL}${path}?api_key=${API_KEY}&${queryParams ? queryParams.join("&") : ""}`, { cache });
		if (!response.ok) {
			if (response.status === 404) throw new Error();
			const message = `An error has occured: ${response.url}`;
			throw new Error(message);
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};
//#endregion
//#region src/lib/tmdb/requests.ts
var getMediaType = (media) => {
	return "release_date" in media ? "movie" : "tv";
};
var isShowOrMovie = (media) => "release_date" in media || "first_air_date" in media;
var getMediaTitle = (media) => {
	return "title" in media ? media.title : media.name;
};
var getPopular = (type, lang) => api({
	path: `${type}/popular`,
	queryParams: [`language=${lang}`]
});
var getSimilar = (id, type, lang) => api({
	path: `${type}/${id}/similar`,
	queryParams: [`language=${lang}`]
});
var getByGenre = (genre, type, lang) => api({
	path: `discover/${type}`,
	queryParams: [`with_genres=${genre}`, `language=${lang}`]
});
var getNowPlaying = (lang) => api({
	path: "movie/now_playing",
	queryParams: [`language=${lang}`]
});
var getDetails = (id, type, appendQueries, lang) => api({
	path: `${type}/${id}`,
	queryParams: appendQueries ? [
		`append_to_response=${appendQueries.join()}`,
		`include_video_language=en,${lang}`,
		`language=${lang}`
	] : [`include_video_language=en,${lang}`, `language=${lang}`]
});
var getModalInfos = async (id, type, lang) => {
	return {
		...await getDetails(id, type, ["videos", "credits"], lang),
		type
	};
};
var getSeason = async (showId, seasonId, lang) => api({
	path: `tv/${showId}/season/${seasonId}`,
	queryParams: [`language=${lang}`]
});
var searchMedia = async (keyword, pageParam, lang) => api({
	path: `search/multi`,
	queryParams: [
		`query=${keyword}`,
		`page=${pageParam || 1}`,
		`language=${lang}`
	]
});
var searchPeople = async (keyword, pageParam, lang) => api({
	path: `search/person`,
	queryParams: [
		`query=${keyword}`,
		`page=${pageParam || 1}`,
		`language=${lang}`
	]
});
var getActorDetails = async (personId) => api({
	path: `person/${personId}`,
	queryParams: [`append_to_response=combined_credits`]
});
//#endregion
export { getModalInfos as a, getSeason as c, searchMedia as d, searchPeople as f, getMediaType as i, getSimilar as l, getByGenre as n, getNowPlaying as o, getMediaTitle as r, getPopular as s, getActorDetails as t, isShowOrMovie as u };
