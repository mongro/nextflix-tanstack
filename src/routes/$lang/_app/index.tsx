import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import type { MovieGenreKey } from "~/i18n/type";
import type { modalId } from "~/components/provider/modal-provider";
import { useDictionary } from "~/components/provider/dictionary-provider";
import { getByGenre, getNowPlaying, getPopular } from "~/lib/tmdb/requests";
import Promoted from "~/components/promoted";
import CarouselSkeleton from "~/components/collection/collection-skeleton";
import Collection, {
  CollectionStreamed,
} from "~/components/collection/collection";
import { isValidModalId } from "~/components/provider/modal-provider";

export const Route = createFileRoute("/$lang/_app/")({
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
    const promoted = await getNowPlaying(context.lang);
    const popular = getPopular("movie", context.lang);
    console.log("Loader data for movies route:", { promoted, popular });

    const genreList: Array<MovieGenreKey> = [
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
      getByGenre(genre, "movie", context.lang),
    );

    const collectionByGenre = await Promise.all(collectionByGenrePromises);

    return {
      promoted,
      popular,
      collectionByGenre,
    };
  },
});

function RouteComponent() {
  const { promoted, popular, collectionByGenre } = Route.useLoaderData();

  const dictionary = useDictionary().dictionary;
  const { genres } = dictionary;

  const genreList: Array<MovieGenreKey> = [
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
