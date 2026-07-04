import Header from "./header";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useDictionary } from "~/components/provider/dictionary-provider";

export const Route = createFileRoute("/$lang/account")({
  component: RootLayout,
});

function RootLayout() {
  const { lang } = Route.useRouteContext();
  const { dictionary } = useDictionary();

  return (
    <>
      <Header lang={lang} dictionary={dictionary.header} />
      <div className="mx-auto mt-16 w-5/6 max-w-3xl">
        <Outlet />
      </div>
    </>
  );
}
