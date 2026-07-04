import AccountDropdown from "./account-dropdown-menu";
import { useSession } from "~/lib/auth/auth-client";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { useProfileWithPreload } from "~/lib/api/profile";
import { Link, useNavigate } from "@tanstack/react-router";
import { Locale } from "~/i18n/config";

type AccountActionProps = {
  lang: Locale;
};
/*
  Wrapper around Dropdown where  session gets loaded on the
  client side to keep page static
*/

export default function AccountActionClient({ lang }: AccountActionProps) {
  const session = useSession();
  const navigate = useNavigate();
  const selectedProfileId = session.data?.data?.session.selectedProfileId;
  const profileQuery = useProfileWithPreload(selectedProfileId);
  useEffect(() => {
    if (session.data?.data?.user && !selectedProfileId) {
      navigate({
        to: "/$lang/account/profile-select",
        params: ({ lang, ...prev }) => ({ ...prev, lang: lang || "en" }),
      });
    }
  }, [selectedProfileId, navigate, session.data?.data?.user]);

  if (session.isPending || profileQuery.isFetching)
    return <Spinner className="size-8" />;
  return session?.data?.data?.user ? (
    <AccountDropdown lang={lang} profile={profileQuery.data?.profile} />
  ) : (
    <Link
      to={`/$lang/auth/login`}
      params={({ lang }) => ({ lang: lang || "en" })}
    >
      Sign In
    </Link>
  );
}
