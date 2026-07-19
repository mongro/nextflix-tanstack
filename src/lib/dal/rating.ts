import { createServerFn } from "@tanstack/react-start";
import { db } from "../db/index";
import { verifyProfileAccess } from "./utils";
import type { ProfileMovieRating } from "../generated/prisma/client";

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
      return { error: { message: "Couldnt give rating." }, success: false };
    }
  });

export const getRating = createServerFn({ method: "GET" })
  .validator(
    (data: {
      profileId: ProfileMovieRating["profileId"];
      movieId: ProfileMovieRating["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      await verifyProfileAccess(data.profileId);
      const rating = await db.getRating(data.profileId, data.movieId);
      return rating;
    } catch (error) {
      return { error: { message: "Couldnt get rating." }, success: false };
    }
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
    try {
      await verifyProfileAccess(data.profileId);
      const ratings = await db.getRatings(
        data.profileId,
        data.take,
        data.cursor,
      );
      return ratings;
    } catch (error) {
      return { error: { message: "Couldnt get ratings." }, success: false };
    }
  });
