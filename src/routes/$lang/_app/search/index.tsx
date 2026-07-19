import { createFileRoute } from "@tanstack/react-router";
import {
  getActorDetails,
  searchMedia,
  searchPeople,
} from "~/lib/tmdb/requests";
import ActorCredits from "~/components/search/actor-credits";
import SearchResults from "~/components/search/search-results";

export const Route = createFileRoute("/$lang/_app/search/")({
  component: Page,

  validateSearch: (
    search: Record<string, unknown>,
  ): { person?: string; q?: string } => {
    // validate and parse the search params into a typed state
    return {
      person: typeof search.person === "string" ? search.person : undefined,
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  loaderDeps: ({ search: { person, q } }) => ({ person, q }),
  loader: async ({ context, deps }) => {
    let people;
    let actorDetails;
    const { q, person } = deps;
    if (q != undefined) {
      people = searchPeople(q);

      await context.queryClient.ensureInfiniteQueryData({
        queryKey: ["searchMedia", q],
        staleTime: 1000 * 60 * 60,
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => searchMedia(q, pageParam, context.lang),
      });
    }
    if (person != undefined) {
      actorDetails = getActorDetails(person);
    }
    return { people, actorDetails };
  },
});

function Page() {
  const { q } = Route.useSearch();
  const { actorDetails } = Route.useLoaderData();

  return (
    <div className="pt-16 lg:pt-32  relative mx-4 lg:mx-8">
      {actorDetails ? (
        <ActorCredits actorDetails={actorDetails} />
      ) : (
        q && <SearchResults search={q} key={q} />
      )}
    </div>
  );
}
