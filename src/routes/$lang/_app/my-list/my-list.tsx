import { AnimatePresence, m } from "motion/react";
import type { MovieDetails, ShowDetails } from "~/lib/tmdb/types";
import { Movie, Show } from "~/lib/tmdb/types";
import MovieThumbnail from "~/components/collection/movie-thumbnail";

export default function Page({
  myList,
}: {
  myList: Array<MovieDetails | ShowDetails>;
}) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      <AnimatePresence>
        {myList.map((media) => (
          <m.div exit={{ opacity: 0 }} layout="position" key={media.id}>
            <MovieThumbnail
              collection="myList"
              media={media}
              key={media.id}
              options={{ closeOnMyListRemove: true }}
            />
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
