import {
  DropdownMenu,
  DropdownTrigger,
  MenuContent,
  MenuItem,
  MenuPortal,
} from "./ui/dropdown";
import { Button } from "./ui/button";
import { i18n } from "~/i18n/config";
import { useDictionary } from "./provider/dictionary-provider";
import { Link, useNavigate } from "@tanstack/react-router";
import { setCookie } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

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

export default function LanguageMenu() {
  const { lang } = useDictionary();
  const navigate = useNavigate();

  const handleLanguageChange = async (lang: string) => {
    try {
      // 1. Fire off the server function to update the cookie
      await setLocaleCookie({ data: lang });
      navigate({ to: ".", params: { lang } });
    } catch (error) {
      console.error("Failed to update language preference:", error);
    }
  };

  return (
    <DropdownMenu label={lang}>
      <DropdownTrigger asChild>
        <Button variant="outline">{lang}</Button>
      </DropdownTrigger>
      <MenuPortal>
        <MenuContent>
          {i18n.locales.map((locale) => {
            return (
              <MenuItem key={locale} label={locale} asChild>
                <span
                  className="block px-4 py-2"
                  onClick={() => handleLanguageChange(locale)}
                >
                  {locale}
                </span>
              </MenuItem>
            );
          })}
        </MenuContent>
      </MenuPortal>
    </DropdownMenu>
  );
}
