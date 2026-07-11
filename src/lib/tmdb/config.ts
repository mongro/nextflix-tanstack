const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.SSR
  ? process.env.API_KEY
  : import.meta.env.VITE_API_KEY;
export const LIFETIME_CACHE_TMDB = 10000;

interface ApiOptions {
  path?: string;
  queryParams?: Array<string>;
  cache?: RequestCache;
}
export const api = async <T>({
  path,
  queryParams,
  cache = "force-cache",
}: ApiOptions) => {
  const response = await fetch(
    `${BASE_URL}${path}?api_key=${API_KEY}&${
      queryParams ? queryParams.join("&") : ""
    }`,
    { cache },
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error();
    }
    const message = `An error has occured: ${response.url}`;
    throw new Error(message);
  }
  const result = (await response.json()) as T;
  return result;
};
