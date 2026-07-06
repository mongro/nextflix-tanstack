import { Link } from "@tanstack/react-router";
import { DictionaryHeader } from "~/i18n/type";
import { Locale } from "~/i18n/config";
import AccountActionClient from "~/components/navigation/account-action-client";

function Header({
  dictionary,
  lang,
}: {
  dictionary: DictionaryHeader;
  lang: Locale;
}) {
  return (
    <div className="h-16 w-full top-0 left-0 fixed z-40">
      <div className="mx-auto px-4 lg:w-10/12 p-2 flex items-center h-full justify-between">
        <Link to="/$lang" params={{ lang }}>
          Back to Main
        </Link>
        <AccountActionClient lang={lang} />
      </div>
    </div>
  );
}

export default Header;
