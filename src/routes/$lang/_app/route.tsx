import "~/styles/app.css";
import "swiper/swiper.css";
import {
  createFileRoute,
  redirect,
  Outlet,
  HeadContent,
  getRouteApi,
} from "@tanstack/react-router";
import ModalProvider from "~/components/provider/modal-provider";
import Header from "~/components/header";

export const Route = createFileRoute("/$lang/_app")({
  component: RouteComponent,
  headers: () => ({
    "Cache-Control":
      "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  }),
  staleTime: 5 * 60_000,
});

function RouteComponent() {
  const { lang } = Route.useRouteContext();
  const dictionary = getRouteApi("/$lang").useLoaderData();
  return (
    <>
      <Header dictionary={dictionary.header} lang={lang} />
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </>
  );
}
