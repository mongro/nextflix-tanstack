import { cloneElement, forwardRef, isValidElement, useContext } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { Slot } from "radix-ui";
import { useTooltipContext } from "./tooltip-context";

export interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const TooltipTrigger = forwardRef(function TooltipTrigger(
  props: TooltipTriggerProps,
  propRef,
) {
  const { children, asChild = false } = props;
  const { triggerProps, setTrigger } = useTooltipContext();

  const ref = useMergeRefs([setTrigger, propRef]);

  const Component = asChild ? Slot.Root : "button";

  return (
    <Component ref={ref} {...triggerProps}>
      {children}
    </Component>
  );
});
