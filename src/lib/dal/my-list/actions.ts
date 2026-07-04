import { createServerFn } from "@tanstack/react-start";
import {
  canChangeProfile,
  verifiyServerSession,
} from "~/lib/auth/authorization";
import { db } from "~/lib/db";
import { actionErrorHandler } from "~/lib/error-handler";
import { ProfileMovie } from "~/lib/generated/prisma/client";
//import { revalidatePath } from "next/cache";

export const addToMyList = createServerFn({ method: "POST" })
  .validator(
    (data: {
      profileId: ProfileMovie["profileId"];
      movieId: ProfileMovie["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    const { profileId, movieId } = data;
    try {
      const session = await verifiyServerSession();
      const profile = await db.getUserProfile(profileId);
      if (profile && !canChangeProfile(session.user, profile)) {
        throw new Error("Unauthorized");
      }
      const result = await db.addToMyList(profileId, movieId);

      return {
        data: result,
        success: true,
        message: "Operation completed successfully",
      };
    } catch (error) {
      return actionErrorHandler(error);
    }
  });

export const removeFromMyList = createServerFn({ method: "POST" })
  .validator(
    (data: {
      profileId: ProfileMovie["profileId"];
      movieId: ProfileMovie["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    const { profileId, movieId } = data;
    try {
      const session = await verifiyServerSession();
      const profile = await db.getUserProfile(profileId);
      if (profile && !canChangeProfile(session.user, profile)) {
        throw new Error("Unauthorized");
      }
      const result = await db.removeFromMyList(profileId, movieId);
      // revalidatePath("/my-list");
      return {
        data: result,
        success: true,
        message: "Operation completed successfully",
      };
    } catch (error) {
      return actionErrorHandler(error);
    }
  });
