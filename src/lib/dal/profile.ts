// import { revalidatePath } from "next/cache";
import { redirect } from "@tanstack/react-router";
import z from "zod";
import { createServerFn } from "@tanstack/react-start";
import { verifiyServerSession } from "../auth/authorization";
import { db } from "../db/index";
import { MutationResponseWithoutData, verifyProfileAccess } from "./utils";
import type { Profile } from "../generated/prisma/client";

export const getProfile = createServerFn({ method: "GET" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    try {
      const { session, profile } = await verifyProfileAccess(data.id);
      return { profile, error: null };
    } catch (error) {
      console.log(error);
      return { error: { message: "something went wrong" }, profile: null };
    }
  });

export type createProfileState = {
  profile: Profile | null;
  error: { message: string } | null;
};

const updateProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  avatar: z.string({
    message: "avatar url must be a string",
  }),
  id: z.coerce.number({ message: "Invalid Profile Id" }),
});

const createProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  avatar: z.string({
    message: "avatar url must be a string",
  }),
});

export const createProfile = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return data;
  })
  .handler(async ({ data }): Promise<createProfileState> => {
    const formData = Object.fromEntries(data);
    const parsedForm = createProfileFormSchema.safeParse(formData);
    if (!parsedForm.success) {
      return {
        error: { message: z.prettifyError(parsedForm.error) },
        profile: null,
      };
    }
    try {
      const session = await verifiyServerSession();
      const profile = await db.createProfile(
        session.user.id,
        parsedForm.data.name,
        parsedForm.data.avatar,
      );
      return { profile, error: null };
    } catch (error) {
      return { error: { message: "Couldnt create profile." }, profile: null };
    }
  });

export const updateProfile = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return data;
  })
  .handler(async ({ data }): Promise<createProfileState> => {
    const formData = Object.fromEntries(data);
    const parsedForm = updateProfileFormSchema.safeParse(formData);
    if (!parsedForm.success) {
      return {
        error: { message: z.prettifyError(parsedForm.error) },
        profile: null,
      };
    }
    try {
      const { session } = await verifyProfileAccess(parsedForm.data.id);
      const profile = await db.updateProfile(
        parsedForm.data.id,
        parsedForm.data.name,
        parsedForm.data.avatar,
      );
      return { profile, error: null };
    } catch (error) {
      return { error: { message: "Couldnt update profile." }, profile: null };
    }
  });

export const deleteProfile = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    try {
      const { session } = await verifyProfileAccess(data.id);
      const profile = await db.deleteProfile(data.id);
      return { profile, error: null };
    } catch (error) {
      return { error: { message: "Couldnt delete profile." }, profile: null };
    }

    // redirection
  });

export const selectProfile = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    try {
      const { session, profile } = await verifyProfileAccess(data.id);
      console.log(session.user.id);
      const result = await db.changeSelectedProfile(
        session.session.id,
        data.id,
      );
      return { success: true, error: null };
    } catch (error) {
      console.log(error);
      return { error: { message: "something went wrong" }, success: false };
    }
  });

export const getAllProfilesOfUser = createServerFn({ method: "GET" }).handler(
  async ({ data }) => {
    const session = await verifiyServerSession();
    const result = await db.getAllProfilesOfUser(session.user.id);

    return result;
  },
);
