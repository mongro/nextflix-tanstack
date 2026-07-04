import { t as auth } from "./auth-c5YgNTdZ.js";
import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
import { t as Route$7 } from "./route-DRLEPTyt.js";
import { t as Route$8 } from "./route-BThdu1a2.js";
import { t as Route$9 } from "./route-Csbj4NXm.js";
import { t as Route$10 } from "./_app-Bq7TZc8X.js";
import { t as Route$11 } from "./profiles-DDbzmgB5.js";
import { t as Route$12 } from "./profile-select-BIrKL-bF.js";
import { t as Route$13 } from "./shows-DpWxYzDh.js";
import { t as Route$14 } from "./search-WNu7ADbE.js";
import { t as Route$15 } from "./my-list-vlvuWj-M.js";
import { t as Route$16 } from "./movies-CLazfH3a.js";
import { t as Route$17 } from "./_id-DZ2CdylQ.js";
import { t as Route$18 } from "./ratings-BqwKY9gC.js";
import { t as Route$19 } from "./edit-D9g30B3G.js";
import "react";
import { ErrorComponent, HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useLocation, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import axios from "redaxios";
//#region src/components/DefaultCatchBoundary.tsx
function DefaultCatchBoundary({ error }) {
	const router = useRouter();
	const isRoot = useLocation({ select: (location) => location.pathname === "/" });
	console.error(error);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6",
		children: [/* @__PURE__ */ jsx(ErrorComponent, { error }), /* @__PURE__ */ jsxs("div", {
			className: "flex gap-2 items-center flex-wrap",
			children: [/* @__PURE__ */ jsx("button", {
				onClick: () => {
					router.invalidate();
				},
				className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
				children: "Try Again"
			}), isRoot ? /* @__PURE__ */ jsx(Link, {
				to: "/",
				className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
				children: "Home"
			}) : /* @__PURE__ */ jsx(Link, {
				to: "/",
				className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
				onClick: (e) => {
					e.preventDefault();
					window.history.back();
				},
				children: "Go Back"
			})]
		})]
	});
}
//#endregion
//#region src/components/NotFound.tsx
function NotFound({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2 p-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-gray-600 dark:text-gray-400",
			children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." })
		}), /* @__PURE__ */ jsxs("p", {
			className: "flex items-center gap-2 flex-wrap",
			children: [/* @__PURE__ */ jsx("button", {
				onClick: () => window.history.back(),
				className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
				children: "Go back"
			}), /* @__PURE__ */ jsx(Link, {
				to: "/",
				className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
				children: "Start Over"
			})]
		})]
	});
}
//#endregion
//#region src/styles/app.css?url
var app_default = "/assets/app-BqaiO0_F.css";
//#endregion
//#region src/utils/seo.ts
var seo = ({ title, description, keywords, image }) => {
	return [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			name: "keywords",
			content: keywords
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		},
		{
			name: "twitter:creator",
			content: "@tannerlinsley"
		},
		{
			name: "twitter:site",
			content: "@tannerlinsley"
		},
		{
			name: "og:type",
			content: "website"
		},
		{
			name: "og:title",
			content: title
		},
		{
			name: "og:description",
			content: description
		},
		...image ? [
			{
				name: "twitter:image",
				content: image
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "og:image",
				content: image
			}
		] : []
	];
};
//#endregion
//#region src/routes/__root.tsx
var localeRedirect = createServerFn().handler(createSsrRpc("5b2c0e57e19c88c74b989d8b2a756e6ee3b790348d6da7b961e981bf483e9822"));
var Route$6 = createRootRouteWithContext()({
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/") {
			console.log("Redirecting to locale...");
			await localeRedirect();
		}
	},
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			...seo({
				title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
				description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
			})
		],
		links: [
			{
				rel: "stylesheet",
				href: app_default
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png"
			},
			{
				rel: "manifest",
				href: "/site.webmanifest",
				color: "#fffff"
			},
			{
				rel: "icon",
				href: "/favicon.ico"
			}
		]
	}),
	errorComponent: (props) => {
		return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
	},
	notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		className: "dark",
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(TanStackRouterDevtools, {}),
			/* @__PURE__ */ jsx(ReactQueryDevtools, { buttonPosition: "bottom-left" }),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
