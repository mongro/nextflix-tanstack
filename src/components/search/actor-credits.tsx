import SearchCollection from "./search-collection";
import { PersonCombinedCredits, PersonDetails } from "~/lib/tmdb/types";
import { Await } from "@tanstack/react-router";

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
