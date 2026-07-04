import React, { useEffect, useRef, useState, useTransition } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDebouncedCallback } from "use-debounce";
import { Locale } from "~/i18n/config";
import { IconButton } from "./ui/icon-button";
import { useDictionary } from "./provider/dictionary-provider";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";

interface Props {
  onBlur: () => void;
  lang?: Locale;
  lastPage: string;
}
const SearchBar = ({ onBlur, lang, lastPage }: Props) => {
  const { q } = useSearch({ strict: false });
  const [search, setSearch] = useState(q || "");
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const { dictionary } = useDictionary();
  const navigate = useNavigate();
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, []);

  const resetSearch = () => {
    setSearch("");
    console.log("Resetting search, going to last valid page:", lastPage);
    goToLastValidPage();
  };

  const goToLastValidPage = () => {
    navigate({ to: lastPage });
  };

  const handleSearch = (value: string) => {
    console.log("Handling search with value:", value);
    setSearch(value);
    updateQuery(value);
  };

  const updateQuery = useDebouncedCallback((value: string) => {
    console.log("Updating query with value:", value);
    if (!value) {
      goToLastValidPage();
      return;
    }

    if (!pathname?.includes("/search")) {
      navigate({
        to: `/${lang}/search`,
        search: { q: value },
        replace: false,
      });
    } else {
      navigate({ to: `/${lang}/search`, search: { q: value }, replace: true });
    }
  }, 300);

  return (
    <div className="flex items-center border-neutral-50 bg-neutral-900 border">
      <MagnifyingGlassIcon className="w-6 h-6 mx-2 text-white" />
      <input
        ref={searchBarRef}
        id="filter-search"
        className="bg-transparent text-white px-4 py-2 outline-hidden animate-width"
        type="text"
        placeholder={dictionary.buttons.searchPlaceholder}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSearch(e.target.value);
        }}
        onBlur={onBlur}
      />
      <span className={`${!search ? " invisible" : ""}`}>
        <IconButton onClick={resetSearch} size="small" aria-label="Clear">
          <XMarkIcon />
        </IconButton>
      </span>
    </div>
  );
};

export default SearchBar;
