import { ExternalMovie } from "../generated/prisma/client";
import prisma from "../prisma";
import { getMediaTitle, getModalInfos } from "../tmdb/requests";
import { parseInternalId } from "../tmdb/util";

export async function findOrCreateMovie(id: ExternalMovie["externalId"]) {
  //Find or create movie entry
  const { type, tmdbId } = parseInternalId(id);
  const externalMovie = await getModalInfos(tmdbId, type, "en");
  const movie = await prisma.externalMovie.upsert({
    where: { externalId: id },
    update: {},
    create: {
      externalId: id,
      title: getMediaTitle(externalMovie),
    },
  });

  return movie;
}
