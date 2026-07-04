import { t as Button } from "./button-B_qHKP16.js";
import { o as useRemoveRatingInInfiniteContext, r as useGiveRatingInInfiniteContext, t as getInfiniteRatingsQueryOptions } from "./rating-6U8660zY.js";
import { t as Route } from "./ratings-BqwKY9gC.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import HandThumbDownIconOutline from "@heroicons/react/24/outline/HandThumbDownIcon";
import HandThumbUpIconOutline from "@heroicons/react/24/outline/HandThumbUpIcon";
//#region src/components/profile/thumb-buttons.tsx
function ThumbsButtons(props) {
	const { profileId, movieId, rating } = props.rating;
	const { mutate: giveRating } = useGiveRatingInInfiniteContext();
	const { mutate: removeRating } = useRemoveRatingInInfiniteContext();
	const handleThumbClick = (button) => {
		if (rating === button) removeRating({
			movieId,
			profileId
		});
		else giveRating({
			profileId,
			movieId,
			rating: button
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ jsx(Button, {
			size: "icon",
			variant: "ghost",
			onClick: () => handleThumbClick("UP"),
			children: rating === "UP" ? /* @__PURE__ */ jsx(HandThumbUpIcon, {}) : /* @__PURE__ */ jsx(HandThumbUpIconOutline, {})
		}), /* @__PURE__ */ jsx(Button, {
			size: "icon",
			variant: "ghost",
			onClick: () => handleThumbClick("DOWN"),
			children: rating === "DOWN" ? /* @__PURE__ */ jsx(HandThumbDownIcon, {}) : /* @__PURE__ */ jsx(HandThumbDownIconOutline, {})
		})]
	});
}
//#endregion
//#region src/components/profile/ratings.tsx
function Ratings({ profile }) {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(getInfiniteRatingsQueryOptions(profile.id, 10));
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-8 mb-8 font-bold",
			children: [/* @__PURE__ */ jsx(Link, {
				to: "..",
				children: /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "size-6" })
			}), /* @__PURE__ */ jsxs("h1", {
				className: "text-2xl",
				children: ["Ratings of ", profile.name]
			})]
		}),
		/* @__PURE__ */ jsx("ul", {
			className: "table w-full border-collapse",
			children: data?.pages?.map((page) => page.map((rating) => /* @__PURE__ */ jsxs("li", {
				className: "table-row border-t-2 last:border-y-2",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "table-cell p-2",
						children: rating.ratedAt.toLocaleDateString()
					}),
					/* @__PURE__ */ jsx("div", {
						className: "table-cell p-2",
						children: rating.movie.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "table-cell p-2",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex items-center ",
							children: /* @__PURE__ */ jsx(ThumbsButtons, { rating })
						})
					})
				]
			}, rating.movieId)))
		}),
		/* @__PURE__ */ jsx("div", {
			className: "pt-4",
			children: hasNextPage && /* @__PURE__ */ jsxs(Button, {
				onClick: () => fetchNextPage(),
				children: [" ", isFetchingNextPage ? "Loading more..." : "Load More"]
			})
		})
	] });
}
//#endregion
//#region src/routes/$lang/account/profiles/$id/ratings/index.tsx?tsr-split=component
function RatingsPage() {
	const { profile, error } = Route.useLoaderData();
	if (error) return /* @__PURE__ */ jsx("div", { children: error.message });
	return /* @__PURE__ */ jsx("div", {
		className: "",
		children: /* @__PURE__ */ jsx(Ratings, { profile })
	});
}
//#endregion
export { RatingsPage as component };
