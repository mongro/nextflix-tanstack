import { verifyProfileAccess } from "../utils";
import { db } from "~/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { ProfileMovieRating } from "~/lib/generated/prisma/client";

export const getRating = createServerFn({ method: "GET" })
  .validator(
    (data: {
      profileId: ProfileMovieRating["profileId"];
      externalMovieId: ProfileMovieRating["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    //await verifyProfileAccess(data.profileId);
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