//#endregion
//#region src/routes/api/users.ts
var Route$5 = createFileRoute("/api/users")({ server: { handlers: { GET: async ({ request }) => {
	console.info("Fetching users... @", request.url);
	const list = (await axios.get("https://jsonplaceholder.typicode.com/users")).data.slice(0, 10);
	return Response.json(list.map((u) => ({
		id: u.id,
		name: u.name,
		email: u.email
	})));
} } } });
//#endregion
//#region src/routes/$lang/auth/route.tsx
var $$splitComponentImporter$2 = () => import("./route-x1G-xF8y.js");
var Route$4 = createFileRoute("/$lang/auth")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/api/users.$id.ts
var Route$3 = createFileRoute("/api/users/$id")({ server: { handlers: { GET: async ({ request, params }) => {
	console.info(`Fetching users by id=${params.id}... @`, request.url);
	try {
		const res = await axios.get("https://jsonplaceholder.typicode.com/users/" + params.id);
		return Response.json({
			id: res.data.id,
			name: res.data.name,
			email: res.data.email
		});
	} catch (e) {
		console.error(e);
		return Response.json({ error: "User not found" }, { status: 404 });
	}
} } } });
//#endregion
//#region src/routes/api/auth/$.ts
var Route$2 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: async ({ request }) => {
		return await auth.handler(request);
	},
	POST: async ({ request }) => {
		return await auth.handler(request);
	}
} } });
//#endregion
//#region src/routes/$lang/auth/register/index.tsx
var $$splitComponentImporter$1 = () => import("./register-CsjGF0WM.js");
var Route$1 = createFileRoute("/$lang/auth/register/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/$lang/auth/login/index.tsx
var $$splitComponentImporter = () => import("./login-CXH2-Piy.js");
var Route = createFileRoute("/$lang/auth/login/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var LangRouteRoute = Route$7.update({
	id: "/$lang",
	path: "/$lang",
	getParentRoute: () => Route$6
});
var ApiUsersRoute = Route$5.update({
	id: "/api/users",
	path: "/api/users",
	getParentRoute: () => Route$6
});
var LangAuthRouteRoute = Route$4.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => LangRouteRoute
});
var LangAccountRouteRoute = Route$8.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => LangRouteRoute
});
var LangAppRouteRoute = Route$9.update({
	id: "/_app",
	getParentRoute: () => LangRouteRoute
});
var LangAppIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => LangAppRouteRoute
});
var ApiUsersIdRoute = Route$3.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiUsersRoute
});
var ApiAuthSplatRoute = Route$2.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$6
});
var LangAuthRegisterIndexRoute = Route$1.update({
	id: "/register/",
	path: "/register/",
	getParentRoute: () => LangAuthRouteRoute
});
var LangAuthLoginIndexRoute = Route.update({
	id: "/login/",
	path: "/login/",
	getParentRoute: () => LangAuthRouteRoute
});
var LangAccountProfilesIndexRoute = Route$11.update({
	id: "/profiles/",
	path: "/profiles/",
	getParentRoute: () => LangAccountRouteRoute
});
var LangAccountProfileSelectIndexRoute = Route$12.update({
	id: "/profile-select/",
	path: "/profile-select/",
	getParentRoute: () => LangAccountRouteRoute
});
var LangAppShowsIndexRoute = Route$13.update({
	id: "/shows/",
	path: "/shows/",
	getParentRoute: () => LangAppRouteRoute
});
var LangAppSearchIndexRoute = Route$14.update({
	id: "/search/",
	path: "/search/",
	getParentRoute: () => LangAppRouteRoute
});
var LangAppMyListIndexRoute = Route$15.update({
	id: "/my-list/",
	path: "/my-list/",
	getParentRoute: () => LangAppRouteRoute
});
var LangAppMoviesIndexRoute = Route$16.update({
	id: "/movies/",
	path: "/movies/",
	getParentRoute: () => LangAppRouteRoute
});
var LangAccountProfilesIdIndexRoute = Route$17.update({
	id: "/profiles/$id/",
	path: "/profiles/$id/",
	getParentRoute: () => LangAccountRouteRoute
});
var LangAccountProfilesIdRatingsIndexRoute = Route$18.update({
	id: "/profiles/$id/ratings/",
	path: "/profiles/$id/ratings/",
	getParentRoute: () => LangAccountRouteRoute
});
var LangAccountProfilesIdEditIndexRoute = Route$19.update({
	id: "/profiles/$id/edit/",
	path: "/profiles/$id/edit/",
	getParentRoute: () => LangAccountRouteRoute
});
var LangAppRouteRouteChildren = {
	LangAppIndexRoute,
	LangAppMoviesIndexRoute,
	LangAppMyListIndexRoute,
	LangAppSearchIndexRoute,
	LangAppShowsIndexRoute
};
var LangAppRouteRouteWithChildren = LangAppRouteRoute._addFileChildren(LangAppRouteRouteChildren);
var LangAccountRouteRouteChildren = {
	LangAccountProfileSelectIndexRoute,
	LangAccountProfilesIndexRoute,
	LangAccountProfilesIdIndexRoute,
	LangAccountProfilesIdEditIndexRoute,
	LangAccountProfilesIdRatingsIndexRoute
};
var LangAccountRouteRouteWithChildren = LangAccountRouteRoute._addFileChildren(LangAccountRouteRouteChildren);
var LangAuthRouteRouteChildren = {
	LangAuthLoginIndexRoute,
	LangAuthRegisterIndexRoute
};
var LangRouteRouteChildren = {
	LangAppRouteRoute: LangAppRouteRouteWithChildren,
	LangAccountRouteRoute: LangAccountRouteRouteWithChildren,
	LangAuthRouteRoute: LangAuthRouteRoute._addFileChildren(LangAuthRouteRouteChildren)
};
var LangRouteRouteWithChildren = LangRouteRoute._addFileChildren(LangRouteRouteChildren);
var ApiUsersRouteChildren = { ApiUsersIdRoute };
var rootRouteChildren = {
	LangRouteRoute: LangRouteRouteWithChildren,
	ApiUsersRoute: ApiUsersRoute._addFileChildren(ApiUsersRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	const queryClient = new QueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: false,
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {})
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
}
//#endregion
export { getRouter };
