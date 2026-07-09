import "~/styles/app.css";
import "swiper/swiper.css";
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import DictionaryProvider from "~/components/provider/dictionary-provider";
import { getDictionary, isValidLocale } from "~/i18n/getDictionary";
import { Locale } from "~/i18n/config";

const getDictionaryFn = createServerFn()
  .validator((data: { lang: Locale }) => data)
  .handler(async ({ data }) => {
    // This runs only on the server
    const dictionary = await getDictionary(data.lang);
    return dictionary;
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
    return {
      lang: (lang as Locale) || "en",
    };
  },
  loader: async ({ params, context }) => {
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
