import { getModalInfos } from "~/lib/tmdb/requests";
import MyList from "./my-list";
import { parseInternalId } from "~/lib/tmdb/util";
import { getMyList } from "~/lib/dal/my-list/queries";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_app/my-list/")({
  component: Page,
  headers: () => ({
    "Cache-Control":
      "no-store, max-age=0, s-maxage=0, stale-while-revalidate=0",
  }),
  staleTime: 5 * 60_000,
  loader: async () => {
    const myListIds = await getMyList();
    const myListPromises = myListIds.map((item) => {
      const { tmdbId, type } = parseInternalId(item.movieId);
      return getModalInfos(tmdbId, type);
    });

    const myList = await Promise.all(myListPromises);

    return {
      myList,
    };
  },
});

function Page() {
  const dictionary = getRouteApi("/$lang").useLoaderData();
  const { myList } = Route.useLoaderData();

  return (
    <div className="mt-16 relative mx-4 lg:mx-8">
      <h2 className="font-extrabold text-xl lg:text-3xl text-neutral-200">
        {dictionary.header.mylist}
      </h2>
      <MyList myList={myList} />
    </div>
  );
}
