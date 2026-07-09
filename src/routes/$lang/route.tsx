import "~/styles/app.css";
import "swiper/swiper.css";
import {
  createFileRoute,
  redirect,
  Outlet,
  HeadContent,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import DictionaryProvider from "~/components/provider/dictionary-provider";
import { getDictionary, isValidLocale } from "~/i18n/getDictionary";
import { Locale } from "~/i18n/config";
import { setCookie } from "@tanstack/react-start/server";

const getDictionaryFn = createServerFn()
  .validator((data: { lang: Locale }) => data)
  .handler(async ({ data }) => {
    // This runs only on the server
    const dictionary = await getDictionary(data.lang);
    return dictionary;
  });

const setLocaleCookie = createServerFn({ method: "POST" })
  .validator((locale: string) => locale)
  .handler(async ({ data: locale }) => {
    setCookie("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      secure: true,
    });
  });

export const Route = createFileRoute("/$lang")({
  beforeLoad: async ({ params, preload, location }) => {
    const { lang } = params;

    // Type-safe locale validation
    if (lang && !isValidLocale(lang)) {
      throw redirect({
        to: "/$lang",
        params: { lang: params.lang },
      });
    }
    /* if(lang)
    setLocaleCookie({ data: lang as Locale }); */

    return {
      lang: (lang as Locale) || "en",
    };
  },
  loader: async ({ params, context }) => {
    console.log("load dictionary");
    return await getDictionaryFn({ data: { lang: context.lang } });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const dictionary = Route.useLoaderData();
  console.log("dictionary", dictionary);
  const { lang } = Route.useRouteContext();
  return (
    <DictionaryProvider dictionary={dictionary} lang={lang}>
      <Outlet />
    </DictionaryProvider>
  );
}
