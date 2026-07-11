import { Await } from "@tanstack/react-router";
import { Items } from "./items";
import type { List, Movie, Show } from "~/lib/tmdb/types";

interface PropsStreamed {
  title: string;
  collection: Promise<List<Show> | List<Movie>>;
}

export function CollectionStreamed({ collection, title }: PropsStreamed) {
  return (
    <Await promise={collection}>
      {({ results }) => (
        <div className="py-6 relative overflow-x-hidden px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-xl lg:text-3xl text-neutral-200">
              {title}
            </h2>
          </div>
          <Items items={results} collection={title} />
        </div>
      )}
    </Await>
  );
}

interface Props {
  title: string;
  collection: List<Show> | List<Movie>;
}

function Collection({ collection, title }: Props) {
  return (
    <div className="py-4 relative overflow-x-hidden px-4 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-extrabold text-xl lg:text-3xl text-neutral-200">
          {title}
        </h2>
      </div>
      <Items items={collection.results} collection={title} />
    </div>
  );
}

export default Collection;
