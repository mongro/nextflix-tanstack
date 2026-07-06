import {
  getServerSession,
  verifiyServerSession,
} from "~/lib/auth/authorization";
import { db } from "~/lib/db";
import prisma from "~/lib/prisma";
import { verifyProfileAccess } from "../utils";
import { createServerFn } from "@tanstack/react-start";
import { ProfileMovie } from "~/lib/generated/prisma/client";

export const getMyList = createServerFn({ method: "GET" }).handler(async () => {
  const session = await verifiyServerSession();
  const selectedProfileId = session.session.selectedProfileId;

  if (!selectedProfileId) return [];
  const result = await prisma.profileMovie.findMany({
    where: {
      profileId: selectedProfileId,
    },
  });
  return result;
});

export const getMyListOfProfile = createServerFn({ method: "GET" })
  .validator((data: { profileId: ProfileMovie["profileId"] }) => data)
  .handler(async ({ data }) => {
    const { profileId } = data;
    await verifyProfileAccess(profileId);
    const result = await prisma.profileMovie.findMany({
      where: {
        profileId,
      },
    });
    return result;
  });

export const isInMyList = createServerFn({ method: "GET" })
  .validator(
    (data: {
      profileId: ProfileMovie["profileId"];
      movieId: ProfileMovie["movieId"];
    }) => data,
  )
  .handler(async ({ data }) => {
    const { profileId, movieId } = data;
    const session = await getServerSession();
    if (!session) return false;
    const result = db.isInMyList(profileId, movieId);
    return result;
  });
