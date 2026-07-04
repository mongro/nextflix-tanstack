import { useState } from "react";
import { jsx } from "react/jsx-runtime";
import { UserIcon } from "@heroicons/react/24/solid";
//#region src/components/ui/avatar.tsx
var Avatar = (props) => {
	const { src, className, alt, ...rest } = props;
	const [showFallback, setShowFallback] = useState(false);
	console.log("src", src);
	return !showFallback && src ? /* @__PURE__ */ jsx("img", {
		...rest,
		src,
		alt,
		className,
		width: 256,
		height: 256,
		sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 30vw,20vw",
		onError: () => {
			setShowFallback(true);
		}
	}) : /* @__PURE__ */ jsx(UserIcon, { className });
};
//#endregion
export { Avatar as t };
