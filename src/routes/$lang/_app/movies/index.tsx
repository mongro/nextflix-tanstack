import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useDictionary } from "~/components/provider/dictionary-provider";
import { MovieGenreKey } from "~/i18n/type";
import { getByGenre, getNowPlaying, getPopular } from "~/lib/tmdb/requests";
import Promoted from "~/components/promoted";
import CarouselSkeleton from "~/components/collection/collection-skeleton";
import Collection, {
  CollectionStreamed,
} from "~/components/collection/collection";
import { isValidModalId, modalId } from "~/components/provider/modal-provider";
import { createServerFn } from "@tanstack/react-start";
import { Locale } from "~/i18n/config";
import {
  setResponseHeaders,
  setResponseStatus,
} from "@tanstack/react-start/server";

const getMoviesData = createServerFn()
  .validator((data: { lang: Locale }) => data)
  .handler(async ({ data }) => {
    // This runs only on the server
    const promoted = await getNowPlaying(data.lang);
    const popular = getPopular("movie", data.lang);
    console.log("Loader data for movies route:", { promoted, popular });
    setResponseHeaders(
      new Headers({
        // 'public' is correct ONLY when the response does not depend on identity.
        // For anything tied to a session/user/tenant, see the authenticated example below.
        "Cache-Control": "private, max-age=3600",
        "CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600",
      }),
    );

    const genreList: MovieGenreKey[] = [
      "27",
      "28",
      "12",
      "14",
      "878",
      "16",
      "80",
      "35",
    ];

    const collectionByGenrePromises = genreList.map((genre) =>
      getByGenre(genre, "movie", data.lang),
    );

    const collectionByGenre = await Promise.all(collectionByGenrePromises);

    return {
      promoted,
      popular,
      collectionByGenre,
    };
  });

export const Route = createFileRoute("/$lang/_app/movies/")({
  component: RouteComponent,
  staleTime: 5 * 60_000,

  validateSearch: (search: Record<string, unknown>): { id?: modalId } => {
    // validate and parse the search params into a typed state
    return {
      id:
        typeof search.id === "string" && isValidModalId(search.id)
          ? search.id
          : undefined,
    };
  },
  loader: async ({ params, context }) => {
    const moviesData = await getMoviesData({ data: { lang: context.lang } });
    return moviesData;
  },
});

function RouteComponent() {
  const { promoted, popular, collectionByGenre } = Route.useLoaderData();

  const dictionary = useDictionary().dictionary;
  const { genres } = dictionary;

  const genreList: MovieGenreKey[] = [
    "27",
    "28",
    "12",
    "14",
    "878",
    "16",
    "80",
    "35",
  ];

  return (
    <div>
      <Promoted promise={promoted} dictionary={dictionary.buttons} />
      <Suspense fallback={<CarouselSkeleton />}>
        <CollectionStreamed
          collection={popular}
          title={dictionary.header.popularMovies}
        />
      </Suspense>
      {genreList.map((genre, i) => (
        <Suspense fallback={<CarouselSkeleton />} key={genre}>
          <Collection collection={collectionByGenre[i]} title={genres[genre]} />
        </Suspense>
      ))}
    </div>
  );
}
