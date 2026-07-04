import "./getDictionary-CmVtiGPB.js";
import { t as Route } from "./route-Csbj4NXm.js";
import { t as Button } from "./button-B_qHKP16.js";
import { a as IconButton, t as ModalProvider } from "./modal-provider-DZYyqRsW.js";
import { n as useDictionary } from "./dictionary-provider-CBhcFZnw.js";
import { a as MenuContent, i as DropdownTrigger, o as MenuItem, r as DropdownMenu, s as MenuPortal } from "./auth-client-DjbFPC9N.js";
import { t as AccountActionClient } from "./account-action-client-DspR_CMQ.js";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, getRouteApi, useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDebouncedCallback } from "use-debounce";
//#region src/i18n/config.ts
var i18n = {
	defaultLocale: "en",
	locales: ["en", "de"]
};
//#endregion
//#region src/components/language-dropdown-menu.tsx
function LanguageMenu() {
	const { lang } = useDictionary();
	return /* @__PURE__ */ jsxs(DropdownMenu, {
		label: lang,
		children: [/* @__PURE__ */ jsx(DropdownTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				children: lang
			})
		}), /* @__PURE__ */ jsx(MenuPortal, { children: /* @__PURE__ */ jsx(MenuContent, { children: i18n.locales.map((locale) => {
			return /* @__PURE__ */ jsx(MenuItem, {
				label: locale,
				asChild: true,
				children: /* @__PURE__ */ jsx(Link, {
					className: "block px-4 py-2",
					to: ".",
					params: { lang: locale },
					children: locale
				})
			}, locale);
		}) }) })]
	});
}
//#endregion
//#region src/components/searchbar.tsx
var SearchBar = ({ onBlur, lang, lastPage }) => {
	const { q } = useSearch({ strict: false });
	const [search, setSearch] = useState(q || "");
	const searchBarRef = useRef(null);
	const { dictionary } = useDictionary();
	const navigate = useNavigate();
	const pathname = useLocation({ select: (location) => location.pathname });
	useEffect(() => {
		if (searchBarRef.current) searchBarRef.current.focus();
	}, []);
	const resetSearch = () => {
		setSearch("");
		console.log("Resetting search, going to last valid page:", lastPage);
		goToLastValidPage();
	};
	const goToLastValidPage = () => {
		navigate({ to: lastPage });
	};
	const handleSearch = (value) => {
		console.log("Handling search with value:", value);
		setSearch(value);
		updateQuery(value);
	};
	const updateQuery = useDebouncedCallback((value) => {
		console.log("Updating query with value:", value);
		if (!value) {
			goToLastValidPage();
			return;
		}
		if (!pathname?.includes("/search")) navigate({
			to: `/${lang}/search`,
			search: { q: value },
			replace: false
		});
		else navigate({
			to: `/${lang}/search`,
			search: { q: value },
			replace: true
		});
	}, 300);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center border-neutral-50 bg-neutral-900 border",
		children: [
			/* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-6 h-6 mx-2 text-white" }),
			/* @__PURE__ */ jsx("input", {
				ref: searchBarRef,
				id: "filter-search",
				className: "bg-transparent text-white px-4 py-2 outline-hidden animate-width",
				type: "text",
				placeholder: dictionary.buttons.searchPlaceholder,
				value: search,
				onChange: (e) => {
					handleSearch(e.target.value);
				},
				onBlur
			}),
			/* @__PURE__ */ jsx("span", {
				className: `${!search ? " invisible" : ""}`,
				children: /* @__PURE__ */ jsx(IconButton, {
					onClick: resetSearch,
					size: "small",
					"aria-label": "Clear",
					children: /* @__PURE__ */ jsx(XMarkIcon, {})
				})
			})
		]
	});
};
//#endregion
//#region src/utils/hooks/useLastValidPage.ts
var lastValidPage = "/";
function useLastValidPage(excludedPath) {
	const pathname = useLocation({ select: (location) => location.pathname });
	console.log("Current pathname:", pathname);
	useEffect(() => {
		if (!pathname.includes(excludedPath)) lastValidPage = pathname;
	}, [pathname, excludedPath]);
	return lastValidPage;
}
//#endregion
//#region src/components/header.tsx
function Header({ dictionary, lang }) {
	const [isScrolled, setIsScrolled] = useState(false);
	const { q } = useSearch({ strict: false });
	const lastPage = useLastValidPage("/search");
	const [showSearchBar, setShowSearchBar] = useState(Boolean(q));
	const handleScroll = (event) => {
		if (window.scrollY > 0) setIsScrolled(true);
		else setIsScrolled(false);
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: `h-16 w-full top-0 left-0 fixed z-40 ${isScrolled ? "bg-black" : "bg-transparent"} transition-colors	bg-linear-to-b from-black	`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "px-4 lg:px-8 flex items-center h-full",
			children: [/* @__PURE__ */ jsx("nav", {
				className: "text-neutral-200",
				children: /* @__PURE__ */ jsxs("ul", {
					className: "flex items-center [&>li]:ml-6",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							className: "hover:text-neutral-400",
							to: `/$lang/movies`,
							params: { lang },
							children: dictionary.movies
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							className: "hover:text-neutral-400",
							to: `/$lang/shows`,
							params: { lang },
							children: dictionary.shows
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							className: "hover:text-neutral-400",
							to: `/$lang/my-list`,
							params: { lang },
							children: dictionary.mylist
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LanguageMenu, {}) })
					]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center h-full absolute right-4 gap-2",
				children: [showSearchBar || q ? /* @__PURE__ */ jsx(SearchBar, {
					lastPage,
					lang,
					onBlur: () => {
						setShowSearchBar(false);
						console.log("blurred");
					}
				}) : /* @__PURE__ */ jsx(IconButton, {
					"aria-label": "Search",
					size: "small",
					variant: "secondary",
					onClick: (event) => {
						setShowSearchBar(true);
					},
					children: /* @__PURE__ */ jsx(MagnifyingGlassIcon, {})
				}), /* @__PURE__ */ jsx(AccountActionClient, { lang })]
			})]
		})
	});
}
//#endregion
//#region src/routes/$lang/_app/route.tsx?tsr-split=component
function RouteComponent() {
	const { lang } = Route.useRouteContext();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Header, {
		dictionary: getRouteApi("/$lang").useLoaderData().header,
		lang
	}), /* @__PURE__ */ jsx(ModalProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) })] });
}
//#endregion
export { RouteComponent as component };
