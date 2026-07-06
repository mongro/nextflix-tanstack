import React, { Suspense } from "react";

import PeopleSearchDisplay from "./people-search-display";
import MovieSearchDisplay from "./movie-search-display";

interface Props {
  search: string;
}

function SearchResults({ search }: Props) {
  return (
    <div>
      <Suspense>
        <PeopleSearchDisplay />
      </Suspense>
      <Suspense>
        <MovieSearchDisplay search={search} />
      </Suspense>
    </div>
  );
}

export default SearchResults;
