import { t as smiley_default } from "./smiley-nOJo0-QZ.js";
import { t as Avatar } from "./avatar-BtgSey3w.js";
import { jsx } from "react/jsx-runtime";
//#endregion
//#region public/avatars/index.ts
var avatarImages = [
	"/assets/man-small-Cy5yw-sQ.png",
	"/assets/old-man-CeoUO75d.png",
	"/assets/woman-aNHeFC2J.png",
	"/assets/old-woman-BFF9zqmi.png",
	smiley_default
];
//#endregion
//#region src/components/profile/avatar-select.tsx
function AvatarSelect({ onSelect }) {
	return /* @__PURE__ */ jsx("div", {
		className: "p-4 border-2 rounded mt-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex gap-2",
			children: avatarImages.map((avatar) => {
				return /* @__PURE__ */ jsx("button", {
					className: "p-2 hover:bg-accent/50 ",
					onClick: () => onSelect(avatar),
					children: /* @__PURE__ */ jsx(Avatar, {
						src: avatar,
						className: "w-24 md:w-44",
						alt: "avatar",
						width: 512,
						height: 512,
						sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
					})
				}, avatar);
			})
		})
	});
}
//#endregion
export { AvatarSelect as t };
