import { Await } from "@tanstack/react-router";
import SearchCollection from "./search-collection";
import type { PersonCombinedCredits, PersonDetails } from "~/lib/tmdb/types";

interface Props {
  actorDetails: Promise<
    PersonDetails & {
      combined_credits: Omit<PersonCombinedCredits, "id">;
    }
  >;
}

export default function ActorCredits({ actorDetails }: Props) {
  return (
    <Await promise={actorDetails} fallback={<div>Loading...</div>}>
      {(actorDetailsResult) => (
        <>
          <div className="text-3xl text-neutral-50 py-4">
            {`Movies/Shows with ${actorDetailsResult.name}`}
          </div>
          <SearchCollection
            collection={actorDetailsResult.combined_credits.cast}
          />{" "}
        </>
      )}
    </Await>
  );
}
