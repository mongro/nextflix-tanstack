import { createFileRoute, getRouteApi, redirect } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getSessionCookie } from "better-auth/cookies";
import MyList from "./my-list";
import { getMyList } from "~/lib/dal/my-list/queries";
import { parseInternalId } from "~/lib/tmdb/util";
import { getModalInfos } from "~/lib/tmdb/requests";
import { Spinner } from "~/components/ui/spinner";
import { hasFreshUnauthenticatedSession } from "~/lib/auth/auth-client";

const hasSessionCookie = createIsomorphicFn()
  .server(() => Boolean(getSessionCookie(getRequestHeaders())))
  .client(() => true);

export const Route = createFileRoute("/$lang/_app/my-list/")({
  pendingMs: 0,
  pendingMinMs: 0,
  pendingComponent: () => (
    <div className="mt-16 grid min-h-48 place-items-center">
      <Spinner className="size-6" />
    </div>
  ),
  component: Page,
  headers: () => ({
    "Cache-Control": "private, no-store",
  }),
  staleTime: 0,
  beforeLoad: ({ context }) => {
    if (
      !hasSessionCookie() ||
      hasFreshUnauthenticatedSession(context.queryClient)
    ) {
      throw redirect({
        to: "/$lang/auth/login",
        params: { lang: context.lang },
      });
    }

    return;
  },
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
