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
import { Link } from "@tanstack/react-router";

export default function LanguageMenu() {
  const { lang } = useDictionary();

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
                <Link
                  className="block px-4 py-2"
                  to="."
                  params={{ lang: locale }}
                >
                  {locale}
                </Link>
              </MenuItem>
            );
          })}
        </MenuContent>
      </MenuPortal>
    </DropdownMenu>
  );
}
