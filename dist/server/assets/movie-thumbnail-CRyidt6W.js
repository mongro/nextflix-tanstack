import { i as getMediaType, r as getMediaTitle } from "./requests-CzB6V0XQ.js";
import { i as ImageWithTmdbUrl, r as useModalContext } from "./modal-provider-DZYyqRsW.js";
import { memo, useCallback, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/collection/thumbnail.tsx
var Thumbnail = memo(({ media, onHoverDelay = 500, onHover, collection }) => {
	const timerId = useRef(null);
	const thumbnailRef = useRef(null);
	const handleMouseEnter = (event) => {
		timerId.current = window.setTimeout(() => {
			if (thumbnailRef.current && onHover) onHover(thumbnailRef.current);
		}, onHoverDelay);
	};
	const cancelTimer = (event) => {
		if (timerId.current) window.clearTimeout(timerId.current);
	};
	const style = {
		transitionDuration: `${onHoverDelay / 1e3}s`,
		transitionTimingFunction: "linear"
	};
	const src = media.backdrop_path || media.poster_path;
	const title = getMediaTitle(media);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-full relative cursor-pointer aspect-video rounded overflow-hidden group ",
		ref: thumbnailRef,
		"data-testid": "thumbnail",
		"data-collection": collection,
		"data-title": getMediaTitle(media),
		onMouseLeave: cancelTimer,
		onMouseEnter: handleMouseEnter,
		children: [
			src && /* @__PURE__ */ jsx(ImageWithTmdbUrl, {
				className: "object-cover",
				src: media.backdrop_path || media.poster_path,
				alt: title,
				sizes: "384px"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "inset-0 absolute flex justify-center items-center -z-10 text-neutral-50 bg-neutral-900",
				children: /* @__PURE__ */ jsx("span", { children: title })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "h-1 absolute bottom-0 left-0 right-0",
				children: /* @__PURE__ */ jsx("div", {
					className: `bg-neutral-300 h-full w-full -translate-x-full transition-none group-hover:translate-x-0  group-hover:transition-all`,
					style
				})
			})
		]
	});
});
Thumbnail.displayName = "Thumbnail";
//#endregion
//#region src/components/collection/movie-thumbnail.tsx
function MovieThumbnail({ options, ...thumbnailProps }) {
	const { openSmallModal } = useModalContext();
	const { media, onHoverDelay } = thumbnailProps;
	const onHover = useCallback((id, type, thumbnail) => {
		openSmallModal(`${type}-${id}`, thumbnail, options);
	}, []);
	return /* @__PURE__ */ jsx(Thumbnail, {
		onHover: (thumbnail) => onHover(media.id, getMediaType(media), thumbnail),
		...thumbnailProps
	});
}
//#endregion
export { MovieThumbnail as t };
