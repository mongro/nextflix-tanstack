import { n as cn } from "./button-B_qHKP16.js";
import * as React$1 from "react";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/field.tsx
function FieldGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "field-group",
		className: cn("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", className),
		...props
	});
}
var fieldVariants = cva("group/field data-[invalid=true]:text-destructive flex w-full gap-3", {
	variants: { orientation: {
		vertical: ["flex-col *:w-full [&>.sr-only]:w-auto"],
		horizontal: [
			"flex-row items-center",
			"*:data-[slot=field-label]:flex-auto",
			"[&>[role=checkbox],[role=radio]]:has-[>[data-slot=field-content]]:mt-px has-[>[data-slot=field-content]]:items-start"
		],
		responsive: [
			"@md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto flex-col *:w-full [&>.sr-only]:w-auto",
			"@md/field-group:*:data-[slot=field-label]:flex-auto",
			"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:[&>[role=checkbox],[role=radio]]:has-[>[data-slot=field-content]]:mt-px"
		]
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...props
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label, {
		"data-slot": "field-label",
		className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4", "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10", className),
		...props
	});
}
function FieldDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("p", {
		"data-slot": "field-description",
		className: cn("text-muted-foreground text-sm font-normal leading-normal group-has-data-[orientation=horizontal]/field:text-balance", "nth-last-2:-mt-1 last:mt-0 [[data-variant=legend]+&]:-mt-1.5", "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", className),
		...props
	});
}
function FieldError({ className, children, errors, ...props }) {
	const content = useMemo(() => {
		if (children) return children;
		if (!errors) return null;
		if (errors?.length === 1 && errors[0]?.message) return errors[0].message;
		return /* @__PURE__ */ jsx("ul", {
			className: "ml-4 flex list-disc flex-col gap-1",
			children: errors.map((error, index) => error?.message && /* @__PURE__ */ jsx("li", { children: error.message }, index))
		});
	}, [children, errors]);
	if (!content) return null;
	return /* @__PURE__ */ jsx("div", {
		role: "alert",
		"data-slot": "field-error",
		className: cn("text-destructive text-sm font-normal", className),
		...props,
		children: content
	});
}
//#endregion
//#region src/components/ui/input.tsx
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ jsx("input", {
		type,
		"data-slot": "input",
		className: cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-2xs transition-[color,box-shadow] outline-hidden file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
		...props
	});
}
//#endregion
export { FieldGroup as a, FieldError as i, Field as n, FieldLabel as o, FieldDescription as r, Input as t };
