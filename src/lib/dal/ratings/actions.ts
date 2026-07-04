import { verifyProfileAccess } from "../utils";
import { db } from "~/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { ProfileMovieRating } from "~/lib/generated/prisma/client";

export const removeRating = createServerFn({ method: "POST" })
  .validator(
    (data: {
      profileId: ProfileMovieRating["profileId"];
      movieId: ProfileMovieRating["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      await verifyProfileAccess(data.profileId);
      const result = await db.removeRating(data.profileId, data.movieId);
      return result;
    } catch (error) {
      console.log("error", error);
      return { error: { message: "Couldnt remove rating." }, success: false };
    }
  });

export const giveRating = createServerFn({ method: "POST" })
  .validator(
    (data: {
      profileId: ProfileMovieRating["profileId"];
      movieId: ProfileMovieRating["movieId"];
      rating: ProfileMovieRating["rating"];
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      await verifyProfileAccess(data.profileId);
      const result = await db.giveRating(
        data.profileId,
        data.movieId,
        data.rating,
      );
      return result;
    } catch (error) {
      console.log("error", error);
      return { error: { message: "Couldnt give rating." }, success: false };
    }
  });
