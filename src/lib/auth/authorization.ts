import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeaders } from "@tanstack/react-start/server";
import { auth, User } from "./auth";
import { Profile } from "../generated/prisma/client";
import { redirect } from "@tanstack/react-router";

//calling server functions in server functions causes error in production build
//serverfunction id doesnt get found

/* export const getServerSession = createServerFn({ method: "GET" }).handler(
  async () => {
    console.log("serverEx");
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({
      headers,
    });

    return { session };
  },
); */

export const getServerSession = async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  return session;
};

/* export const verifiyServerSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({
      headers,
    });
    console.log("verifiyServerSession", session);
    if (!session) {
      throw new Error("Unauthorized");
    }

    return session;
  },
); */
export const verifiyServerSession = async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    const locale = getCookie("locale");
    throw redirect({
      to: "/$lang/auth/login",
      params: { lang: locale || "en" },
    });
  }

  return session;
};

export const canSeeProfile = (user: User, profile: Profile) => {
  return user.id === profile.userId;
};
export const canChangeProfile = (user: User, profile: Profile) => {
  return user.id === profile.userId;
};
