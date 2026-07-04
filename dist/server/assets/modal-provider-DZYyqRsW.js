import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
import { a as getModalInfos, c as getSeason, i as getMediaType, l as getSimilar, r as getMediaTitle } from "./requests-CzB6V0XQ.js";
import { t as createInternalId } from "./util-BIJ_9b2T.js";
import { n as cn, t as Button } from "./button-B_qHKP16.js";
import { n as useDictionary } from "./dictionary-provider-CBhcFZnw.js";
import { a as MenuContent, i as DropdownTrigger, o as MenuItem, r as DropdownMenu, s as MenuPortal, t as useSession } from "./auth-client-DjbFPC9N.js";
import { a as useRemoveRating, i as useRating, n as useGiveRating } from "./rating-6U8660zY.js";
import { n as isInMyList, t as getMyList } from "./queries-D8MsY7a9.js";
import React, { Suspense, createContext, forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition } from "react";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { queryOptions, skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { ArrowsPointingOutIcon, ChevronDownIcon, ChevronUpIcon, MinusIcon, PlayIcon, PlusIcon, SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import { FloatingFocusManager, FloatingPortal, autoUpdate, flip, offset, safePolygon, shift, useDismiss, useFloating, useFocus, useHover, useInteractions, useMergeRefs, useRole } from "@floating-ui/react";
import { Slot } from "radix-ui";
import HandThumbUpIcon$1 from "@heroicons/react/24/solid/HandThumbUpIcon";
import HandThumbDownIcon$1 from "@heroicons/react/24/solid/HandThumbDownIcon";
import HandThumbDownIconOutline from "@heroicons/react/24/outline/HandThumbDownIcon";
import HandThumbUpIconOutline from "@heroicons/react/24/outline/HandThumbUpIcon";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
//#region src/components/ui/icon-button.tsx
var VARIANT_MAPS = {
	primary: "text-neutral-800 bg-white hover:bg-white/20 ",
	secondary: "text-white bg-transparent border-neutral-400 hover:border-white",
	alert: "text-cyan-800 bg-white hover:bg-white/20"
};
var SIZE_MAPS = {
	small: "p-2 text-sm",
	medium: "p-3 text-base",
	big: "p-4 text-xl "
};
var IconButton = React.forwardRef(function IconButton(props, forwardedRef) {
	const { children, variant = "primary", size = "medium", className, onClick, ...buttonProps } = props;
	return /* @__PURE__ */ jsx("button", {
		className: cn("flex items-center content-center select-none rounded-full pointer border-2 button-with-icon", VARIANT_MAPS[variant], SIZE_MAPS[size], className),
		onClick,
		ref: forwardedRef,
		...buttonProps,
		children
	});
});
//#endregion
//#region src/components/image-tmdb.tsx
var base_imageUrl = "https://image.tmdb.org/t/p";
var sizes = [
	92,
	154,
	185,
	342,
	500,
	780
];
var generateTmdbImageUrl = (imageUrl, width) => {
	return `${base_imageUrl}/w${sizes.find((s) => s >= (width || 0)) || 500}${imageUrl}`;
};
var generateSrcSet = ({ imageUrl, width }) => {
	return {
		url: generateTmdbImageUrl(imageUrl, width),
		srcset: sizes.map((s) => `${generateTmdbImageUrl(imageUrl, s)} ${s}w`).join(", ")
	};
};
var ImageWithTmdbUrl = React.forwardRef(({ src, ...props }, ref) => {
	const { url, srcset } = generateSrcSet({
		imageUrl: src || "",
		width: props.width
	});
	const style = {
		width: "100%",
		height: "100%",
		position: "absolute",
		inset: 0
	};
	props.loading ||= "lazy";
	return /* @__PURE__ */ jsx("img", {
		...props,
		src: url,
		srcSet: srcset,
		style
	});
});
//#endregion
//#region src/utils/format.ts
var formatToPercentage = (number) => {
	return `${Math.round(number * 10)}%`;
};
var formatToHours = (number) => {
	return `${Math.floor(number / 60)}h ${number % 60}m`;
};
var formatToYear = (release) => {
	return release.split("-")[0];
};
//#endregion
//#region src/components/movie-modal/similar.tsx
var MAX_HEIGHT = 1e3;
function Similar({ similarTitles }) {
	const { dictionary } = useDictionary();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [height, setHeight] = useState(0);
	const container = useRef(null);
	useLayoutEffect(() => {
		if (container.current) {
			const height = container.current.getBoundingClientRect().height;
			setHeight(height);
			if (height > MAX_HEIGHT) setIsCollapsed(true);
		}
	}, []);
	const shouldBeCollapsed = height > MAX_HEIGHT;
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "my-4 text-2xl font-semibold",
			children: dictionary.modal.similar
		}),
		/* @__PURE__ */ jsx("div", {
			className: `grid gap-4 grid-cols-2 md:grid-cols-3 ${isCollapsed ? "overflow-hidden max-h-[1000px]" : ""}`,
			ref: container,
			children: similarTitles?.map((opus) => {
				return /* @__PURE__ */ jsxs("div", {
					className: "w-full bg-neutral-900 rounded",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "relative w-full aspect-video",
							children: /* @__PURE__ */ jsx(ImageWithTmdbUrl, {
								className: "object-cover",
								src: opus.backdrop_path || opus.poster_path,
								alt: "release_date" in opus ? opus.title : opus.name,
								layout: "fullWidth",
								sizes: "450px"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-start flex-wrap p-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mr-2 text-green-400 font-semibold",
								children: formatToPercentage(opus.vote_average)
							}), /* @__PURE__ */ jsx("span", {
								className: "mr-2 border border-neutral-400 p-1 ",
								children: formatToYear("first_air_date" in opus ? opus.first_air_date : opus.release_date)
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "px-4 pb-6",
							children: opus.overview
						})
					]
				}, opus.id);
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "flex justify-center",
			children: isCollapsed && shouldBeCollapsed ? /* @__PURE__ */ jsx(IconButton, {
				onClick: () => setIsCollapsed(false),
				children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
			}) : shouldBeCollapsed && /* @__PURE__ */ jsx(IconButton, {
				onClick: () => setIsCollapsed(true),
				children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
			})
		})
	] });
}
//#endregion
//#region src/components/movie-modal/meta.tsx
function Meta({ info }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-start flex-wrap my-2",
		children: [
			"number_of_seasons" in info ? /* @__PURE__ */ jsx("span", {
				className: "mr-2",
				children: info.number_of_seasons > 1 ? `${info.number_of_seasons} Seasons` : `${info.number_of_episodes} Episodes`
			}) : /* @__PURE__ */ jsx("span", {
				className: "mr-2",
				children: formatToHours(info.runtime)
			}),
			/* @__PURE__ */ jsx("span", {
				className: "mr-2 text-green-400 font-semibold",
				children: formatToPercentage(info.vote_average)
			}),
			/* @__PURE__ */ jsx("span", {
				className: "mr-2 border border-neutral-400 p-1 ",
				children: formatToYear("first_air_date" in info ? info.first_air_date : info.release_date)
			})
		]
	});
}
//#endregion
//#region src/components/movie-modal/genres.tsx
function Genres({ genres }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap text-sm",
		children: genres.map((genre) => /* @__PURE__ */ jsx("span", {
			className: "border-dotted rounded border-white border-2 py-1 px-2 mb-2 first:ml-0 ml-1",
			children: genre.name
		}, genre.name))
	});
}
//#endregion
//#region src/components/movie-modal/episode-guide.tsx
var Placeholder = () => /* @__PURE__ */ jsx("div", {
	className: "flex flex-col ",
	children: Array(10).fill(null).map((_, idx) => /* @__PURE__ */ jsx("div", { className: "h-32 bg-neutral-400 rounded m-2" }, idx))
});
var getFirstSeasonIndex = (seasons) => {
	return seasons.findIndex(function(season) {
		return season.season_number === 1;
	});
};
function Episodeguide({ showId, seasons }) {
	const { dictionary, lang } = useDictionary();
	const [seasonIndex, setSeasonIndex] = useState(getFirstSeasonIndex(seasons));
	const seasonNumber = seasons[seasonIndex].season_number;
	const shouldBeCollapsed = seasons[seasonIndex].episode_count > 14;
	const [isCollapsed, setIsCollapsed] = useState(shouldBeCollapsed);
	const { data: season, isSuccess } = useQuery({
		queryKey: [
			showId,
			"season",
			seasonNumber,
			lang
		],
		queryFn: () => getSeason(showId, seasonNumber, lang)
	});
	const episodes = season?.episodes ?? [];
	const episodesToRender = isCollapsed ? episodes.slice(0, 10) : episodes;
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between items-baseline",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "my-4 text-2xl font-semibold",
				children: dictionary.modal.episodes
			}), seasons.length > 1 ? /* @__PURE__ */ jsxs(DropdownMenu, {
				label: seasons[seasonIndex].name,
				children: [/* @__PURE__ */ jsx(DropdownTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						children: seasons[seasonIndex].name
					})
				}), /* @__PURE__ */ jsx(MenuPortal, { children: /* @__PURE__ */ jsx(MenuContent, { children: seasons.map((season, index) => /* @__PURE__ */ jsx(MenuItem, {
					label: season.name,
					onClick: () => setSeasonIndex(index),
					className: "px-4 py-1 text-white cursor-pointer hover:bg-neutral-400 focus:bg-neutral-400 focus:outline-hidden",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center",
						children: [season.name, /* @__PURE__ */ jsx("span", {
							className: "text-sm ml-1",
							children: `(${season.episode_count} Episodes)`
						})]
					})
				}, season.name + index)) }) })]
			}) : seasons[0].name]
		}),
		isSuccess ? episodesToRender.map((episode, id) => {
			return /* @__PURE__ */ jsxs("div", {
				className: "flex flex-row items-center p-3 border-b border-neutral-400",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "basis-1/12 text-2xl px-2",
						children: id
					}),
					/* @__PURE__ */ jsx("div", {
						className: "basis-3/12",
						children: /* @__PURE__ */ jsx("div", {
							className: "w-full relative aspect-video rounded overflow-hidden group ",
							children: /* @__PURE__ */ jsx(ImageWithTmdbUrl, {
								src: episode.still_path,
								alt: episode.name,
								layout: "fullWidth",
								sizes: "300px"
							})
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basis-8/12  text-xl px-4 self-start",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-semibold pb-2",
							children: episode.name
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm",
							children: episode.overview
						})]
					})
				]
			}, episode.id);
		}) : /* @__PURE__ */ jsx(Placeholder, {}),
		/* @__PURE__ */ jsx("div", {
			className: "flex justify-center",
			children: isCollapsed && shouldBeCollapsed ? /* @__PURE__ */ jsx(IconButton, {
				onClick: () => setIsCollapsed(false),
				children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
			}) : shouldBeCollapsed && /* @__PURE__ */ jsx(IconButton, {
				onClick: () => setIsCollapsed(true),
				children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
			})
		})
	] });
}
//#endregion
//#region src/components/movie-modal/cast.tsx
function Cast({ cast }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-2 my-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-neutral-500",
			children: "Cast: "
		}), cast.slice(0, 4).map((actor, index, array) => /* @__PURE__ */ jsx("span", {
			className: "cursor-pointer",
			children: `${actor.name}${index !== array.length - 1 ? ", " : ""}`
		}, actor.id))]
	});
}
//#endregion
//#region src/components/ui/tooltip/tooltip-context.tsx
var TooltipContext = createContext(void 0);
var useTooltipContext = () => {
	const context = useContext(TooltipContext);
	if (context == void 0) throw new Error("Tooltip components must be wrapped in <Tooltip />");
	return context;
};
//#endregion
//#region src/components/ui/tooltip/tooltip.tsx
function Tooltip({ children, placement, delay = 200, closeDelay = 0 }) {
	const [open, setOpen] = useState(false);
	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				crossAxis: placement.includes("-"),
				fallbackAxisSideDirection: "start",
				padding: 5
			}),
			shift({ padding: 5 })
		]
	});
	const context = data.context;
	const { getFloatingProps, getReferenceProps } = useInteractions([
		useHover(context, {
			move: false,
			delay: {
				close: closeDelay,
				open: delay
			}
		}),
		useFocus(context, {}),
		useDismiss(context),
		useRole(context, { role: "tooltip" })
	]);
	const contextValue = useMemo(() => ({
		open,
		isPositioned: data.isPositioned,
		floatingProps: getFloatingProps(),
		triggerProps: getReferenceProps(),
		setTrigger: data.refs.setReference,
		setFloating: data.refs.setFloating,
		floatingStyles: context.floatingStyles
	}), [
		open,
		data,
		getFloatingProps,
		getReferenceProps,
		context
	]);
	console.log("Tooltip rendered", contextValue);
	return /* @__PURE__ */ jsx(TooltipContext.Provider, {
		value: contextValue,
		children
	});
}
//#endregion
//#region src/components/ui/tooltip/tooltip-content.tsx
function TooltipContent(props) {
	const { children } = props;
	const context = useTooltipContext();
	if (!context.open) return null;
	console.log("isPos", context.isPositioned);
	console.log(context.floatingStyles);
	return /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx("div", {
		ref: context.setFloating,
		style: { ...context.floatingStyles },
		...context.floatingProps,
		className: "z-50",
		children: /* @__PURE__ */ jsx("div", {
			className: cn("animate-fade-in bg-primary text-primary-foreground  data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance"),
			children
		})
	}) });
}
//#endregion
//#region src/components/ui/tooltip/tooltip-trigger.tsx
var TooltipTrigger = forwardRef(function TooltipTrigger(props, propRef) {
	const { children, asChild = false } = props;
	const { triggerProps, setTrigger } = useTooltipContext();
	const ref = useMergeRefs([setTrigger, propRef]);
	return /* @__PURE__ */ jsx(asChild ? Slot.Root : "button", {
		ref,
		...triggerProps,
		children
	});
});
//#endregion
//#region src/components/movie-modal/movie-rating-buttons.tsx
function MovieRatingButtons({ movieId, profileId }) {
	const { data, isPending } = useRating(profileId, movieId);
	const { mutate: giveRating } = useGiveRating();
	const { mutate: removeRating } = useRemoveRating();
	const { dictionary } = useDictionary();
	if (isPending) return null;
	const handleThumbUpClick = () => {
		if (data?.rating === "UP") removeRating({
			movieId,
			profileId
		});
		else giveRating({
			profileId,
			movieId,
			rating: "UP"
		});
	};
	const handleThumbDownClick = () => {
		if (data?.rating === "DOWN") removeRating({
			movieId,
			profileId
		});
		else giveRating({
			profileId,
			movieId,
			rating: "DOWN"
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Tooltip, {
		placement: "top",
		children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(IconButton, {
				variant: "secondary",
				onClick: handleThumbUpClick,
				children: data?.rating === "UP" ? /* @__PURE__ */ jsx(HandThumbUpIcon$1, {}) : /* @__PURE__ */ jsx(HandThumbUpIconOutline, {})
			})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: dictionary.buttons.thumbsUp })]
	}), /* @__PURE__ */ jsxs(Tooltip, {
		placement: "top",
		children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(IconButton, {
				variant: "secondary",
				onClick: handleThumbDownClick,
				children: data?.rating === "DOWN" ? /* @__PURE__ */ jsx(HandThumbDownIcon$1, {}) : /* @__PURE__ */ jsx(HandThumbDownIconOutline, {})
			})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: dictionary.buttons.thumbsDown })]
	})] });
}
//#endregion
//#region src/lib/dal/my-list/actions.ts
var addToMyList = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("bded4211cbfb8d008a114478bef100084c941c371b7f6c4a33667c0a9d2d841b"));
var removeFromMyList = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d11b63b390af6aa131d0765ee0fbd3e555b684729ed0592ea03617b91c0d6925"));
//#endregion
//#region src/lib/api/my-list.ts
var MY_LIST_QUERYKEY = "mylist";
var isInMyListQueryOptions = (profileId, movieId) => {
	return queryOptions({
		queryKey: [
			MY_LIST_QUERYKEY,
			profileId,
			movieId
		],
		queryFn: profileId ? () => isInMyList({ data: {
			profileId,
			movieId
		} }) : skipToken
	});
};
var getMyListQueryOptions = (profileId) => {
	return queryOptions({
		queryKey: [MY_LIST_QUERYKEY, profileId],
		queryFn: profileId ? () => getMyList() : skipToken
	});
};
function useIsInMyList(profileId, movieId) {
	const queryClient = useQueryClient();
	return useQuery({
		...isInMyListQueryOptions(profileId, movieId),
		initialData: () => {
			return queryClient.getQueryData(getMyListQueryOptions(profileId).queryKey)?.some((item) => item.movieId === movieId);
		},
		initialDataUpdatedAt: () => queryClient.getQueryState(getMyListQueryOptions(profileId).queryKey)?.dataUpdatedAt
	});
}
var useToggleMyList = (isInMyList, onSuccess) => {
	return useMutation({
		mutationFn: ({ profileId, movieId }) => {
			console.log("isInMyList in mutateFn:", isInMyList);
			return !isInMyList ? addToMyList({ data: {
				profileId,
				movieId
			} }) : removeFromMyList({ data: {
				profileId,
				movieId
			} });
		},
		onMutate: async ({ profileId, movieId }, context) => {
			const queryKey = isInMyListQueryOptions(profileId, movieId).queryKey;
			await context.client.cancelQueries({ queryKey });
			const previousIsInMyList = context.client.getQueryData(queryKey);
			context.client.setQueryData(queryKey, !isInMyList);
			return { previousIsInMyList };
		},
		onSettled: (data, err, { profileId, movieId }, mutateResult, context) => {
			const queryKey = isInMyListQueryOptions(profileId, movieId).queryKey;
			if (!data?.success || err) context.client.setQueryData(queryKey, mutateResult?.previousIsInMyList);
			else if (onSuccess) {
				const isInMyList = context.client.getQueryData(queryKey);
				onSuccess(Boolean(isInMyList));
			}
		}
	});
};
//#endregion
//#region src/components/movie-modal/mylist-button.tsx
function MyListButton({ movieId, profileId, onRemove }) {
	const isInMyListQuery = useIsInMyList(profileId, movieId);
	const { mutate: toggleMyList } = useToggleMyList(!!isInMyListQuery.data, (isInMyList) => {
		if (!isInMyList && onRemove) onRemove();
	});
	const { dictionary } = useDictionary();
	if (isInMyListQuery.isPending || isInMyListQuery.isError) return null;
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Tooltip, {
		placement: "top",
		children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(IconButton, {
				variant: "secondary",
				onClick: () => toggleMyList({
					profileId,
					movieId
				}),
				"aria-label": isInMyListQuery.data ? dictionary.buttons.myListRemove : dictionary.buttons.myListAdd,
				children: isInMyListQuery.data ? /* @__PURE__ */ jsx(MinusIcon, {}) : /* @__PURE__ */ jsx(PlusIcon, {})
			})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: isInMyListQuery.data ? dictionary.buttons.myListRemove : dictionary.buttons.myListAdd })]
	}) });
}
//#endregion
//#region src/components/movie-modal/movie-modal-content.tsx
var MovieInfoModal = React.forwardRef(({ videoUrl, imageUrl, title, details, similar, state, cast, onClose, onSizeSwitch, onMyListRemove }, ref) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioOn, setAudioOn] = useState(false);
	const [pending, startTransition] = useTransition();
	const mediaType = getMediaType(details);
	const session = useSession();
	const internalId = createInternalId(details.id, mediaType);
	const selectedProfileId = session.data?.data?.session.selectedProfileId;
	const handleAudioClick = () => {
		setAudioOn((state) => !state);
	};
	const variants = {
		hidden: { opacity: 0 },
		small: { opacity: 1 },
		big: { opacity: 1 },
		visible: { opacity: 1 }
	};
	const { dictionary } = useDictionary();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "w-full aspect-video relative bg-neutral-900",
		children: [
			videoUrl ? /* @__PURE__ */ jsx(motion.div, {
				className: "inset-0 absolute",
				initial: { opacity: 0 },
				animate: { opacity: isPlaying ? 1 : 0 },
				exit: { opacity: 0 },
				children: /* @__PURE__ */ jsx(ReactPlayer, {
					playing: true,
					onReady: () => {
						console.log("Video is ready");
						setIsPlaying(true);
					},
					onWaiting: () => {
						console.log("Video is waiting");
					},
					onError: () => {
						console.log("Video is error");
					},
					onProgress: () => {
						console.log("Video is progressing");
					},
					onEnded: () => {
						setIsPlaying(false);
					},
					src: `https://www.youtube.com/watch?v=${videoUrl}`,
					title,
					width: "100%",
					height: "100%",
					muted: !audioOn,
					controls: false
				}, videoUrl)
			}) : null,
			/* @__PURE__ */ jsxs(motion.div, {
				className: "inset-0 absolute z-10",
				initial: { opacity: 1 },
				exit: { opacity: 1 },
				animate: { opacity: isPlaying ? 0 : 1 },
				children: [/* @__PURE__ */ jsx(ImageWithTmdbUrl, {
					className: `object-fill static`,
					src: imageUrl,
					alt: title,
					layout: "fullWidth",
					sizes: "300px"
				}), /* @__PURE__ */ jsx(ImageWithTmdbUrl, {
					className: `object-fill static`,
					src: imageUrl,
					alt: title,
					layout: "fullWidth",
					sizes: "600px"
				})]
			}),
			state === "big" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", { className: "absolute w-full bottom-0 h-1/3 z-20 bg-linear-to-t	from-neutral-800 " }), /* @__PURE__ */ jsx("div", {
				className: `absolute bottom-5 w-2/5 left-5 z-20 hover:opacity-100 text-neutral-50`,
				children: /* @__PURE__ */ jsx("div", {
					className: `w-48 relative`,
					children: /* @__PURE__ */ jsx(ImageWithTmdbUrl, {
						className: `w-24 h-auto`,
						src: details.poster_path,
						alt: title,
						width: 450,
						height: 675,
						sizes: "200px"
					})
				})
			})] }),
			videoUrl && /* @__PURE__ */ jsx("div", {
				className: "absolute bottom-5 right-5 z-20 opacity-40 hover:opacity-100",
				children: /* @__PURE__ */ jsx(IconButton, {
					variant: "secondary",
					size: "small",
					onClick: handleAudioClick,
					"aria-label": "turn Audio on",
					children: audioOn ? /* @__PURE__ */ jsx(SpeakerWaveIcon, {}) : /* @__PURE__ */ jsx(SpeakerXMarkIcon, {})
				})
			}),
			onClose && state === "big" && /* @__PURE__ */ jsx("div", {
				className: "top-0 right-0 m-1 absolute z-10",
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					variant: "secondary",
					onClick: (event) => onClose(),
					"aria-label": "closeModal",
					children: /* @__PURE__ */ jsx(XMarkIcon, {})
				})
			})
		]
	}), /* @__PURE__ */ jsxs(motion.div, {
		variants,
		className: ` bg-neutral-800 ${state === "big" ? "p-12 pt-4" : "p-4 pt-1"} text-neutral-200 text-base`,
		"data-testid": "movie-modal",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex mb-2 items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(IconButton, {
						variant: "alert",
						size: "big",
						children: /* @__PURE__ */ jsx(PlayIcon, {})
					}),
					selectedProfileId !== null && selectedProfileId !== void 0 && /* @__PURE__ */ jsx(MyListButton, {
						profileId: selectedProfileId,
						movieId: internalId,
						onRemove: onMyListRemove
					}),
					/* @__PURE__ */ jsxs("h2", {
						className: "text-2xl text-center grow",
						"data-testid": "movie-modal-title",
						children: [" ", state === "big" && title]
					}),
					state === "small" && /* @__PURE__ */ jsxs(Tooltip, {
						placement: "top",
						children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx(IconButton, {
								variant: "secondary",
								className: "z-10",
								onClick: onSizeSwitch,
								"aria-label": "moreInfo",
								children: /* @__PURE__ */ jsx(ArrowsPointingOutIcon, {})
							})
						}), /* @__PURE__ */ jsx(TooltipContent, { children: dictionary.buttons.moreInfo })]
					}),
					selectedProfileId !== null && selectedProfileId !== void 0 && /* @__PURE__ */ jsx(MovieRatingButtons, {
						movieId: internalId,
						profileId: selectedProfileId
					})
				]
			}),
			state === "big" ? /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-3 gap-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-2",
					children: [/* @__PURE__ */ jsx(Meta, { info: details }), /* @__PURE__ */ jsx("div", {
						className: "",
						children: /* @__PURE__ */ jsx("p", { children: details.overview })
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-1",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx(Cast, { cast }), /* @__PURE__ */ jsx(Genres, { genres: details.genres })]
					})
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "",
				children: [/* @__PURE__ */ jsx(Meta, { info: details }), /* @__PURE__ */ jsx(Genres, { genres: details.genres })]
			}),
			state === "big" && !("release_date" in details) && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { display: "none" },
				children: /* @__PURE__ */ jsx(Episodeguide, {
					showId: details.id,
					seasons: details.seasons
				})
			}),
			state === "big" && similar && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { display: "none" },
				children: /* @__PURE__ */ jsx(Similar, { similarTitles: similar })
			})
		]
	})] });
});
//#endregion
//#region src/components/movie-modal/modal.tsx
var finalShift = {
	name: "finalShift",
	fn({ x, y, middlewareData, rects, elements }) {
		if (!middlewareData.shift) return {};
		const xFinal = middlewareData.shift.x > 0 ? rects.reference.x : middlewareData.shift.x < 0 ? rects.reference.x + rects.reference.width - rects.floating.width : x;
		const yFinal = middlewareData.shift.y > 0 ? rects.reference.y : middlewareData.shift.y < 0 ? rects.reference.y + rects.reference.height - rects.floating.height : y;
		return {
			x: xFinal,
			y: yFinal,
			data: {
				x: middlewareData.shift.x + (xFinal - x),
				y: middlewareData.shift.y + (yFinal - y),
				referenceRect: rects.reference,
				floatingRect: rects.floating,
				floatingElement: elements.floating,
				referenceElement: elements.reference
			}
		};
	}
};
var variants = {
	big: {
		opacity: 1,
		scale: 1
	},
	hidden: {
		opacity: 0,
		scale: .7
	}
};
var variantsFlexibleModal = {
	hidden: ({ thumbnail, modalWidth, exitAnimation, previousState, thumbnailToPreviewRatio }) => exitAnimation ? {
		x: thumbnail.x,
		y: thumbnail.y,
		scale: previousState === "big" ? thumbnail.width / modalWidth : 1 / thumbnailToPreviewRatio
	} : {},
	small: ({ x, y }) => ({
		x: x || 0,
		y: y || 0,
		scale: 1
	}),
	big: ({ thumbnail, modalWidth, thumbnailToPreviewRatio }) => {
		return {
			x: "calc(50vw - 50%)",
			y: 20,
			scale: [Math.floor(thumbnail.width * thumbnailToPreviewRatio) / modalWidth, 1]
		};
	}
};
function Modal({ reference, state, modalContext, options, children }) {
	const modalRef = useRef(null);
	const { closeModal } = modalContext;
	const isBig = state.current === "big";
	const isHidden = state.current === "hidden";
	const { thumbnailToPreviewRatio, exitAnimation } = options;
	const modalWidth = 900;
	useEffect(() => {
		if (!modalRef.current) return;
		if (isBig) disableBodyScroll(modalRef.current, { reserveScrollBarGap: true });
	}, [isBig]);
	const ref = React.useCallback((node) => {
		if (node !== null) {
			modalRef.current = node;
			if (isBig) disableBodyScroll(node, { reserveScrollBarGap: true });
		} else if (!isBig && modalRef.current) enableBodyScroll(modalRef.current);
	}, [isBig]);
	const onOpenChange = (open) => {
		if (!open) closeModal();
	};
	const { x, y, refs, strategy, context, elements } = useFloating({
		open: !isHidden,
		onOpenChange,
		placement: "bottom",
		elements: { reference },
		middleware: [
			offset(({ rects }) => {
				return -rects.reference.height / 2 - rects.floating.height / 2;
			}),
			shift({ crossAxis: true }),
			finalShift
		]
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context, {
			enabled: !isBig,
			handleClose: safePolygon({ blockPointerEvents: false }),
			delay: {
				open: 100,
				close: 0
			}
		}),
		useFocus(context),
		useDismiss(context, { outsidePressEvent: "mousedown" }),
		useRole(context, { role: "dialog" })
	]);
	const referenceRect = elements.reference?.getBoundingClientRect();
	let defaultStyle = {
		position: strategy,
		top: referenceRect ? 0 : 20,
		left: referenceRect ? 0 : "auto",
		transformOrigin: referenceRect ? "top left" : "center top"
	};
	const style = isBig ? { ...defaultStyle } : {
		...defaultStyle,
		width: (referenceRect?.width || 200) * thumbnailToPreviewRatio
	};
	const variantProps = useMemo(() => ({
		x,
		y,
		modalWidth,
		thumbnailToPreviewRatio,
		thumbnail: referenceRect,
		previousState: state.previous,
		exitAnimation
	}), [
		x,
		y,
		thumbnailToPreviewRatio,
		modalWidth,
		referenceRect,
		state.previous,
		exitAnimation
	]);
	return /* @__PURE__ */ jsx(FloatingPortal, {
		id: "preview-Modal",
		children: /* @__PURE__ */ jsx(AnimatePresence, {
			custom: variantProps,
			children: !isHidden && /* @__PURE__ */ jsxs("div", {
				ref,
				children: [isBig && /* @__PURE__ */ jsx(motion.div, {
					className: "bg-black fixed inset-0",
					initial: { opacity: 0 },
					exit: { opacity: 0 },
					animate: { opacity: .6 },
					transition: { duration: .4 }
				}), /* @__PURE__ */ jsx("div", {
					className: `inset-0 fixed z-50 flex justify-center ${isBig ? "overflow-y-auto overflow-x-hidden" : "pointer-events-none"}`,
					children: /* @__PURE__ */ jsx(FloatingFocusManager, {
						context,
						children: /* @__PURE__ */ jsx(motion.div, {
							custom: variantProps,
							variants: referenceRect ? variantsFlexibleModal : variants,
							initial: "hidden",
							style,
							animate: state.current,
							transition: { duration: .2 },
							exit: exitAnimation ? "hidden" : void 0,
							onAnimationComplete: (event) => {
								if (event === "hidden" && modalRef.current) enableBodyScroll(modalRef.current);
							},
							ref: refs.setFloating,
							className: `z-50 shadow-xl rounded overflow-hidden pointer-events-auto ${isBig ? "w-[95%] max-w-4xl" : ""}`,
							...getFloatingProps(),
							children
						})
					})
				})]
			}, "modal")
		})
	});
}
//#endregion
//#region src/components/movie-modal/container.tsx
function Container({ modalId, state, modalContext, options, reference }) {
	const { type, id } = getRequestParamsFromId(modalId);
	const router = useRouter();
	const isBig = state.current === "big";
	const isHidden = state.current === "hidden";
	const { closeModal, closeModalWithoutAnimation, setBigModalQueryParam } = modalContext;
	const { lang } = useDictionary();
	const { data: similar } = useQuery({
		queryKey: [
			"similar",
			id,
			type,
			lang
		],
		queryFn: () => getSimilar(Number(id), type, lang),
		enabled: isBig
	});
	const { data } = useQuery({
		queryKey: [
			"data",
			id,
			type,
			lang
		],
		queryFn: () => getModalInfos(id, type, lang),
		enabled: !isHidden
	});
	const trailer = useMemo(() => {
		if (data) {
			const videos = data.videos.results;
			if (videos.length < 1) return void 0;
			const trailerIndex = videos.findIndex((video) => video.type === "Trailer");
			return trailerIndex > -1 ? videos[trailerIndex].key : videos[0].key;
		} else return void 0;
	}, [data]);
	return data && /* @__PURE__ */ jsx(Modal, {
		reference,
		state,
		options,
		modalContext,
		children: /* @__PURE__ */ jsx(MovieInfoModal, {
			onClose: closeModal,
			onMyListRemove: () => {
				if (options.closeOnMyListRemove) {
					closeModalWithoutAnimation();
					router.invalidate();
				}
			},
			onSizeSwitch: (event) => {
				setBigModalQueryParam(modalId, { closeOnMyListRemove: false });
			},
			cast: data.credits.cast,
			title: getMediaTitle(data),
			details: data,
			similar: similar?.results,
			videoUrl: trailer,
			imageUrl: data.backdrop_path || data.poster_path,
			state: state.current
		})
	});
}
//#endregion
//#region src/components/provider/modal-provider.tsx
var ModalContext = createContext(null);
function useModalContext() {
	let context = useContext(ModalContext);
	if (context === null) throw Error("Used ModalContext outside Provider");
	return context;
}
var defaultOptions = {
	exitAnimation: true,
	closeOnMyListRemove: false,
	thumbnailToPreviewRatio: 1.5
};
function getRequestParamsFromId(id) {
	const params = id.split("-", 2);
	if (params.length != 2) return null;
	if ((params[0] === "tv" || params[0] === "movie") && /^[0-9]*$/.test(params[1])) return {
		type: params[0],
		id: +params[1]
	};
	return null;
}
var isValidModalId = (id) => {
	return getRequestParamsFromId(id) != null;
};
var BigModalController = () => {
	const { id } = useSearch({ strict: false });
	const { openBigModal, closeModalIfExpanded } = useModalContext();
	useEffect(() => {
		if (id) openBigModal(id);
		else closeModalIfExpanded();
	}, [
		id,
		openBigModal,
		closeModalIfExpanded
	]);
	return null;
};
function ModalProvider({ children }) {
	const [state, setState] = useState({
		current: "hidden",
		previous: "hidden",
		id: null
	});
	const [options, setOptions] = useState(defaultOptions);
	const [reference, setReference] = useState(null);
	const navigate = useNavigate();
	const { id } = useSearch({ strict: false });
	const openSmallModal = useCallback((id, reference, options) => {
		setReference(reference);
		setOptions({
			...defaultOptions,
			...options
		});
		setState({
			current: "small",
			previous: "hidden",
			id
		});
	}, []);
	const openBigModal = useCallback((id, options) => {
		if (state.id !== id) setReference(null);
		setState((state) => ({
			current: "big",
			previous: state.current,
			id
		}));
		setOptions({
			...defaultOptions,
			...options
		});
	}, [state.id]);
	const setBigModalQueryParam = useCallback((id, options) => {
		navigate({
			to: ".",
			search: (search) => ({
				...search,
				id
			}),
			resetScroll: false
		});
		setOptions({
			...defaultOptions,
			...options
		});
	}, []);
	const closeModalIfExpanded = useCallback(() => {
		setState((state) => ({
			...state,
			current: state.current === "big" ? "hidden" : state.current,
			previous: state.current
		}));
	}, []);
	const closeModal = useCallback(() => {
		if (id) navigate({
			to: ".",
			search: (search) => ({
				...search,
				id: void 0
			}),
			resetScroll: false
		});
		setState((state) => ({
			...state,
			current: "hidden",
			previous: state.current
		}));
	}, [id]);
	const closeModalWithoutAnimation = useCallback(() => {
		setOptions({
			...defaultOptions,
			exitAnimation: false
		});
		closeModal();
	}, [closeModal]);
	const modalContext = useMemo(() => ({
		openSmallModal,
		openBigModal,
		closeModalIfExpanded,
		setBigModalQueryParam,
		closeModal,
		closeModalWithoutAnimation
	}), [
		closeModal,
		closeModalIfExpanded,
		setBigModalQueryParam,
		openSmallModal,
		openBigModal,
		closeModalWithoutAnimation
	]);
	return /* @__PURE__ */ jsxs(ModalContext.Provider, {
		value: modalContext,
		children: [
			/* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(BigModalController, {}) }),
			state.id && /* @__PURE__ */ jsx(Container, {
				modalId: state.id,
				reference,
				state,
				modalContext,
				options
			}, reference?.dataset.collection + "-" + reference?.dataset.title),
			children
		]
	});
}
//#endregion
export { IconButton as a, ImageWithTmdbUrl as i, isValidModalId as n, useModalContext as r, ModalProvider as t };
