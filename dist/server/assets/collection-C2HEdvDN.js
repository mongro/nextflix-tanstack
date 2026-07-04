import { i as ImageWithTmdbUrl } from "./modal-provider-DZYyqRsW.js";
import { t as MovieThumbnail } from "./movie-thumbnail-CRyidt6W.js";
import React, { useRef } from "react";
import { Await } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
//#region src/components/promoted.tsx
function Promoted({ promise, dictionary }) {
	const { results } = promise;
	const promotedMovie = results[0];
	return /* @__PURE__ */ jsxs("div", {
		className: " w-full pb-[40%] relative",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute w-full h-[56vw]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "inset-0 absolute",
				children: [/* @__PURE__ */ jsx(ImageWithTmdbUrl, {
					className: "object-cover pointer-events-none",
					src: promotedMovie.backdrop_path || promotedMovie.poster_path,
					alt: promotedMovie.title,
					sizes: "1200px"
				}), /* @__PURE__ */ jsx("div", { className: "h-[16vw] bottom-0 left-0 right-0 absolute w-full back bg-linear-to-t	from-neutral-800 via-neutral-600" })]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col absolute justify-end bottom-0 w-full text-white md:w-1/2 lg:w-1/3 mx-4 lg:mx-8",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-4xl ",
				children: promotedMovie.title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-white text-sm sm:text-base lg:text-xl mt-2 hidden sm:block",
				children: promotedMovie.overview
			})]
		})]
	});
}
//#endregion
//#region src/components/collection/collection-skeleton.tsx
function CarouselSkeleton() {
	return /* @__PURE__ */ jsxs("div", {
		className: "my-6 mx-4 lg:mx-8 animate-pulse",
		children: [/* @__PURE__ */ jsx("div", { className: "h-9 my-3 bg-neutral-400 w-32" }), /* @__PURE__ */ jsx("div", {
			className: "flex flex-row relative overflow-hidden",
			children: Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ jsx("div", {
				className: "pr-3 shrink-0 lg:pr-5 basis-4/12 md:basis-3/12 sm:basis-4/12 lg:basis-1/5 xl:basis-2/12",
				children: /* @__PURE__ */ jsx("div", { className: "aspect-video bg-neutral-400 rounded " })
			}, idx))
		})]
	});
}
//#endregion
//#region src/components/collection/carousel.tsx
function Carousel({ children }) {
	const swiperRef = useRef(null);
	return /* @__PURE__ */ jsxs(Swiper, {
		style: { overflow: "visible" },
		lazyPreloadPrevNext: 2,
		loop: true,
		modules: [Navigation],
		slidesPerView: "auto",
		onBeforeInit: (swiper) => {
			swiperRef.current = swiper;
		},
		children: [
			React.Children.count(children) > 0 && React.Children.map(children, (child) => /* @__PURE__ */ jsx(SwiperSlide, { children: child })),
			/* @__PURE__ */ jsx("button", {
				className: "absolute -left-4 lg:-left-10 top-0 w-8 lg:w-10 h-full z-50 flex flex-col justify-center cursor-pointer bg-background/80 text-muted-foreground hover:text-foreground",
				onClick: () => swiperRef.current?.slidePrev(),
				"aria-label": "previous slide",
				children: /* @__PURE__ */ jsx(ChevronLeftIcon, {})
			}),
			/* @__PURE__ */ jsx("button", {
				className: "absolute -right-4 lg:-right-10 top-0 w-8 lg:w-10 h-full z-50 flex flex-col justify-center cursor-pointer bg-background/80 text-muted-foreground hover:text-foreground",
				onClick: () => swiperRef.current?.slideNext(),
				"aria-label": "next slide",
				children: /* @__PURE__ */ jsx(ChevronRightIcon, {})
			})
		]
	});
}
//#endregion
//#region src/components/collection/items.tsx
function Items({ items, collection }) {
	return /* @__PURE__ */ jsx(Carousel, { children: items.map((media) => {
		return /* @__PURE__ */ jsx("div", {
			className: "pr-3 lg:pr-5",
			children: /* @__PURE__ */ jsx(MovieThumbnail, {
				media,
				onHoverDelay: 300,
				collection
			})
		}, media.id);
	}) });
}
//#endregion
//#region src/components/collection/collection.tsx
function CollectionStreamed({ collection, title }) {
	return /* @__PURE__ */ jsx(Await, {
		promise: collection,
		children: ({ results }) => /* @__PURE__ */ jsxs("div", {
			className: "py-6 relative overflow-x-hidden px-4 lg:px-8",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "font-extrabold text-xl lg:text-3xl text-neutral-200",
				children: title
			}), /* @__PURE__ */ jsx(Items, {
				items: results,
				collection: title
			})]
		})
	});
}
function Collection({ collection, title }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "py-6 relative overflow-x-hidden px-4 lg:px-8",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "font-extrabold text-xl lg:text-3xl text-neutral-200",
			children: title
		}), /* @__PURE__ */ jsx(Items, {
			items: collection.results,
			collection: title
		})]
	});
}
//#endregion
export { Promoted as i, CollectionStreamed as n, CarouselSkeleton as r, Collection as t };
