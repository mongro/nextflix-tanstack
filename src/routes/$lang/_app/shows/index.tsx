import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useDictionary } from "~/components/provider/dictionary-provider";
import { MovieGenreKey, TVGenreKey } from "~/i18n/type";
import { getByGenre, getNowPlaying, getPopular } from "~/lib/tmdb/requests";
import Promoted from "~/components/promoted";
import CarouselSkeleton from "~/components/collection/collection-skeleton";
import Collection, {
  CollectionStreamed,
} from "~/components/collection/collection";
import { isValidModalId, modalId } from "~/components/provider/modal-provider";

export const Route = createFileRoute("/$lang/_app/shows/")({
  component: RouteComponent,
  staleTime: 5 * 60_000, // 1 hour client-side
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
    const popular = getPopular("tv", context.lang);

    // Force the data to take 2 seconds
    await new Promise((r) => setTimeout(r, 4000));
    
    const genreList: TVGenreKey[] = [
      "10763",
      "10766",
      "99",
      "80",
      "18",
      "16",
      "35",
    ];

    const collectionByGenrePromises = genreList.map((genre) =>
      getByGenre(genre, "tv", context.lang),
    );

    const collectionByGenre = await Promise.all(collectionByGenrePromises);

    return {
      promoted,
      popular,
      collectionByGenre,
    };
  };,
});

function RouteComponent() {
  const { promoted, popular, collectionByGenre } = Route.useLoaderData();

  const dictionary = useDictionary().dictionary;
  const { genres } = dictionary;

  const genreList: TVGenreKey[] = [
    "10763",
    "10766",
    "99",
    "80",
    "18",
    "16",
    "35",
  ];

  return (
    <div>
      <Promoted promise={promoted} dictionary={dictionary.buttons} />
      <Suspense fallback={<CarouselSkeleton />}>
        <CollectionStreamed
          collection={popular}
          title={dictionary.header.popularShows}
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
