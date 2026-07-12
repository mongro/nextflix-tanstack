import { getRequestHeaders } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { APIError } from "better-auth/api";
import { redirect } from "@tanstack/react-router";
import { createProfile } from "../db/profile";
import { signInFormSchema, signUpFormSchema } from "./schema";
import smiley from "~/assets/avatars/smiley.webp";
import { auth } from "~/lib/auth/auth";

export const signIn = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return {
      password: data.get("password")?.toString() || "",
      email: data.get("email")?.toString() || "",
    };
  })
  .handler(async (data) => {
    const { email, password } = data.data;
    const parsedForm = signInFormSchema.safeParse({ email, password });
    if (!parsedForm.success) {
      // If validation fails, return the form data and field errors
      return {
        formData: parsedForm.data,
        fieldErrors: parsedForm.error.flatten().fieldErrors,
        success: false,
      };
    }
    try {
      await auth.api.signInEmail({ body: { email, password } });
      return {
        success: true,
      };
    } catch (error) {
      console.log("error", error);
      if (error instanceof APIError) {
        return {
          formData: parsedForm.data,
          fieldErrors: { email: [error.message] },
          success: false,
          error: { message: error.message },
        };
      }
      return { success: false, error: { message: "Something went wrong" } };
    }
  });

export const signUp = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return {
      password: data.get("password")?.toString() || "",
      email: data.get("email")?.toString() || "",
      name: data.get("name")?.toString() || "",
    };
  })
  .handler(async (data) => {
    const { email, password, name } = data.data;
    const parsedForm = signUpFormSchema.safeParse({ email, password, name });
    console.log("signUp");

    if (!parsedForm.success) {
      // If validation fails, return the form data and field errors
      console.log("validation failed");
      return {
        formData: parsedForm.data,
        fieldErrors: parsedForm.error.flatten().fieldErrors,
        success: false,
      };
    }
    try {
      const res = await auth.api.signUpEmail({
        body: { email, password, name },
      });
      await createProfile(res.user.id, res.user.name, smiley);
      return {
        formData: parsedForm.data,
        success: true,
      };
    } catch (error) {
      console.log(process.env.DATABASE_URL);
      console.log(error);
      if (error instanceof APIError) {
        return {
          formData: parsedForm.data,
          fieldErrors: { name: [error.message] },
          success: false,
          error: { message: error.message },
        };
      }
      return { success: false, error: { message: "Something went wrong" } };
    }
  });

export const signUpAnonym = createServerFn({ method: "POST" }).handler(
  async () => {
    const name = "User";
    const password = "placeholder";
    const email = crypto.randomUUID() + "@placeholder.com";
    try {
      const res = await auth.api.signUpEmail({
        body: { email, password, name },
      });
      await createProfile(res.user.id, res.user.name, smiley);
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof APIError) {
        return {
          success: false,
          error: { message: error.message },
        };
      }
      return { success: false, error: { message: "Something went wrong" } };
    }
  },
);

export const signOut = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();

  await auth.api.signOut({ headers });
  throw redirect({
    to: "/$lang",
    params: ({ lang }) => ({ lang: lang || "en" }),
  });
});
