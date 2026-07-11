import { createServerFn } from "@tanstack/react-start";
import { verifyProfileAccess } from "../utils";
import type { ProfileMovieRating } from "~/lib/generated/prisma/client";
import { db } from "~/lib/db";

export const getRating = createServerFn({ method: "GET" })
  .validator(
    (data: {
      profileId: ProfileMovieRating["profileId"];
      externalMovieId: ProfileMovieRating["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    // await verifyProfileAccess(data.profileId);
    const rating = await db.getRating(data.profileId, data.externalMovieId);
    return rating;
  });

export const getRatings = createServerFn({ method: "GET" })
  .validator(
    (data: {
      profileId: ProfileMovieRating["profileId"];
      take: number;
      cursor?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    await verifyProfileAccess(data.profileId);
    const ratings = await db.getRatings(data.profileId, data.take, data.cursor);

    return ratings;
  });
