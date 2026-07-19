import "~/styles/app.css";
import "swiper/swiper.css";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { Locale } from "~/i18n/config";
import DictionaryProvider from "~/components/provider/dictionary-provider";
import { getDictionary, isValidLocale } from "~/i18n/getDictionary";

const getDictionaryFn = createServerFn()
  .validator((data: { lang: Locale }) => data)
  .handler(async ({ data }) => {
    // This runs only on the server
    const dictionary = await getDictionary(data.lang);
    return dictionary;
  });

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params, preload, location }) => {
    const { lang } = params;

    // Type-safe locale validation
    if (lang && !isValidLocale(lang)) {
      throw redirect({
        to: "/$lang",
        params: { lang: params.lang },
      });
    }
    return {
      lang: lang as Locale,
    };
  },
  loader: async ({ params, context }) => {
    return await getDictionaryFn({ data: { lang: context.lang } });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const dictionary = Route.useLoaderData();
  const { lang } = Route.useRouteContext();
  return (
    <DictionaryProvider dictionary={dictionary} lang={lang}>
      <Outlet />
    </DictionaryProvider>
  );
}
