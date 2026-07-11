import prisma from "../prisma";
import { findOrCreateMovie } from "./movie";
import type { ProfileMovie } from "../generated/prisma/client";

export async function addToMyList(
  profileId: ProfileMovie["profileId"],
  movieId: ProfileMovie["movieId"],
) {
  const movie = await findOrCreateMovie(movieId);

  const result = await prisma.profileMovie.create({
    data: { profileId, movieId: movie.externalId },
  });

  return result;
}

export async function getMyList(profileId: number) {
  const result = await prisma.profileMovie.findMany({
    where: {
      profileId: profileId,
    },
  });
  return result;
}
export async function isInMyList(
  profileId: ProfileMovie["profileId"],
  movieId: ProfileMovie["movieId"],
) {
  const result = await prisma.profileMovie.findUnique({
    where: {
      profileId_movieId: {
        profileId,
        movieId,
      },
    },
  });
  return result !== null;
}

export async function removeFromMyList(
  profileId: ProfileMovie["profileId"],
  movieId: ProfileMovie["movieId"],
) {
  const result = await prisma.profileMovie.delete({
    where: {
      profileId_movieId: {
        profileId,
        movieId,
      },
    },
  });

  return result;
}
